'use client'

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, CheckCircle, Zap, Download } from "@/components/icons";
import PaymentModal from "@/components/PaymentModal";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  downloadInfo: any;
  params: { id: string };
};

export default function ProductPageClient({ product, downloadInfo, params }: Props) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Check if this is a custom quote product
  const isCustomQuote = product.priceUSD === 0 || product.deliverableType === 'custom';

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Product Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Product Header */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {product.badge && (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {product.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`size-5 ${
                            i < Math.floor((product.rating ?? 0)) 
                              ? "text-yellow-400 fill-current" 
                              : "text-gray-600"
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-300">{product.rating ?? 0} ({product.reviews ?? 0} reviews)</span>
                  </div>
                  
                  <h1 className="text-4xl font-heading text-white mb-4">
                    {product.name}
                  </h1>
                  
                  <p className="text-xl text-gray-300 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    {isCustomQuote ? (
                      <div className="text-3xl font-bold text-white">Custom Quote</div>
                    ) : product.monthlyPriceUSD ? (
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-white">${product.priceUSD} USD/month</div>
                        <div className="text-lg text-gray-300">or ${product.monthlyPriceUSD} USD/year</div>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-white">${product.priceUSD} USD</div>
                    )}
                  </div>
                </div>
                
                {/* Product Icon */}
                <div className="ml-6">
                  <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center">
                    {product.name === "Telegram Auto Executor" ? (
                      <div className="text-3xl">📱</div>
                    ) : (
                      <Zap className="size-10 text-blue-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-heading text-white mb-6">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Platform Requirements & Legal Notice (Telegram bot only) */}
            {product.id === "telegram-auto-executor" && (
              <div className="bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-heading text-white mb-6">Platform Requirements & Legal Notice</h2>
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Third-Party API Usage</h3>
                    <p><strong>This software uses the Telegram API and is part of the Telegram ecosystem.</strong> This is an independent third-party application, not affiliated with, endorsed by, or sponsored by Telegram FZ-LLC or MetaQuotes Software Corp.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Requirements</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Users must obtain their own Telegram API credentials (API ID & Hash) from <a href="https://my.telegram.org" target="_blank" className="underline">my.telegram.org</a></li>
                      <li>Requires MetaTrader 5 platform (provided by your forex broker)</li>
                      <li>Windows operating system or VPS recommended for 24/7 operation</li>
                      <li>Broker must allow Expert Advisors (EAs) and automated execution</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">User Responsibilities</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Comply with Telegram&apos;s Terms of Service</li>
                      <li>Comply with your broker&apos;s terms and conditions</li>
                      <li>Test thoroughly on demo accounts before live deployment</li>
                      <li>Ensure you have proper permissions for automated execution</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-heading text-white mb-6">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
                    <CheckCircle className="size-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-heading text-white mb-6">Specifications</h2>
                <div className="bg-gray-700/50 rounded-lg p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-600 last:border-b-0">
                        <span className="text-gray-400 font-medium">{key}</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sticky Purchase Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Purchase Card */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-2xl font-heading text-white mb-4">Purchase {product.name}</h3>
                
                <div className="space-y-4 mb-6">
                  {isCustomQuote ? (
                    <div className="text-3xl font-bold text-white">Custom Quote</div>
                  ) : product.monthlyPriceUSD ? (
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-white">${product.priceUSD} USD/month</div>
                      <div className="text-lg text-gray-300">or ${product.monthlyPriceUSD} USD/year</div>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-white">${product.priceUSD} USD</div>
                  )}
                  
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

                {isCustomQuote ? (
                  <Link
                    href="/contact"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mb-3 text-center"
                  >
                    Book Consultation Now!
                  </Link>
                ) : (
                  <button 
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mb-3"
                  >
                    Purchase Now
                  </button>
                )}

                {downloadInfo && (
                  <Link
                    href={`/download/${params.id}`}
                    className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-center mb-4"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Download className="size-5" />
                      Download Application
                    </span>
                  </Link>
                )}

                {product.specifications && (
                  <div className="space-y-2 mb-4">
                    <a 
                      href="/Product Specs/Telegram-Auto-Executor-Specifications.html" 
                      target="_blank"
                      className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center text-sm"
                    >
                      📄 View Specifications
                    </a>
                    <a 
                      href="/Product Specs/Telegram-Auto-Executor-Technical-Specs.html" 
                      target="_blank"
                      className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center text-sm"
                    >
                      🔧 Technical Documentation
                    </a>
                  </div>
                )}
                
                <p className="text-xs text-gray-400 text-center">
                  Secure payment via digital currency.
                </p>
              </div>

              {/* Automation Warning */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-2xl p-6">
                <h3 className="text-xl font-heading text-yellow-400 mb-4 flex items-center gap-2">
                  ⚠️ Important Warning
                </h3>
                <div className="text-yellow-200 text-sm space-y-3">
                  <p><strong>Demo First:</strong> Test with demo account to understand SL/TP settings for your signal provider.</p>
                  <p><strong>Not Financial Advice:</strong> TheDBot.com is a software company, not financial advisers.</p>
                  <p><strong>High Risk:</strong> 95%+ of traders lose money. Practice with demo first!</p>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-heading text-white mb-4">Need Help?</h3>
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
      </div>

      {/* Payment Modal - Only show for non-custom products */}
      {!isCustomQuote && (
        <PaymentModal
          productId={product.id}
          productName={product.name}
          amountUSD={product.priceUSD}
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}

    </div>
  );
}

