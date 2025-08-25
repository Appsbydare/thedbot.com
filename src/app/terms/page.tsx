export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              Terms and <span className="text-accent">Conditions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive terms covering USA, EU, and international regulations
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="prose max-w-none">
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Introduction</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    These Terms and Conditions (&quot;Terms&quot;) govern your use of theDBot&apos;s trading automation software, 
                    services, and website. By accessing or using our services, you agree to be bound by these Terms.
                  </p>
                  <p>
                    <strong>Last Updated:</strong> December 2024<br />
                    <strong>Effective Date:</strong> December 2024
                  </p>
                </div>
              </div>

              {/* Definitions */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Definitions</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="bg-muted p-6 rounded-lg">
                    <ul className="space-y-2 list-disc list-inside">
                      <li><strong>Service:</strong> Our Python-based trading bots, indicators, and related software</li>
                      <li><strong>User:</strong> Any individual or entity using our services</li>
                      <li><strong>License:</strong> The right to use our software on a single MT4/MT5 account</li>
                      <li><strong>Platform:</strong> MetaTrader 4/5 trading platforms</li>
                      <li><strong>API:</strong> Application Programming Interface for MT4/MT5 integration</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* License Terms */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">License Terms</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    By purchasing our trading automation software, you are granted a limited, non-exclusive, 
                    non-transferable license to use the Python-based software on a single MT4/MT5 account.
                  </p>
                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-4">License Restrictions:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>One license per MT4/MT5 account only</li>
                      <li>No sharing, reselling, or redistribution of the software</li>
                      <li>No reverse engineering or unauthorized modification</li>
                      <li>No use on multiple accounts without additional licenses</li>
                      <li>License is bound to the specific account number provided</li>
                      <li>Source code is provided but remains our intellectual property</li>
                    </ul>
                  </div>
                </div>
              </div>

                             {/* Regulatory Compliance */}
               <div>
                 <h2 className="text-3xl font-bold text-foreground mb-6">Regulatory Compliance</h2>
                 <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our services comply with applicable regulations in major jurisdictions:
                  </p>
                  
                                     <div className="bg-muted p-6 rounded-lg">
                     <h3 className="text-xl font-semibold text-foreground mb-4">United States (USA):</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Compliance with CFTC regulations for automated trading</li>
                      <li>Adherence to SEC guidelines for financial software</li>
                      <li>GDPR compliance for EU users</li>
                      <li>State-specific regulations where applicable</li>
                    </ul>
                  </div>

                                     <div className="bg-muted p-6 rounded-lg">
                     <h3 className="text-xl font-semibold text-foreground mb-4">European Union (EU):</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>GDPR compliance for data protection</li>
                      <li>MiFID II compliance for financial instruments</li>
                      <li>ePrivacy Directive compliance</li>
                      <li>Country-specific financial regulations</li>
                    </ul>
                  </div>

                                     <div className="bg-muted p-6 rounded-lg">
                     <h3 className="text-xl font-semibold text-foreground mb-4">Other Jurisdictions:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>UK: FCA regulations and data protection laws</li>
                      <li>Canada: PIPEDA and provincial regulations</li>
                      <li>Australia: Privacy Act and ASIC regulations</li>
                      <li>Singapore: PDPA and MAS regulations</li>
                      <li>Japan: APPI and financial services regulations</li>
                    </ul>
                  </div>
                </div>
              </div>

                             {/* Usage Terms */}
               <div>
                 <h2 className="text-3xl font-bold text-foreground mb-6">Usage Terms</h2>
                 <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our Python-based trading bots are designed for educational and trading purposes. 
                    Users are responsible for their own trading decisions and risk management.
                  </p>
                                     <div className="bg-muted p-6 rounded-lg">
                     <h3 className="text-xl font-semibold text-foreground mb-4">User Responsibilities:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Test all bots on demo accounts before live trading</li>
                      <li>Understand the risks involved in automated trading</li>
                      <li>Monitor bot performance and adjust settings as needed</li>
                      <li>Ensure proper risk management and position sizing</li>
                      <li>Keep Python environment and dependencies updated</li>
                      <li>Comply with local trading regulations and broker terms</li>
                      <li>Maintain secure API credentials and access</li>
                    </ul>
                  </div>
                </div>
              </div>

                             {/* Payment Terms */}
               <div>
                 <h2 className="text-3xl font-bold text-foreground mb-6">Payment Terms</h2>
                 <div className="space-y-4 text-muted-foreground">
                  <p>
                    All payments are processed securely through cryptocurrency payment gateways. 
                    Prices are listed in USD but may be converted to your local currency.
                  </p>
                                     <div className="bg-muted p-6 rounded-lg">
                     <h3 className="text-xl font-semibold text-foreground mb-4">Payment Information:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>All prices are final and non-negotiable</li>
                      <li>Payments are processed in cryptocurrency only</li>
                      <li>License delivery occurs after payment confirmation</li>
                      <li>No recurring fees or subscriptions</li>
                      <li>Refunds available within 7 days for unused licenses</li>
                      <li>Tax obligations are the responsibility of the user</li>
                    </ul>
                  </div>
                </div>
              </div>

                             {/* Refund Policy */}
               <div>
                 <h2 className="text-3xl font-bold text-foreground mb-6">Refund Policy</h2>
                 <div className="space-y-4 text-muted-foreground">
                  <p>
                    We offer a 7-day money-back guarantee for all products under specific conditions.
                  </p>
                                     <div className="bg-muted p-6 rounded-lg">
                     <h3 className="text-xl font-semibold text-foreground mb-4">Refund Conditions:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Request must be made within 7 days of purchase</li>
                      <li>Bot must not have been used for live trading</li>
                      <li>Technical issues that cannot be resolved by our support team</li>
                      <li>No refunds for indicators or used licenses</li>
                      <li>Refunds processed in the original payment method</li>
                      <li>Processing time: 3-5 business days</li>
                    </ul>
                  </div>
                </div>
              </div>

                             {/* Support Terms */}
               <div>
                 <h2 className="text-3xl font-bold text-foreground mb-6">Support Terms</h2>
                 <div className="space-y-4 text-muted-foreground">
                  <p>
                    We provide technical support for installation, configuration, and troubleshooting 
                    of our Python-based products during the license period.
                  </p>
                                     <div className="bg-muted p-6 rounded-lg">
                     <h3 className="text-xl font-semibold text-foreground mb-4">Support Includes:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Python environment setup assistance</li>
                      <li>MT4/MT5 API integration help</li>
                      <li>Telegram bot configuration</li>
                      <li>Bug fixes and compatibility updates</li>
                      <li>Email support with 24-hour response time</li>
                      <li>Access to knowledge base and documentation</li>
                    </ul>
                  </div>
                </div>
              </div>

                             {/* Intellectual Property */}
               <div>
                 <h2 className="text-3xl font-bold text-foreground mb-6">Intellectual Property</h2>
                 <div className="space-y-4 text-muted-foreground">
                  <p>
                    All software, documentation, and related materials remain our intellectual property.
                  </p>
                                     <div className="bg-muted p-6 rounded-lg">
                     <h3 className="text-xl font-semibold text-foreground mb-4">IP Rights:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Source code remains our property</li>
                      <li>No redistribution or resale rights</li>
                      <li>Custom modifications are permitted for personal use</li>
                      <li>Trademarks and branding are protected</li>
                      <li>Documentation and guides are copyrighted</li>
                    </ul>
                  </div>
                </div>
              </div>

                             {/* Disclaimers */}
               <div>
                 <h2 className="text-3xl font-bold text-foreground mb-6">Disclaimers</h2>
                 <div className="space-y-4 text-muted-foreground">
                  <div className="bg-red-900/20 border border-red-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-red-400 mb-4">Important Disclaimers:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Trading involves substantial risk of loss and is not suitable for all investors</li>
                      <li>Past performance does not guarantee future results</li>
                      <li>Automated trading systems can result in losses</li>
                      <li>We are not responsible for trading losses or financial damages</li>
                      <li>Users should always test on demo accounts first</li>
                      <li>API connectivity issues are beyond our control</li>
                      <li>Market conditions may affect bot performance</li>
                    </ul>
                  </div>
                </div>
              </div>

                             {/* Limitation of Liability */}
               <div>
                 <h2 className="text-3xl font-bold text-foreground mb-6">Limitation of Liability</h2>
                 <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our liability is limited to the amount paid for the software license.
                  </p>
                                     <div className="bg-muted p-6 rounded-lg">
                     <h3 className="text-xl font-semibold text-foreground mb-4">Liability Limits:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Maximum liability: Purchase price of the license</li>
                      <li>No consequential or indirect damages</li>
                      <li>No liability for trading losses</li>
                      <li>No liability for data loss or corruption</li>
                      <li>Force majeure events excluded</li>
                    </ul>
                  </div>
                </div>
              </div>

                             {/* Governing Law */}
               <div>
                 <h2 className="text-3xl font-bold text-foreground mb-6">Governing Law</h2>
                 <div className="space-y-4 text-muted-foreground">
                  <p>
                    These Terms are governed by applicable laws in your jurisdiction. 
                    Any disputes will be resolved through appropriate legal channels.
                  </p>
                                     <div className="bg-muted p-6 rounded-lg">
                     <h3 className="text-xl font-semibold text-foreground mb-4">Legal Information:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Terms may be updated without notice</li>
                      <li>Continued use constitutes acceptance of new terms</li>
                      <li>Severability clause applies to all terms</li>
                      <li>Force majeure events may affect service delivery</li>
                      <li>Contact us for questions about these terms</li>
                      <li>Dispute resolution through arbitration or local courts</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="text-center p-8 rounded-lg bg-secondary">
                <h3 className="text-2xl font-bold text-foreground mb-4">Questions About These Terms?</h3>
                <p className="text-muted-foreground mb-6">
                  If you have any questions about these terms and conditions, please contact our support team.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 font-semibold transition-all duration-300"
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


