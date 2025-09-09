import { NextRequest, NextResponse } from "next/server";
import { verifyIpnSignature } from "@/lib/coinpayments";
import { updateOrder, findOrder } from "@/lib/orders";

export async function POST(req: NextRequest) {
  // CoinPayments sends x-www-form-urlencoded and requires raw body for HMAC
  const rawBody = await req.text();
  const hmac = req.headers.get("hmac");

  if (!verifyIpnSignature(rawBody, hmac)) {
    return new NextResponse("Invalid HMAC", { status: 400 });
  }

  const params = new URLSearchParams(rawBody);

  const merchant = params.get("merchant");
  const expectedMerchant = process.env.COINPAYMENTS_MERCHANT_ID as string;
  if (!merchant || merchant !== expectedMerchant) {
    return new NextResponse("Invalid merchant", { status: 400 });
  }

  const custom = params.get("custom") || ""; // our order id
  const status = Number(params.get("status") || "0");
  const txnId = params.get("txn_id") || undefined;

  const order = findOrder(custom);
  if (!order) {
    // We still return 200 to avoid retries loop with sensitive info
    return new NextResponse("OK", { status: 200 });
  }

  // Map CoinPayments status to our order status
  // status >= 100: complete, status == 2: confirmed, 0..1: pending, <0: failed
  let newStatus: typeof order.status = order.status;
  if (status >= 100) newStatus = "complete";
  else if (status === 2) newStatus = "confirmed";
  else if (status >= 0) newStatus = "pending";
  else newStatus = "failed";

  updateOrder(custom, { status: newStatus, txnId });

  return new NextResponse("OK", { status: 200 });
}


