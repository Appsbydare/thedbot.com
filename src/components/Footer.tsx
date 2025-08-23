import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 border-t border-white/10 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DB</span>
              </div>
              <span className="text-xl font-bold text-white">theDBot</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Professional automated trading solutions for MT4/MT5 and TradingView platforms.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Products</h3>
            <nav className="space-y-2">
              <Link href="/products?category=forex" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Forex Bots
              </Link>
              <Link href="/products?category=crypto" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Crypto Bots
              </Link>
              <Link href="/products?category=indicators" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Indicators
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <nav className="space-y-2">
              <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
              <a href="mailto:support@thedbot.com" className="block text-gray-400 hover:text-white transition-colors text-sm">
                support@thedbot.com
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Legal</h3>
            <nav className="space-y-2">
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} theDBot. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Made with ❤️ for traders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


