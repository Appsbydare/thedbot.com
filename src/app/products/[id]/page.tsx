import Link from "next/link";
import { ArrowLeft, Star, Download, Shield, CheckCircle, Zap } from "@/components/icons";
import BuyWithCryptoButton from "@/components/BuyWithCryptoButton";

// Sample product data - in a real app, this would come from a database
const products = {
  "forex-ma-bot": {
    id: "forex-ma-bot",
    name: "Forex MA Bot Pro",
    category: "forex",
    description: "Advanced moving average crossover bot with multi-timeframe analysis and intelligent risk management.",
    longDescription: "The Forex MA Bot Pro is a sophisticated automated trading solution designed for forex markets. It uses advanced moving average crossover strategies combined with multi-timeframe analysis to identify high-probability trading opportunities. The bot includes intelligent risk management features and can adapt to changing market conditions.",
    price: 299,
    currency: "USD",
    features: [
      "MT4/MT5 Compatible",
      "Multi-timeframe Analysis",
      "Advanced Risk Management",
      "Backtesting Capabilities",
      "Real-time Alerts",
      "Customizable Parameters",
      "24/7 Support",
      "Free Updates"
    ],
    specifications: {
      "Platform": "MT4, MT5",
      "Timeframes": "M1, M5, M15, M30, H1, H4, D1",
      "Pairs": "All Major & Minor",
      "Strategy": "Moving Average Crossover",
      "Risk Management": "Stop Loss, Take Profit, Trailing Stop",
      "Backtesting": "Yes, with detailed reports"
    },
    rating: 4.8,
    reviews: 127,
    image: "/api/placeholder/600/400",
    badge: "Best Seller",
    demo: true,
    support: "24/7 Email Support"
  },
  "crypto-scalper": {
    id: "crypto-scalper",
    name: "Crypto Scalper Elite",
    category: "crypto",
    description: "High-frequency cryptocurrency scalping bot with advanced algorithms and low latency execution.",
    longDescription: "The Crypto Scalper Elite is designed for high-frequency trading in cryptocurrency markets. It uses advanced algorithms to identify micro-trends and execute trades with minimal latency. The bot is optimized for scalping strategies and includes sophisticated risk management to protect your capital.",
    price: 499,
    currency: "USD",
    features: [
      "24/7 Trading",
      "Low Latency Execution",
      "Multi-exchange Support",
      "Real-time Market Analysis",
      "Advanced Risk Controls",
      "Performance Analytics",
      "API Integration",
      "Priority Support"
    ],
    specifications: {
      "Platform": "Custom API",
      "Exchanges": "Binance, Coinbase Pro, Kraken",
      "Strategy": "High-Frequency Scalping",
      "Execution Speed": "< 100ms",
      "Risk Management": "Dynamic Position Sizing",
      "Monitoring": "Real-time Dashboard"
    },
    rating: 4.9,
    reviews: 89,
    image: "/api/placeholder/600/400",
    badge: "New",
    demo: true,
    support: "Priority Support"
  },
  "rsi-divergence": {
    id: "rsi-divergence",
    name: "RSI Divergence Indicator",
    category: "indicators",
    description: "Advanced RSI divergence detection for TradingView with custom alerts and visual signals.",
    longDescription: "The RSI Divergence Indicator is a powerful tool for identifying potential trend reversals in TradingView. It automatically detects bullish and bearish divergences between price action and RSI, providing clear visual signals and customizable alerts to help you make informed trading decisions.",
    price: 99,
    currency: "USD",
    features: [
      "TradingView Compatible",
      "Custom Alerts",
      "Multiple Timeframes",
      "Visual Signals",
      "Divergence Detection",
      "Customizable Settings",
      "Documentation Included",
      "Email Support"
    ],
    specifications: {
      "Platform": "TradingView",
      "Timeframes": "All Available",
      "Indicators": "RSI Divergence",
      "Alerts": "Customizable",
      "Visual": "Clear Signals",
      "Settings": "Fully Customizable"
    },
    rating: 4.7,
    reviews: 203,
    image: "/api/placeholder/600/400",
    badge: "Popular",
    demo: false,
    support: "Email Support"
  }
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products[params.id as keyof typeof products];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-400 hover:text-blue-300">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="size-12 text-blue-400" />
                  </div>
                  <p className="text-gray-400">Product Preview</p>
                </div>
              </div>
              {product.badge && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`size-5 ${
                        i < Math.floor(product.rating) 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-600"
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-300">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-white">
                ${product.price} {product.currency}
              </div>

              {/* Features Preview */}
              <div className="grid grid-cols-2 gap-3">
                {product.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-400" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                  <Download className="size-5" />
                  Purchase Now
                </button>
                <BuyWithCryptoButton
                  productId={product.id}
                  amountUSD={product.price}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                />
                {product.demo && (
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                    Try Demo
                  </button>
                )}
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="size-4" />
                <span className="text-sm">Secure crypto payment via CoinPayments • Instant Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Description</h2>
                <p className="text-gray-300 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                      <CheckCircle className="size-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Specifications</h2>
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-700 last:border-b-0">
                        <span className="text-gray-400 font-medium">{key}</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Purchase Card */}
              <div className="bg-gray-800/50 rounded-2xl p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-white mb-4">Purchase {product.name}</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="text-3xl font-bold text-white">
                    ${product.price} {product.currency}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="size-4 text-green-400" />
                      <span>Instant Download</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="size-4 text-green-400" />
                      <span>One License</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="size-4 text-green-400" />
                      <span>{product.support}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="size-4 text-green-400" />
                      <span>Free Updates</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mb-4">
                  Purchase Now
                </button>
                
                <p className="text-xs text-gray-400 text-center">
                  Secure payment via cryptocurrency. 7-day money-back guarantee.
                </p>
              </div>

              {/* Support */}
              <div className="bg-gray-800/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Need Help?</h3>
                <p className="text-gray-300 mb-4">
                  Our support team is here to help you get started.
                </p>
                <Link 
                  href="/contact" 
                  className="block text-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
