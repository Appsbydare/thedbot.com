import { NextRequest, NextResponse } from "next/server";
import { createTransaction } from "@/lib/coinpayments";
import { OrdersRepo, CustomersRepo, LicensesRepo } from "@/lib/repos";
import { generateLicenseKey } from "@/lib/license";
import { getProductById } from "@/data/products";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const siteUrl = process.env.SITE_URL as string;
    if (!siteUrl) {
      return NextResponse.json({ error: "SITE_URL not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { productId, amountUSD, buyerEmail, buyerName, buyerCountry, hardwareFingerprint } = body ?? {};
    if (!productId || !amountUSD) {
      return NextResponse.json({ error: "Missing productId or amountUSD" }, { status: 400 });
    }

    if (!hardwareFingerprint) {
      return NextResponse.json({ error: "Hardware fingerprint is required" }, { status: 400 });
    }

    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const orderId = randomUUID();

    // Create customer and license upfront (license delivered after payment confirm)
    const customer = buyerEmail ? CustomersRepo.upsertByEmail(buyerName || "Buyer", buyerEmail, buyerCountry || "") : undefined;
    const licenseKey = generateLicenseKey(productId, buyerEmail || `${orderId}@example.com`);

    OrdersRepo.create({
      id: orderId,
      productId,
      amountUSD: Number(amountUSD),
      currency2: "USDT.TRC20",
      status: "created",
      buyerEmail,
      customerId: customer?.id,
      licenseKey,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Calculate expiration (1 year from now for this product)
    const oneYearFromNow = Date.now() + (365 * 24 * 60 * 60 * 1000);

    LicensesRepo.create({
      key: licenseKey,
      productId,
      customerId: customer?.id || "",
      orderId,
      hardwareFingerprint,
      status: "issued",
      maxActivations: 1,
      activations: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      expiresAt: oneYearFromNow,
    });

    const res = await createTransaction({
      amount: Number(amountUSD),
      currency1: "USD",
      currency2: "USDT.TRC20",
      buyer_email: buyerEmail,
      item_name: product.name,
      custom: orderId,
      success_url: `${siteUrl}/checkout/success`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    });

    if (res.error && res.error.toLowerCase() !== "ok") {
      return NextResponse.json({ error: res.error }, { status: 400 });
    }

    if (res.result?.txn_id) {
      OrdersRepo.update(orderId, { txnId: res.result.txn_id, status: "pending" });
    }

    return NextResponse.json({
      status_url: res.result?.status_url,
      qrcode_url: res.result?.qrcode_url,
      txn_id: res.result?.txn_id,
      licenseKey,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


