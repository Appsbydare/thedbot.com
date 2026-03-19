export default function RefundPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Dark */}
      <section className="relative pt-35 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-black dark:bg-black">
        <div className="absolute inset-0 hero-gradient opacity-30"></div>
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white">
              Refund <span className="text-accent">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our 7-day money-back policy and how to request a refund
            </p>
          </div>
        </div>
      </section>

      {/* Refund Content - White Section */}
      <section className="py-20 bg-white dark:bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="prose max-w-none">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Eligibility</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Refunds are available within 7 days of purchase under the following conditions:</p>
                  <div className="bg-black text-white p-6 rounded-lg">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Technical issues prevent the software from operating as described on your system</li>
                      <li>License activation problems that cannot be resolved by our support team</li>
                      <li>Product not as described on the product page</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Not Eligible</h2>
                <div className="space-y-4 text-gray-600">
                  <div className="bg-red-900 text-white p-6 rounded-lg border border-red-700">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Market losses or performance-related outcomes</li>
                      <li>Change of mind after successful installation and activation</li>
                      <li>Incompatibility with your broker&apos;s restrictions on automated execution</li>
                      <li>Refund requests after the 7-day window</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-black mb-6">How to Request a Refund</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Please email <a href="mailto:%22Support%20Agent%22%20%3Cdarshana@thedbot.com%3E" className="text-accent underline font-semibold">support@thedbot.com</a> with:</p>
                  <div className="bg-black text-white p-6 rounded-lg">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Your order number</li>
                      <li>A brief description of the issue</li>
                      <li>Screenshots or error logs (if technical)</li>
                    </ul>
                  </div>
                  <p>Refunds are processed within 5–7 business days to the original payment method once approved.</p>
                </div>
              </div>

              {/* Contact */}
              <div className="text-center p-8 rounded-lg bg-black text-white">
                <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
                <p className="text-gray-300 mb-6">
                  If you have questions about our refund policy, please don&apos;t hesitate to contact our support team.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 font-semibold transition-all duration-300"
                >
                  Contact Support
                </a>
              </div>

              <div className="text-center text-gray-500 text-sm">
                <p>Last Updated: December 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
