import Link from "next/link";
import { ArrowRight, Star, Download, Shield } from "@/components/icons";

// Sample product data
const products = [
  {
    id: "forex-ma-bot",
    name: "Forex MA Bot Pro",
    category: "forex",
    description: "Advanced moving average crossover bot with multi-timeframe analysis",
    price: 299,
    currency: "USD",
    features: ["MT4/MT5 Compatible", "Multi-timeframe", "Risk Management", "Backtesting"],
    rating: 4.8,
    reviews: 127,
    image: "/api/placeholder/400/300",
    badge: "Best Seller"
  },
  {
    id: "crypto-scalper",
    name: "Crypto Scalper Elite",
    category: "crypto",
    description: "High-frequency cryptocurrency scalping bot with advanced algorithms",
    price: 499,
    currency: "USD",
    features: ["24/7 Trading", "Low Latency", "Multi-exchange", "Real-time Alerts"],
    rating: 4.9,
    reviews: 89,
    image: "/api/placeholder/400/300",
    badge: "New"
  },
  {
    id: "rsi-divergence",
    name: "RSI Divergence Indicator",
    category: "indicators",
    description: "Advanced RSI divergence detection for TradingView with custom alerts",
    price: 99,
    currency: "USD",
    features: ["TradingView Compatible", "Custom Alerts", "Multiple Timeframes", "Visual Signals"],
    rating: 4.7,
    reviews: 203,
    image: "/api/placeholder/400/300",
    badge: "Popular"
  },
  {
    id: "signal-executor",
    name: "Signal Executor Pro",
    category: "forex",
    description: "Professional signal execution bot with advanced order management",
    price: 199,
    currency: "USD",
    features: ["Signal Integration", "Order Management", "Position Sizing", "Stop Loss"],
    rating: 4.6,
    reviews: 156,
    image: "/api/placeholder/400/300"
  },
  {
    id: "bollinger-bands",
    name: "Bollinger Bands Pro",
    category: "indicators",
    description: "Enhanced Bollinger Bands indicator with breakout detection",
    price: 79,
    currency: "USD",
    features: ["Breakout Detection", "Volume Analysis", "Custom Settings", "Alert System"],
    rating: 4.5,
    reviews: 178,
    image: "/api/placeholder/400/300"
  },
  {
    id: "grid-trading-bot",
    name: "Grid Trading Bot",
    category: "crypto",
    description: "Automated grid trading strategy for cryptocurrency markets",
    price: 399,
    currency: "USD",
    features: ["Grid Strategy", "Market Making", "Risk Control", "Profit Optimization"],
    rating: 4.8,
    reviews: 67,
    image: "/api/placeholder/400/300"
  }
];

const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "forex", name: "Forex Bots", count: products.filter(p => p.category === "forex").length },
  { id: "crypto", name: "Crypto Bots", count: products.filter(p => p.category === "crypto").length },
  { id: "indicators", name: "Indicators", count: products.filter(p => p.category === "indicators").length },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/20 to-indigo-900/20"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              <span className="text-white dark:text-white">Trading</span> <span className="text-accent">Products</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional automated trading solutions for every market condition
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-900/30">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-6 py-3 rounded-full bg-gray-800/50 hover:bg-blue-600/20 text-gray-300 hover:text-white transition-all duration-300 border border-gray-700 hover:border-blue-500"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group relative bg-gray-800/30 rounded-2xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300 hover-lift">
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <Download className="size-8 text-blue-400" />
                  </div>
                  {product.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-white">
                        ${product.price}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Shield className="size-4" />
                        <span>Secure License</span>
                      </div>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 group-hover:scale-105"
                    >
                      View Details
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Need a <span className="text-blue-400">Custom Solution</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We can develop custom trading bots and indicators tailored to your specific strategy and requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Custom Quote
              <ArrowRight className="size-5" />
            </Link>
            <Link 
              href="/faq" 
              className="text-lg text-gray-300 hover:text-white transition-colors duration-300"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


