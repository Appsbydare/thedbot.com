"use client";

import { ChevronDown } from "@/components/icons";
import { useState } from "react";
import AnimatedHeading from "@/components/AnimatedHeading";

const faqs = [
  {
    question: "How does the licensing system work?",
    answer: "Each purchase grants you a single license that's bound to one MT4/MT5 account. The license includes the Python bot files, installation instructions, and access to updates for the duration of your license period."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept digital asset payments (USDT, BTC, ETH, and more) through secure gateways. All payments are processed instantly and securely."
  },
  {
    question: "Can I use the bot on multiple accounts?",
    answer: "No, each license is valid for one MT4/MT5 account only. This prevents unauthorized sharing and ensures fair usage. If you need multiple accounts, you'll need to purchase additional licenses."
  },
  {
    question: "How do I install the automation?",
    answer: "After purchase, you'll receive detailed installation instructions via email. Our Python-based automations integrate with MT4/MT5 through APIs and include Telegram integration for signal notifications. Our support team is available to help with setup."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day money-back guarantee if the automation doesn't work as advertised on your system. However, refunds are not available for indicators or if the software has been used on live accounts."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We provide email support, installation assistance, and access to our knowledge base. Premium support with priority response is available for enterprise customers."
  },
  {
    question: "Are the automations tested and safe?",
    answer: "All our Python-based automations are thoroughly tested on demo accounts before release. They include built-in risk management features and are designed to be safe for live environments when used properly."
  },
  {
    question: "Do you provide updates?",
    answer: "Yes, all licenses include free updates for the duration of your license period. Updates include bug fixes, new features, and compatibility improvements for new MT4/MT5 API versions."
  },
  {
    question: "What if the bot stops working?",
    answer: "If a bot stops working due to platform updates or technical issues, we'll provide a free update or replacement. We monitor all our products and proactively address compatibility issues."
  },
  {
    question: "Can I modify the bot settings?",
    answer: "Yes, all our Python bots come with customizable parameters that you can adjust to match your execution strategy and risk tolerance. We provide documentation for all available settings."
  },
  {
    question: "What are the system requirements?",
    answer: "Our Python-based bots require Python 3.8+ installed on your system, along with the necessary dependencies. They work with MT4/MT5 through API connections and include Telegram integration for notifications."
  },
  {
    question: "Do you provide source code?",
    answer: "Yes, you receive the complete Python source code with your purchase, allowing you to understand how the bot works and make custom modifications if needed."
  },
  {
    question: "Do I need approval from Telegram to use the Telegram Auto Executor?",
    answer: "No formal approval is needed. You must use your own Telegram API credentials (free from my.telegram.org) and comply with Telegram's Terms of Service."
  },
  {
    question: "Does my broker need to allow automated execution?",
    answer: "Yes. Many products require Expert Advisors (EAs). Please confirm your broker allows automated execution before purchase."
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 7-day money-back guarantee for technical issues we cannot resolve or if the product is not as described. Contact support@thedbot.com with your order number."
  },
  {
    question: "How can I contact support?",
    answer: "Email support@thedbot.com. We provide installation help and technical assistance during your license period."
  },
  {
    question: "What types of automation do you provide?",
    answer: "We provide three main categories of automation: 1. Trading Automation: MT4/MT5 bots, TradingView integrations, Telegram signal executors 2. Business Automation: Workflow automation, API integrations, data synchronization, CRM/ERP connections 3. Custom Solutions: Tailored automation built for your specific requirements. Whether you need trading bots or business process automation, we can help."
  },
  {
    question: "Can you integrate with my existing business systems?",
    answer: "Yes! We specialize in API integrations and can connect most modern business systems including: CRM platforms (Salesforce, HubSpot, Zoho), E-commerce (Shopify, WooCommerce, Magento), Accounting software (QuickBooks, Xero, FreshBooks), Communication tools (Slack, WhatsApp Business API, Email), and Custom databases and legacy systems. Contact us to discuss your specific integration needs."
  },
  {
    question: "Do you offer business automation solutions beyond trading?",
    answer: "Absolutely! While we started with trading automation, we now provide comprehensive business automation services: API integration between business systems, Workflow automation for recurring tasks, Data synchronization across platforms, Automated reporting and dashboards, Communication and notification systems, and Custom middleware development. Schedule a consultation to discuss your automation needs."
  },
  {
    question: "What's the difference between your products and custom development?",
    answer: "Products: Pre-built automation solutions (like our trading bots) that are ready to use immediately with standard features and pricing. Custom Development: Built specifically for your unique requirements. This includes: Integrations with proprietary or legacy systems, Complex multi-system workflows, Specialized business logic, and Ongoing modifications and support. Custom projects require consultation and custom quotes."
  },
  {
    question: "Can you automate my workflow if I don't have technical knowledge?",
    answer: "Yes! We offer two approaches: 1. Managed Solutions: We handle everything—consultation, development, deployment, and maintenance 2. Turnkey Products: Pre-built solutions with easy setup guides and support. You don't need to be technical. We'll guide you through the process or handle it entirely for you."
  },
  {
    question: "How long does a custom integration project take?",
    answer: "Project timelines vary based on complexity: Simple API connections: 1-2 weeks, Multi-system workflows: 2-4 weeks, Complex enterprise integrations: 4-8+ weeks. We provide detailed timelines during consultation after understanding your requirements."
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer: "Yes! All our solutions include: Initial setup support, Bug fixes and troubleshooting, Regular updates and security patches, and 24/7 technical support via email/chat. Custom development projects can include ongoing maintenance contracts for continuous improvements and modifications."
  },
  {
    question: "Can you work with APIs that require special authentication?",
    answer: "Yes! We have experience with various authentication methods including: OAuth 2.0, API keys, JWT tokens, Custom authentication protocols, Two-factor authentication systems, and Enterprise security requirements. Our team can handle even the most complex authentication requirements."
  },
  {
    question: "What platforms and technologies do you work with?",
    answer: "We work with a wide range of technologies: Programming: Python, JavaScript, VBA, Node.js, PHP; Platforms: Web APIs, Cloud services (AWS, Azure, Google Cloud); Trading: MetaTrader 4/5, TradingView, Telegram; Business: Shopify, Salesforce, QuickBooks, and 100+ other platforms; Databases: MySQL, PostgreSQL, MongoDB, SQL Server. If your system has an API or database access, we can likely integrate with it."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-black">{question}</span>
        <ChevronDown
          className={`size-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-35 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-black dark:bg-black">
        <div className="absolute inset-0 hero-gradient opacity-30"></div>
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="text-center space-y-8">
            <AnimatedHeading enablePerspective={false} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.95] uppercase cursor-heading">
              FREQUENTLY ASKED
              <br />
              QUESTIONS
            </AnimatedHeading>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our automation software, licensing, payments, and support
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - Light */}
      <section className="py-20 bg-white dark:bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-16 text-center p-8 rounded-2xl bg-black text-white">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 font-semibold transition-all duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


