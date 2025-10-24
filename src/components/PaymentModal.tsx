'use client'

import { useState, useEffect } from 'react'
import { X } from '@/components/icons'

type Props = {
  productId: string;
  productName: string;
  amountUSD: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ productId, productName, amountUSD, isOpen, onClose }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [hardwareFingerprint, setHardwareFingerprint] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handlePayment = async () => {
    if (!name || !email || !country) {
      alert('Please fill in all fields')
      return
    }

    if (!hardwareFingerprint) {
      alert('Please enter your Hardware Fingerprint. This is required to bind your license to your computer.')
      return
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }

    if (!selectedPaymentMethod) {
      alert('Please select a payment method')
      return
    }

    if (selectedPaymentMethod === 'card') {
      alert('Card payments coming soon! Please use cryptocurrency for now.')
      return
    }

    setIsProcessing(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId, 
          amountUSD, 
          buyerName: name, 
          buyerEmail: email, 
          buyerCountry: country,
          hardwareFingerprint: hardwareFingerprint 
        }),
      })
      
      const data = await res.json()
      
      if (data?.status_url) {
        window.location.href = data.status_url as string
      } else {
        alert(data?.error || 'Failed to start checkout')
        setIsProcessing(false)
      }
    } catch (error) {
      alert('Failed to process payment. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) {
          onClose()
        }
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl max-w-2xl w-full my-8 border border-gray-700 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-heading text-white">Complete Your Purchase</h2>
            <p className="text-gray-400 text-sm mt-1">{productName}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isProcessing}
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Full Name *</label>
                <input 
                  type="text"
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="John Doe" 
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  disabled={isProcessing}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email Address *</label>
                <input 
                  type="email"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="john@example.com" 
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  disabled={isProcessing}
                />
                <p className="text-xs text-gray-400 mt-1">License key will be sent to this email</p>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Country *</label>
                <input 
                  type="text"
                  value={country} 
                  onChange={e => setCountry(e.target.value)} 
                  placeholder="United States" 
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>

          {/* Hardware Fingerprint Section */}
          <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-2xl">🔐</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Hardware Fingerprint Required</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Your license will be bound to your computer to prevent unauthorized sharing. 
                  Please download and run the app to get your hardware fingerprint.
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-blue-300">
                    📥 <strong>Step 1:</strong> Download the trading bot application
                  </p>
                  <p className="text-xs text-blue-300">
                    ▶️ <strong>Step 2:</strong> Run the application - it will show your Hardware Fingerprint
                  </p>
                  <p className="text-xs text-blue-300">
                    📋 <strong>Step 3:</strong> Copy and paste it below
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">Hardware Fingerprint *</label>
              <input 
                type="text"
                value={hardwareFingerprint} 
                onChange={e => setHardwareFingerprint(e.target.value.toUpperCase())} 
                placeholder="e.g., D4A04F41A74CF788" 
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
                disabled={isProcessing}
                maxLength={16}
              />
              <p className="text-xs text-gray-400 mt-1">
                16-character hexadecimal code shown when you run the app
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Select Payment Method</h3>
            <div className="space-y-3">
              
              {/* Card Payment - Coming Soon */}
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('card')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedPaymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
                disabled={isProcessing}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💳</div>
                    <div className="text-left">
                      <div className="text-white font-semibold">Credit / Debit Card</div>
                      <div className="text-sm text-gray-400">Visa, Mastercard, etc.</div>
                    </div>
                  </div>
                  <span className="bg-yellow-600 text-yellow-100 text-xs font-semibold px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </button>

              {/* Cryptocurrency */}
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('crypto')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedPaymentMethod === 'crypto'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
                disabled={isProcessing}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">₿</div>
                    <div className="text-left">
                      <div className="text-white font-semibold">Cryptocurrency</div>
                      <div className="text-sm text-gray-400">USDT, Bitcoin, Ethereum & more</div>
                    </div>
                  </div>
                  <span className="bg-green-600 text-green-100 text-xs font-semibold px-3 py-1 rounded-full">
                    Available
                  </span>
                </div>
              </button>

              {/* Binance Pay - Coming Soon */}
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('binance')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedPaymentMethod === 'binance'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
                disabled={isProcessing}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🟡</div>
                    <div className="text-left">
                      <div className="text-white font-semibold">Binance Pay</div>
                      <div className="text-sm text-gray-400">Quick crypto payment via Binance</div>
                    </div>
                  </div>
                  <span className="bg-yellow-600 text-yellow-100 text-xs font-semibold px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </button>

            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <h4 className="text-white font-semibold mb-3">Terms & Conditions</h4>
            <div className="text-sm text-gray-300 space-y-2 max-h-40 overflow-y-auto">
              <p>• All purchases are final and non-refundable once the license key has been delivered.</p>
              <p>• Your license key will be sent to the provided email address within 24 hours of payment confirmation.</p>
              <p>• Each license is valid for one trading account activation only.</p>
              <p>• Cryptocurrency payments may take up to 1 hour for blockchain confirmation.</p>
              <p>• You agree to use the software in accordance with our Terms of Service.</p>
              <p>• Technical support is provided as specified in the product description.</p>
              <p>• We do not provide financial advice. Trading carries risk.</p>
            </div>
            
            <label className="flex items-start gap-3 mt-4 cursor-pointer">
              <input 
                type="checkbox"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
                className="mt-1 size-4 rounded border-gray-500 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                disabled={isProcessing}
              />
              <span className="text-sm text-gray-300">
                I agree to the terms and conditions, and understand that cryptocurrency payments are non-refundable *
              </span>
            </label>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Subtotal</span>
              <span className="text-white font-semibold">${amountUSD} USD</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Processing Fee</span>
              <span className="text-white font-semibold">$0 USD</span>
            </div>
            <div className="border-t border-gray-600 my-3"></div>
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-white font-bold text-lg">${amountUSD} USD</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing || !agreedToTerms || !selectedPaymentMethod}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>

        </div>
      </div>
    </div>
  )
}

