import crypto from "crypto";

export type CoinPaymentsCreateParams = {
  amount: number;
  currency1?: string; // original currency
  currency2: string; // crypto to receive (e.g., USDT.TRC20, BTC)
  buyer_email?: string;
  item_name?: string;
  item_number?: string;
  custom?: string; // pass-through order id
  success_url?: string;
  cancel_url?: string;
};

export type CoinPaymentsCreateResponse = {
  error: string;
  result?: {
    amount: string;
    address: string;
    txn_id: string;
    confirms_needed: string;
    timeout: number;
    status_url: string;
    qrcode_url: string;
  };
};

function toFormEncoded(data: Record<string, string | number | undefined>): string {
  return Object.entries(data)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
}

export async function createTransaction(params: CoinPaymentsCreateParams): Promise<CoinPaymentsCreateResponse> {
  const publicKey = process.env.COINPAYMENTS_PUBLIC_KEY as string;
  const privateKey = process.env.COINPAYMENTS_PRIVATE_KEY as string;
  const merchantId = process.env.COINPAYMENTS_MERCHANT_ID as string;

  if (!publicKey || !privateKey || !merchantId) {
    throw new Error("CoinPayments env vars missing");
  }

  const body = toFormEncoded({
    cmd: "create_transaction",
    key: publicKey,
    version: 1,
    format: "json",
    amount: params.amount,
    currency1: params.currency1 ?? "USD",
    currency2: params.currency2,
    buyer_email: params.buyer_email,
    item_name: params.item_name,
    item_number: params.item_number,
    custom: params.custom,
    success_url: params.success_url,
    cancel_url: params.cancel_url,
    ipn_url: `${process.env.SITE_URL}/api/coinpayments/ipn`,
  });

  const hmac = crypto
    .createHmac("sha512", privateKey)
    .update(body)
    .digest("hex");

  const res = await fetch("https://www.coinpayments.net/api.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "HMAC": hmac,
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`CoinPayments HTTP ${res.status}`);
  }

  const data = (await res.json()) as CoinPaymentsCreateResponse;
  return data;
}

export function verifyIpnSignature(rawBody: string, hmacHeader: string | null): boolean {
  const ipnSecret = process.env.COINPAYMENTS_IPN_SECRET as string;
  if (!ipnSecret || !hmacHeader) return false;
  const hmac = crypto.createHmac("sha512", ipnSecret).update(rawBody).digest("hex");
  return hmac.toLowerCase() === hmacHeader.toLowerCase();
}


