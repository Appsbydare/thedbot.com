export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Dark */}
      <section className="relative pt-35 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-black dark:bg-black">
        <div className="absolute inset-0 hero-gradient opacity-30"></div>
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white">
              Privacy <span className="text-accent">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              How we collect, use, and protect your personal information
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content - White Section */}
      <section className="py-20 bg-white dark:bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="prose max-w-none">
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Introduction</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    At theDBot, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                    automation bots, indicators, and related services.
                  </p>
                  <p>
                    By using our services, you agree to the collection and use of information in accordance with this policy. 
                    We will not use or share your information with anyone except as described in this Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Information We Collect</h2>
                <div className="space-y-4 text-gray-600">
                  <p>We collect several different types of information for various purposes to provide and improve our services.</p>
                  
                  <div className="bg-black text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Personal Information:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Name and email address for license delivery and support</li>
                      <li>Country and phone number for license verification and support</li>
                      <li>MT4/MT5 account number for license binding</li>
                      <li>Payment information (processed securely by payment providers)</li>
                      <li>Support communications and inquiries</li>
                    </ul>
                  </div>

                  <div className="bg-black text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Usage Information:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Product usage and performance data</li>
                      <li>Website analytics and user behavior</li>
                      <li>Technical information about your system</li>
                      <li>Error logs and crash reports</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">How We Use Your Information</h2>
                <div className="space-y-4 text-gray-600">
                  <p>We use the collected information for various purposes:</p>
                  
                  <div className="bg-black text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Primary Uses:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Deliver purchased products and licenses</li>
                      <li>Provide customer support and technical assistance</li>
                      <li>Process payments and manage transactions</li>
                      <li>Send important updates and notifications</li>
                      <li>Improve our products and services</li>
                      <li>Prevent fraud and ensure license compliance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Sharing */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Data Sharing and Disclosure</h2>
                <div className="space-y-4 text-gray-600">
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                  
                  <div className="bg-black text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Limited Sharing:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Payment processors for transaction processing</li>
                      <li>Service providers who assist in our operations</li>
                      <li>Legal requirements and law enforcement</li>
                      <li>Business transfers (in case of company sale/merger)</li>
                      <li>With your explicit consent</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Data Security</h2>
                <div className="space-y-4 text-gray-600">
                  <p>We implement appropriate security measures to protect your personal information:</p>
                  
                  <div className="bg-black text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Security Measures:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Encryption of sensitive data in transit and at rest</li>
                      <li>Secure payment processing through trusted providers</li>
                      <li>Regular security audits and updates</li>
                      <li>Limited access to personal information</li>
                      <li>Secure hosting and infrastructure</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Data Retention</h2>
                <div className="space-y-4 text-gray-600">
                  <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy:</p>
                  
                  <div className="bg-black text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Retention Periods:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>License information: Duration of license + 2 years</li>
                      <li>Payment records: 7 years for tax purposes</li>
                      <li>Support communications: 3 years</li>
                      <li>Website analytics: 2 years</li>
                      <li>Account data: Until account deletion request</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Your Rights</h2>
                <div className="space-y-4 text-gray-600">
                  <p>You have certain rights regarding your personal information:</p>
                  
                  <div className="bg-black text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">User Rights:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Request deletion of your data</li>
                      <li>Object to processing of your data</li>
                      <li>Data portability</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Cookies and Tracking</h2>
                <div className="space-y-4 text-gray-600">
                  <p>We use cookies and similar tracking technologies to improve your experience on our website:</p>
                  
                  <div className="bg-black text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Cookie Types:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Essential cookies for website functionality</li>
                      <li>Analytics cookies to understand usage patterns</li>
                      <li>Preference cookies to remember your settings</li>
                      <li>Security cookies to protect against fraud</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Third-Party Services</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Our website may contain links to third-party services. We are not responsible for their privacy practices:</p>
                  
                  <div className="bg-black text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Third-Party Services:</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Payment processors (Coinbase Commerce, NOWPayments)</li>
                      <li>Analytics services (Google Analytics, Vercel Analytics)</li>
                      <li>Hosting providers (Vercel, GitHub)</li>
                      <li>Support tools and communication platforms</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Children&apos;s Privacy */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Children&apos;s Privacy</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Our services are not intended for children under the age of 18. We do not knowingly collect personal 
                    information from children under 18. If you are a parent or guardian and believe your child has provided 
                    us with personal information, please contact us immediately.
                  </p>
                </div>
              </div>

              {/* Changes to Policy */}
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">Changes to This Privacy Policy</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                    the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review 
                    this Privacy Policy periodically for any changes.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="text-center p-8 rounded-lg bg-black text-white">
                <h3 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h3>
                <p className="text-gray-300 mb-6">
                  If you have any questions about this Privacy Policy or our data practices, please contact us.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 font-semibold transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>

              {/* Last Updated */}
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
