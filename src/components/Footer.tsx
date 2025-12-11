import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand with Logo */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/db-logo.png" 
                alt="theDBot Logo" 
                width={40} 
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-foreground">theDBot</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Professional automation solutions for MT4/MT5 and TradingView platforms.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Products</h3>
            <nav className="space-y-2">
              <Link href="/products?category=forex" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Forex Bots
              </Link>
              <Link href="/products?category=automation" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Signal Executors
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

        <div className="border-t border-border mt-8 pt-8 flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} theDBot. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>MetaTrader, MT4, and MT5 are trademarks of MetaQuotes Software Corp.</p>
            <p>Telegram is a trademark of Telegram FZ-LLC. TradingView is a trademark of TradingView, Inc.</p>
            <p>theDBot is an independent third-party application not affiliated with, endorsed by, or sponsored by these companies.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}


