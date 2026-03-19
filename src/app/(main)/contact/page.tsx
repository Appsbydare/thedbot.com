import Link from "next/link";
import { Mail, MessageSquare, Clock, MapPin } from "@/components/icons";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Dark */}
      <section className="relative pt-35 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-black dark:bg-black">
        <div className="absolute inset-0 hero-gradient opacity-30"></div>
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="text-center space-y-8">
            <AnimatedHeading enablePerspective={false} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.95] uppercase cursor-heading">
              GET IN
              <br />
              TOUCH
            </AnimatedHeading>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products? Need technical support? We&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info - Light Section */}
      <section className="py-20 bg-white dark:bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">Send us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="licensing">Licensing Questions</option>
                    <option value="installation">Installation Help</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information - Dark Cards on Light Background */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">Contact Information</h2>
                <p className="text-gray-600">Get in touch with us through any of these channels.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-6 rounded-2xl bg-black text-white hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="size-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
                    <p className="text-gray-300 mb-2">support@thedbot.com</p>
                    <p className="text-sm text-gray-400">For technical support and general inquiries</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 rounded-2xl bg-black text-white hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="size-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
                    <p className="text-gray-300 mb-2">Available on our website</p>
                    <p className="text-sm text-gray-400">Real-time support during business hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 rounded-2xl bg-black text-white hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="size-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Support Hours</h3>
                    <p className="text-gray-300 mb-2">24/7 Email Support</p>
                    <p className="text-sm text-gray-400">Live chat: Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 rounded-2xl bg-black text-white hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="size-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Office</h3>
                    <p className="text-gray-300 mb-2">Remote Team</p>
                    <p className="text-sm text-gray-400">We operate globally with team members worldwide</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="p-6 rounded-2xl bg-black text-white">
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link href="/faq" className="block text-accent hover:text-accent/80 transition-colors">
                    → Frequently Asked Questions
                  </Link>
                  <Link href="/products" className="block text-accent hover:text-accent/80 transition-colors">
                    → Browse Products
                  </Link>
                  <Link href="/terms" className="block text-accent hover:text-accent/80 transition-colors">
                    → Terms of Service
                  </Link>
                  <Link href="/privacy" className="block text-accent hover:text-accent/80 transition-colors">
                    → Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
