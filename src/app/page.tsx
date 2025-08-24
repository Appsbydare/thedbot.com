import Link from "next/link";
import { ArrowRight, Zap, Shield, TrendingUp, Globe } from "@/components/icons";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight gradient-text">
                Automated Trading
                <br />
                <span className="text-accent">Made Simple</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Professional trading bots, signal executors, and indicators for MT4/MT5 & TradingView.
                <br />
                <span className="text-accent font-semibold">Crypto payments • Instant delivery • Secure licensing</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Explore Products
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/faq" 
                className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Why Choose <span className="text-accent">theDBot</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade trading automation with enterprise-level security and support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 rounded-2xl card hover-lift">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <Zap className="size-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Instant Setup</h3>
              <p className="text-muted-foreground">Download and install in minutes. No complex configuration required.</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl card hover-lift">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <Shield className="size-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Secure Licensing</h3>
              <p className="text-muted-foreground">One license per account. Advanced protection against unauthorized use.</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl card hover-lift">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <TrendingUp className="size-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Proven Results</h3>
              <p className="text-muted-foreground">Backtested strategies with real market performance data.</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl card hover-lift">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <Globe className="size-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Global Support</h3>
              <p className="text-muted-foreground">24/7 customer support and regular updates for all platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Trading <span className="text-accent">Categories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of automated trading solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/products?category=forex" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-8 h-80 hover:from-blue-600/30 hover:to-blue-800/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-4">Forex Bots</h3>
                  <p className="text-gray-300 mb-6">
                    Advanced currency trading automation with multi-pair support and risk management
                  </p>
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span className="font-semibold">Explore Forex</span>
                    <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?category=crypto" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600/20 to-green-800/20 p-8 h-80 hover:from-green-600/30 hover:to-green-800/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-4">Crypto Bots</h3>
                  <p className="text-gray-300 mb-6">
                    High-frequency cryptocurrency trading with advanced market analysis algorithms
                  </p>
                  <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors">
                    <span className="font-semibold">Explore Crypto</span>
                    <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?category=indicators" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-8 h-80 hover:from-purple-600/30 hover:to-purple-800/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-4">Indicators</h3>
                  <p className="text-gray-300 mb-6">
                    Custom Pine Script indicators for TradingView with real-time alerts and signals
                  </p>
                  <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="font-semibold">Explore Indicators</span>
                    <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Ready to Start <span className="text-accent">Automated Trading</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of traders who trust theDBot for their automated trading needs. 
            Start with a free demo or purchase your first bot today.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Browse All Products
              <ArrowRight className="size-5" />
            </Link>
            <Link 
              href="/contact" 
              className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
