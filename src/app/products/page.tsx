'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Star, Download, Shield } from "@/components/icons";
import { products as catalog } from "@/data/products";
import AnimatedHeading from "@/components/AnimatedHeading";
import SimpleSlideHeading from "@/components/SimpleSlideHeading";
import PaymentModal from "@/components/PaymentModal";
const products = catalog;

export default function ProductsPage() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string; priceUSD: number } | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleBuyNow = (e: React.MouseEvent, product: { id: string; name: string; priceUSD: number }) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setIsPaymentModalOpen(true);
  };
  return (
    <div className="min-h-screen">
      {/* Hero Section - Dark */}
      <section className="relative pt-35 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-black dark:bg-black">
        <div className="absolute inset-0 hero-gradient opacity-30"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center space-y-8">
            <AnimatedHeading enablePerspective={false} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.95] uppercase cursor-heading">
              AUTOMATION
              <br />
              PRODUCTS
            </AnimatedHeading>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional automation solutions for trading, business operations, and custom integrations
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid - White Section */}
      <section className="py-20 bg-white dark:bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const isCustomQuote = product.priceUSD === 0 || product.deliverableType === 'custom';

              return (
                <div
                  key={product.id}
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="group relative rounded-2xl overflow-hidden bg-black text-white hover:scale-[1.02] transition-transform duration-300 block cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
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
                      <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${i < Math.floor(product.rating ?? 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">
                        {(product.rating ?? 0)} ({product.reviews ?? 0} reviews)
                      </span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {product.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-white">
                          {isCustomQuote ? 'Custom Quote' : product.monthlyPriceUSD ? `$${product.priceUSD}/month` : `$${product.priceUSD}`}
                        </div>
                        {product.monthlyPriceUSD && (
                          <div className="text-sm text-gray-400">
                            or ${product.monthlyPriceUSD}/year
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Shield className="size-4" />
                          <span>{isCustomQuote ? 'Consultation' : 'Secure License'}</span>
                        </div>
                      </div>
                      {isCustomQuote ? (
                        <Link
                          href="/contact"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-all duration-300 group-hover:scale-105"
                        >
                          Contact Us
                          <ArrowRight className="size-4" />
                        </Link>
                      ) : (
                        <button
                          onClick={(e) => handleBuyNow(e, { id: product.id, name: product.name, priceUSD: product.priceUSD })}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-all duration-300 group-hover:scale-105"
                        >
                          Buy Now
                          <ArrowRight className="size-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Compatibility Notice - White Section */}
      <section className="py-8 bg-white dark:bg-white border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-heading tracking-tight leading-[0.95] uppercase text-black">
              PLATFORM COMPATIBILITY
            </h2>
          </div>
          <div className="rounded-xl p-6 bg-black text-white">
            <p className="text-sm text-gray-300 mb-3">
              Our solutions work across multiple platforms depending on your needs:
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong className="text-white">Trading Automation:</strong> MetaTrader 4/5 (provided by your broker), TradingView, Telegram signal services
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong className="text-white">Business Automation:</strong> REST APIs, webhooks, custom middleware for CRM, ERP, e-commerce platforms
            </p>
            <p className="text-sm text-gray-300 mb-3">
              <strong className="text-white">Custom Integration:</strong> We build solutions for virtually any system with API access or database connectivity
            </p>
            <p className="text-sm text-gray-300">
              <strong className="text-white">Note:</strong> Trading automation products require your broker to allow Expert Advisors (EAs) and automated execution. Business automation solutions are platform-agnostic and work with most modern systems.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Dark */}
      <section className="py-20 bg-black dark:bg-black">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Need a <span className="text-accent">Custom Solution</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We specialize in custom automation development—from trading strategies to business process automation and complex API integrations. Tell us what you need, and we&apos;ll build it.
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
              className="text-lg text-gray-400 hover:text-white transition-colors duration-300"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {selectedProduct && (
        <PaymentModal
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          amountUSD={selectedProduct.priceUSD}
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}


