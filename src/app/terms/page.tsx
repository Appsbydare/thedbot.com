export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Terms of <span className="text-blue-400">Service</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Please read these terms carefully before using our products and services
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="prose prose-invert max-w-none">
            <div className="space-y-12">
              {/* License Terms */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">License Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    By purchasing our trading bots, indicators, or other software products, you are granted a limited, 
                    non-exclusive, non-transferable license to use the software on a single MT4/MT5 account.
                  </p>
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">License Restrictions:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>One license per MT4/MT5 account</li>
                      <li>No sharing, reselling, or redistribution of the software</li>
                      <li>No reverse engineering or modification of the source code</li>
                      <li>No use on multiple accounts without additional licenses</li>
                      <li>License is bound to the account number provided during purchase</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Usage Terms */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Usage Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Our trading bots and indicators are designed for educational and trading purposes. 
                    Users are responsible for their own trading decisions and risk management.
                  </p>
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">User Responsibilities:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Test all bots on demo accounts before live trading</li>
                      <li>Understand the risks involved in automated trading</li>
                      <li>Monitor bot performance and adjust settings as needed</li>
                      <li>Ensure proper risk management and position sizing</li>
                      <li>Keep software updated to the latest version</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Terms */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Payment Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    All payments are processed securely through cryptocurrency payment gateways. 
                    Prices are listed in USD but may be converted to your local currency.
                  </p>
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Payment Information:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>All prices are final and non-negotiable</li>
                      <li>Payments are processed in cryptocurrency only</li>
                      <li>License delivery occurs after payment confirmation</li>
                      <li>No recurring fees or subscriptions</li>
                      <li>Refunds available within 7 days for unused licenses</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Refund Policy */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Refund Policy</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We offer a 7-day money-back guarantee for all products under specific conditions.
                  </p>
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Refund Conditions:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Request must be made within 7 days of purchase</li>
                      <li>Bot must not have been used for live trading</li>
                      <li>Technical issues that cannot be resolved by our support team</li>
                      <li>No refunds for indicators or used licenses</li>
                      <li>Refunds processed in the original payment method</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Support Terms */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Support Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We provide technical support for installation, configuration, and troubleshooting 
                    of our products during the license period.
                  </p>
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Support Includes:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Installation and setup assistance</li>
                      <li>Configuration and parameter optimization</li>
                      <li>Bug fixes and compatibility updates</li>
                      <li>Email support with 24-hour response time</li>
                      <li>Access to knowledge base and documentation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Disclaimers */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Disclaimers</h2>
                <div className="space-y-4 text-gray-300">
                  <div className="bg-red-900/20 border border-red-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-red-400 mb-4">Important Disclaimers:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Trading involves substantial risk of loss and is not suitable for all investors</li>
                      <li>Past performance does not guarantee future results</li>
                      <li>Automated trading systems can result in losses</li>
                      <li>We are not responsible for trading losses or financial damages</li>
                      <li>Users should always test on demo accounts first</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Legal Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    These terms are governed by applicable laws. Any disputes will be resolved 
                    through arbitration or in the appropriate jurisdiction.
                  </p>
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Legal Information:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Terms may be updated without notice</li>
                      <li>Continued use constitutes acceptance of new terms</li>
                      <li>Severability clause applies to all terms</li>
                      <li>Force majeure events may affect service delivery</li>
                      <li>Contact us for questions about these terms</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="text-center p-8 rounded-lg bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                <h3 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h3>
                <p className="text-gray-300 mb-6">
                  If you have any questions about these terms of service, please contact our support team.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-all duration-300"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


