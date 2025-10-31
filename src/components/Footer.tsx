import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DB</span>
              </div>
              <span className="text-xl font-bold text-foreground">theDBot</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Professional automated trading solutions for MT4/MT5 and TradingView platforms.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Products</h3>
            <nav className="space-y-2">
              <Link href="/products?category=forex" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Forex Bots
              </Link>
              <Link href="/products?category=crypto" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Crypto Bots
              </Link>
              <Link href="/products?category=indicators" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Indicators
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Support</h3>
            <nav className="space-y-2">
              <Link href="/faq" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                FAQ
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Contact
              </Link>
              <a href="mailto:support@thedbot.com" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                support@thedbot.com
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Legal</h3>
            <nav className="space-y-2">
              <Link href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/refund" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Refund Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} theDBot. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground text-center sm:text-right">
            <span>MetaTrader, MT4, and MT5 are trademarks of MetaQuotes Software Corp. Telegram is a trademark of Telegram FZ-LLC. TradingView is a trademark of TradingView, Inc. theDBot is an independent third-party application not affiliated with, endorsed by, or sponsored by these companies.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


