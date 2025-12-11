import Link from "next/link";
import { ArrowRight, Zap, Shield, TrendingUp, Globe } from "@/components/icons";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden bg-black dark:bg-black">
        <div className="absolute inset-0 hero-gradient opacity-30"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center space-y-8">
            <div className="space-y-2 hero-headings-group">
              <div className="hero-line hero-line-left">
                <AnimatedHeading enablePerspective={false} groupHover={true} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block">
                  AUTOMATED
                </AnimatedHeading>
              </div>
              <div className="hero-line hero-line-left">
                <AnimatedHeading enablePerspective={false} groupHover={true} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block">
                  EXECUTION
                </AnimatedHeading>
              </div>
              <div className="hero-line hero-line-right">
                <AnimatedHeading enablePerspective={false} groupHover={true} lineStyle="second" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block">
                  MADE SIMPLE
                </AnimatedHeading>
              </div>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed pt-6">
                Automation software that turns Telegram or TradingView signals into instant orders on MetaTrader 5/4 with built-in risk controls.
                <br />
                <span className="text-accent font-semibold">Automate order execution when a Telegram signal arrives in MetaTrader 5 • Instant delivery • Secure licensing</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
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
      <section className="py-20 bg-white dark:bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <AnimatedHeading className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading tracking-tight leading-[0.95] cursor-heading cursor-heading-why-choose mb-4">
              WHY CHOOSE
              <br />
              theDBot
            </AnimatedHeading>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Professional-grade automation with enterprise-level security and support
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
      <section className="py-20 bg-black dark:bg-black" data-bg="black">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <AnimatedHeading className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading tracking-tight leading-[0.95] cursor-heading cursor-heading-why-choose mb-4">
              AUTOMATION
              <br />
              CATEGORIES
            </AnimatedHeading>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Choose from our comprehensive range of automation solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/products?category=workflow" className="group">
              <div className="category-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-white p-8 h-[480px] transition-all duration-500 hover:from-white hover:via-slate-100 hover:to-white">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4">
                    <span className="text-4xl">🔁</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">Workflow Automator</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Trigger automated trading actions via REST APIs, webhook listeners, or custom event pipelines. Ideal for signal providers, bot creators, or platforms needing scalable execution logic.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1.5 mb-4 flex-grow">
                    <li>• Supports TradingView, Telegram, and custom webhook formats</li>
                    <li>• JSON-based API with authentication and rate limits</li>
                    <li>• Includes sandbox mode for testing integrations</li>
                    <li>• Compatible with MT5, MT4, and custom bots</li>
                  </ul>
                  <div className="flex items-center text-accent group-hover:text-accent/80 transition-colors mt-auto">
                    <span className="font-semibold text-blue-700">Explore Workflow Automator</span>
                    <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?category=strategy" className="group">
              <div className="category-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-blue-50 to-white p-8 h-[480px] transition-all duration-500 hover:from-white hover:via-blue-100 hover:to-white">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4">
                    <span className="text-4xl">🧠</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">Strategy Engine</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Design and deploy rule-based or AI-enhanced trading strategies with modular logic blocks and real-time market feeds.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1.5 mb-4 flex-grow">
                    <li>• Drag-and-drop strategy builder or Python scripting</li>
                    <li>• Supports multi-timeframe analysis and indicator stacking</li>
                    <li>• Backtest with historical data or simulate live conditions</li>
                    <li>• Export strategies to MT5 or integrate via API</li>
                  </ul>
                  <div className="flex items-center text-accent group-hover:text-accent/80 transition-colors mt-auto">
                    <span className="font-semibold text-indigo-700">Explore Strategy Engine</span>
                    <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?category=signal-sync" className="group">
              <div className="category-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-indigo-50 to-white p-8 h-[480px] transition-all duration-500 hover:from-white hover:via-indigo-100 hover:to-white">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4">
                    <span className="text-4xl">📡</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">Signal Sync Hub</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Synchronize signals from multiple sources—Telegram, TradingView, Discord—and route them to your preferred execution platform.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1.5 mb-4 flex-grow">
                    <li>• Real-time parsing of messages, alerts, and webhook payloads</li>
                    <li>• Signal filtering, delay control, and conditional triggers</li>
                    <li>• Multi-account routing with license-based access</li>
                    <li>• MT5, MT4, and Binance execution modules available</li>
                  </ul>
                  <div className="flex items-center text-accent group-hover:text-accent/80 transition-colors mt-auto">
                    <span className="font-semibold text-indigo-700">Explore Signal Sync Hub</span>
                    <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - White Background */}
      <section className="py-20 bg-white dark:bg-white relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-6">
          <AnimatedHeading enablePerspective={false} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading tracking-tight leading-[0.95] cursor-heading cursor-heading-why-choose mb-2">
              READY TO START
              <br />
              AUTOMATED
              <br />
              EXECUTION
          </AnimatedHeading>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of teams who trust theDBot for automated order execution. 
            Start with a free demo or launch your first automation today.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              Browse All Products
              <ArrowRight className="size-5" />
            </Link>
            <Link 
              href="/contact" 
              className="text-lg text-gray-600 hover:text-black transition-colors duration-300"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
