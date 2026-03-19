import { createAuthClient } from "@neondatabase/auth";

export const adminAuth = createAuthClient({
  url: process.env.NEXT_PUBLIC_NEON_AUTH_URL,
  secret: process.env.NEON_AUTH_SECRET,
});
