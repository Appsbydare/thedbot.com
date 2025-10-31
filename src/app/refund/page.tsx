export default function RefundPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              Refund <span className="text-accent">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our 7-day money-back policy and how to request a refund
            </p>
          </div>
        </div>
      </section>

      {/* Refund Content */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="prose max-w-none">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Eligibility</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Refunds are available within 7 days of purchase under the following conditions:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Technical issues prevent the software from operating as described on your system</li>
                    <li>License activation problems that cannot be resolved by our support team</li>
                    <li>Product not as described on the product page</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Not Eligible</h2>
                <div className="space-y-4 text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Trading losses or performance-related outcomes</li>
                    <li>Change of mind after successful installation and activation</li>
                    <li>Incompatibility with your broker&apos;s restrictions on automated trading</li>
                    <li>Refund requests after the 7-day window</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">How to Request a Refund</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Please email <a href="mailto:support@thedbot.com" className="text-foreground underline">support@thedbot.com</a> with:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Your order number</li>
                    <li>A brief description of the issue</li>
                    <li>Screenshots or error logs (if technical)</li>
                  </ul>
                  <p>Refunds are processed within 5–7 business days to the original payment method once approved.</p>
                </div>
              </div>

              <div className="text-center text-muted-foreground text-sm">
                <p>Last Updated: October 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


