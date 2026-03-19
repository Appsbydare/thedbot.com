'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from '@/components/icons'

export default function GetFingerprintPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
            <span className="text-4xl">🔐</span>
          </div>
          <h1 className="text-4xl font-heading text-white mb-4">
            Get Your Hardware Fingerprint
          </h1>
          <p className="text-xl text-gray-300">
            Your hardware fingerprint is required to bind your license to your computer
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-heading text-white mb-6">How to Get Your Hardware Fingerprint</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Download the Application</h3>
                <p className="text-gray-300 mb-3">
                  Download the Telegram Auto Executor application to your computer. The application will automatically 
                  detect and display your hardware fingerprint.
                </p>
                <Link 
                  href="/products/telegram-auto-executor" 
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Download Application
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Run the Application</h3>
                <p className="text-gray-300 mb-3">
                  Install and launch the application. When it starts for the first time, it will show a license 
                  activation dialog with your hardware fingerprint displayed.
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <p className="text-sm text-gray-400 mb-2">Example Hardware Fingerprint:</p>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 bg-gray-900 text-green-400 px-4 py-2 rounded font-mono text-lg">
                      A1B2C3D4E5F6G7H8
                    </code>
                    <button
                      onClick={() => handleCopy('A1B2C3D4E5F6G7H8')}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors text-sm"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    * This is an example. Your actual fingerprint will be different.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Copy and Save</h3>
                <p className="text-gray-300 mb-3">
                  Copy your hardware fingerprint (it will be a 16-character hexadecimal code) and save it. 
                  You&apos;ll need to enter this during the purchase process.
                </p>
                <div className="flex items-start gap-2 text-yellow-300 bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3">
                  <span className="text-xl">⚠️</span>
                  <p className="text-sm">
                    <strong>Important:</strong> Make sure you run the application on the computer where you plan 
                    to use the automation. Your license will be bound to this specific hardware fingerprint.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Proceed to Purchase</h3>
                <p className="text-gray-300 mb-3">
                  Once you have your hardware fingerprint, you can proceed with the purchase. You&apos;ll be asked 
                  to enter it during the payment process.
                </p>
                <Link 
                  href="/products/telegram-auto-executor" 
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  <CheckCircle className="size-5" />
                  Ready to Purchase
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-heading text-white mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Q: What is a hardware fingerprint?
              </h3>
              <p className="text-gray-300">
                A: A hardware fingerprint is a unique identifier generated from your computer&apos;s hardware components 
                (CPU, motherboard, etc.). It helps ensure your license is used only on your authorized computer.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Q: Can I use my license on multiple computers?
              </h3>
              <p className="text-gray-300">
                A: No, each license is bound to a single hardware fingerprint. If you need to transfer your license 
                to a new computer, please contact our support team.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Q: What if I upgrade my computer?
              </h3>
              <p className="text-gray-300">
                A: Minor hardware changes usually won&apos;t affect your fingerprint. For major upgrades (new motherboard, 
                CPU replacement), contact our support team to transfer your license.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Q: I haven&apos;t purchased yet. Can I get my fingerprint first?
              </h3>
              <p className="text-gray-300">
                A: Yes! Download and run the application before purchasing. It will show your hardware fingerprint 
                even without a valid license. This way, you can copy it before making your purchase.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Q: Is my hardware information sent to your servers?
              </h3>
              <p className="text-gray-300">
                A: Only the hardware fingerprint (a 16-character code) is sent during license validation. We do not 
                collect detailed hardware information or any personal data from your computer.
              </p>
            </div>
          </div>
        </div>

        {/* Support Card */}
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-2xl p-6 mt-8 text-center">
          <h3 className="text-xl font-heading text-white mb-2">Need Help?</h3>
          <p className="text-gray-300 mb-4">
            If you have any questions or need assistance, our support team is here to help.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

