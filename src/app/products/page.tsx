import Link from "next/link";
import { ArrowRight, Star, Download, Shield } from "@/components/icons";
import { products as catalog } from "@/data/products";
import AnimatedHeading from "@/components/AnimatedHeading";
const products = catalog;

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
      <section className="relative py-20 sm:py-32 overflow-hidden bg-black dark:bg-black">
        <div className="absolute inset-0 hero-gradient opacity-30"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center space-y-8">
            <AnimatedHeading className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading tracking-tight leading-[0.95] uppercase cursor-heading">
              TRADING
              <br />
              PRODUCTS
            </AnimatedHeading>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional automated trading solutions for every market condition
            </p>
          </div>
        </div>
      </section>

      {/* Platform Compatibility Notice */}
      <section className="py-8 bg-secondary border-t border-border">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-xl p-6 bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-2">Platform Compatibility</h2>
            <p className="text-sm text-muted-foreground mb-3">
              All our products are designed to work with MetaTrader 4/5 platforms (provided by your broker). Some products integrate with Telegram (signal bots) or TradingView (indicators).
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Broker Compatibility:</strong> Most products require your broker to allow Expert Advisors (EAs) and automated trading. Please verify with your broker before purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-secondary">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-6 py-3 rounded-full bg-card hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-all duration-300 border border-border hover:border-accent"
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
              <div key={product.id} className="group relative card rounded-2xl overflow-hidden hover-lift">
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                    <Download className="size-8 text-accent" />
                  </div>
                  {product.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
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
                            i < Math.floor(product.rating ?? 0)
                              ? "text-yellow-400 fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {(product.rating ?? 0)} ({product.reviews ?? 0} reviews)
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-foreground">
                        {product.monthlyPriceUSD ? `$${product.priceUSD}/month` : `$${product.priceUSD}`}
                      </div>
                      {product.monthlyPriceUSD && (
                        <div className="text-sm text-muted-foreground">
                          or ${product.monthlyPriceUSD}/year
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="size-4" />
                        <span>Secure License</span>
                      </div>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-all duration-300 group-hover:scale-105"
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
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Need a <span className="text-accent">Custom Solution</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We can develop custom trading bots and indicators tailored to your specific strategy and requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Custom Quote
              <ArrowRight className="size-5" />
            </Link>
            <Link 
              href="/faq" 
              className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


