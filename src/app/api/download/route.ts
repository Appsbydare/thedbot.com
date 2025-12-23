import { NextRequest, NextResponse } from "next/server";
import { LicensesRepo } from "@/lib/repos";

const files: Record<string, string> = {
  "forex-ma-bot.txt": "Thank you for purchasing Forex MA Bot Pro. Your license is valid.",
  "telegram-auto-executor.txt": "Thank you for purchasing Telegram Auto Executor. Your license is valid.",
  "rsi-divergence.txt": "Thank you for purchasing RSI Divergence Indicator. Your license is valid.",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const license = searchParams.get("license");
  const file = searchParams.get("file");
  if (!license || !file) {
    return NextResponse.json({ error: "Missing license or file" }, { status: 400 });
  }

  const lic = LicensesRepo.get(license);
  if (!lic || lic.status === "revoked" || lic.activations > lic.maxActivations) {
    return NextResponse.json({ error: "Invalid license" }, { status: 403 });
  }

  // Soft-activate on first download
  if (lic.activations === 0) {
    LicensesRepo.activate(license);
  }

  const content = files[file];
  if (!content) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename=${file}`,
    },
  });
}


