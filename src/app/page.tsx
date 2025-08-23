import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function Home() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl grid gap-8 sm:gap-12">
        <div className="text-center sm:text-left space-y-5">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">
            Automated trading tools for MT4/MT5 & TradingView
          </h1>
          <p className="text-foreground/70 text-base sm:text-lg max-w-2xl mx-auto sm:mx-0">
            Signal Executors, Moving Average & RSI bots, and Pine indicators.
            Simple licensing. Crypto-ready checkout.
          </p>
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Browse products
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/faq" className="text-sm text-foreground/70 hover:text-foreground">
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
