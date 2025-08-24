"use client";

import { ChevronDown } from "@/components/icons";
import { useState } from "react";

const faqs = [
  {
    question: "How does the licensing system work?",
    answer: "Each purchase grants you a single license that's bound to one MT4/MT5 account. The license includes the Python bot files, installation instructions, and access to updates for the duration of your license period."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various cryptocurrencies including Bitcoin, Ethereum, USDT, and other major cryptocurrencies through secure payment gateways. All payments are processed instantly and securely."
  },
  {
    question: "Can I use the bot on multiple accounts?",
    answer: "No, each license is valid for one MT4/MT5 account only. This prevents unauthorized sharing and ensures fair usage. If you need multiple accounts, you'll need to purchase additional licenses."
  },
  {
    question: "How do I install the trading bot?",
    answer: "After purchase, you'll receive detailed installation instructions via email. Our Python-based bots integrate with MT4/MT5 through APIs and include Telegram integration for signal notifications. Our support team is available to help with setup."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day money-back guarantee if the bot doesn't work as advertised on your system. However, refunds are not available for indicators or if the bot has been used for live trading."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We provide email support, installation assistance, and access to our knowledge base. Premium support with priority response is available for enterprise customers."
  },
  {
    question: "Are the bots tested and safe?",
    answer: "All our Python-based bots are thoroughly backtested and tested on demo accounts before release. They include built-in risk management features and are designed to be safe for live trading when used properly."
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
    answer: "Yes, all our Python bots come with customizable parameters that you can adjust to match your trading strategy and risk tolerance. We provide documentation for all available settings."
  },
  {
    question: "What are the system requirements?",
    answer: "Our Python-based bots require Python 3.8+ installed on your system, along with the necessary dependencies. They work with MT4/MT5 through API connections and include Telegram integration for notifications."
  },
  {
    question: "Do you provide source code?",
    answer: "Yes, you receive the complete Python source code with your purchase, allowing you to understand how the bot works and make custom modifications if needed."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        className="flex justify-between items-center w-full py-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
                 <span className="text-lg font-semibold text-gray-900 dark:text-white">{question}</span>
        <ChevronDown 
          className={`size-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {isOpen && (
        <div className="pb-6">
                     <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Frequently Asked <span className="text-blue-600 dark:text-blue-400">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our trading bots, licensing, payments, and support
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          
          {/* Contact Support */}
                     <div className="mt-16 text-center p-8 rounded-2xl bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
               Still Have Questions?
             </h3>
             <p className="text-gray-600 dark:text-gray-300 mb-6">
               Can&apos;t find what you&apos;re looking for? Our support team is here to help.
             </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-all duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


