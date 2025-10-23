import Link from "next/link";
import { ArrowLeft, Star, Download, Shield, CheckCircle, Zap } from "@/components/icons";
import PurchaseForm from "@/components/PurchaseForm";
import { products as catalog } from "@/data/products";

const products = Object.fromEntries(catalog.map((p) => [p.id, p]));

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
                    {product.name === "Telegram Trading Bot" ? (
                      <div className="text-4xl">📱</div>
                    ) : (
                      <Zap className="size-12 text-blue-400" />
                    )}
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
                        i < Math.floor((product.rating ?? 0)) 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-600"
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-300">{product.rating ?? 0} ({product.reviews ?? 0} reviews)</span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                {product.monthlyPriceUSD ? (
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-white">${product.priceUSD} USD/year</div>
                    <div className="text-xl text-gray-300">or ${product.monthlyPriceUSD} USD/month</div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">${product.priceUSD} USD</div>
                )}
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
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                    <Download className="size-5" />
                    Purchase Now
                  </button>
                  <div className="flex-1">
                    <PurchaseForm productId={product.id} amountUSD={product.priceUSD} />
                  </div>
                  {product.demo && (
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                      Try Demo
                    </button>
                  )}
                </div>
                {product.specifications && (
                  <div className="space-y-2">
                    <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 border border-gray-600">
                      View Product Specifications
                    </button>
                    <div className="flex gap-2">
                      <a 
                        href="/Product Specs/Telegram-Trading-Bot-Specifications.pdf" 
                        download
                        className="flex-1 bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center text-sm"
                      >
                        Download Specs
                      </a>
                      <a 
                        href="/Product Specs/Telegram-Trading-Bot-Technical-Specs.pdf" 
                        download
                        className="flex-1 bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center text-sm"
                      >
                        Technical Docs
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="size-4" />
                <span className="text-sm">Secure crypto payment via CoinPayments • Instant Delivery</span>
              </div>

              {/* Important Warning */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-400 text-xl">⚠️</div>
                  <div className="space-y-2">
                    <h4 className="text-yellow-400 font-semibold">Important Trading Warning</h4>
                    <div className="text-yellow-200 text-sm space-y-2">
                      <p><strong>Demo Testing Recommended:</strong> We strongly recommend testing this tool with a demo account first to understand the optimal SL and TP settings for your specific signal provider.</p>
                      <p><strong>Custom Strategy Caution:</strong> If you&apos;re using customized TP and SL strategies, ensure you thoroughly understand how they work with your signal provider&apos;s trading style.</p>
                      <p><strong>Financial Disclaimer:</strong> TheDBot.com is a software manufacturing company only. We are NOT financial advisers and do not provide trading advice.</p>
                      <p><strong>Trading Risks:</strong> Trading involves substantial risk of loss. More than 95% of traders lose money due to trading. Please practice with a demo account first and only trade with money you can afford to lose.</p>
                    </div>
                  </div>
                </div>
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

              {/* Specifications (optional) */}
              {Boolean(product.specifications) && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Specifications</h2>
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(product.specifications as Record<string, string>).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-700 last:border-b-0">
                          <span className="text-gray-400 font-medium">{key}</span>
                          <span className="text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Purchase Card */}
              <div className="bg-gray-800/50 rounded-2xl p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-white mb-4">Purchase {product.name}</h3>
                
                <div className="space-y-4 mb-6">
                  {product.monthlyPriceUSD ? (
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-white">${product.priceUSD} USD/year</div>
                      <div className="text-lg text-gray-300">or ${product.monthlyPriceUSD} USD/month</div>
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

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mb-4">
                  Purchase Now
                </button>
                
                {product.specifications && (
                  <div className="space-y-2 mb-4">
                    <a 
                      href="/Product Specs/Telegram-Trading-Bot-Specifications.pdf" 
                      download
                      className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center text-sm"
                    >
                      📄 Download Specifications
                    </a>
                    <a 
                      href="/Product Specs/Telegram-Trading-Bot-Technical-Specs.pdf" 
                      download
                      className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center text-sm"
                    >
                      🔧 Technical Documentation
                    </a>
                  </div>
                )}
                
                <p className="text-xs text-gray-400 text-center">
                  Secure payment via cryptocurrency. 7-day money-back guarantee.
                </p>
              </div>

              {/* Trading Warning */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  ⚠️ Important Warning
                </h3>
                <div className="text-yellow-200 text-sm space-y-3">
                  <p><strong>Demo First:</strong> Test with demo account to understand SL/TP settings for your signal provider.</p>
                  <p><strong>Not Financial Advice:</strong> TheDBot.com is a software company, not financial advisers.</p>
                  <p><strong>High Risk:</strong> 95%+ of traders lose money. Practice with demo first!</p>
                </div>
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
