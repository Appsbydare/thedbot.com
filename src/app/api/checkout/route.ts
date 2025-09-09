import { NextRequest, NextResponse } from "next/server";
import { createTransaction } from "@/lib/coinpayments";
import { createOrder, updateOrder } from "@/lib/orders";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const siteUrl = process.env.SITE_URL as string;
    if (!siteUrl) {
      return NextResponse.json({ error: "SITE_URL not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { productId, amountUSD, buyerEmail } = body ?? {};
    if (!productId || !amountUSD) {
      return NextResponse.json({ error: "Missing productId or amountUSD" }, { status: 400 });
    }

    const orderId = randomUUID();

    // Create initial order record
    createOrder({
      id: orderId,
      productId,
      amountUSD: Number(amountUSD),
      currency2: "USDT.TRC20",
      status: "created",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const res = await createTransaction({
      amount: Number(amountUSD),
      currency1: "USD",
      currency2: "USDT.TRC20",
      buyer_email: buyerEmail,
      item_name: productId,
      custom: orderId,
      success_url: `${siteUrl}/checkout/success`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    });

    if (res.error && res.error.toLowerCase() !== "ok") {
      return NextResponse.json({ error: res.error }, { status: 400 });
    }

    if (res.result?.txn_id) {
      updateOrder(orderId, { txnId: res.result.txn_id, status: "pending" });
    }

    return NextResponse.json({
      status_url: res.result?.status_url,
      qrcode_url: res.result?.qrcode_url,
      txn_id: res.result?.txn_id,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Server error" }, { status: 500 });
  }
}


