import crypto from "crypto";

export function generateLicenseKey(productId: string, customerEmail: string): string {
  const raw = `${productId}:${customerEmail}:${crypto.randomUUID()}`;
  const hash = crypto.createHash("sha256").update(raw).digest("hex");
  const parts = [hash.slice(0, 8), hash.slice(8, 16), hash.slice(16, 24), hash.slice(24, 32)];
  return parts.join("-").toUpperCase();
}


