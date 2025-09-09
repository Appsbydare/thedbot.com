'use client'

import { useState } from 'react'
import BuyWithCryptoButton from './BuyWithCryptoButton'

type Props = {
  productId: string;
  amountUSD: number;
}

export default function PurchaseForm({ productId, amountUSD }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')

  return (
    <div className="space-y-3">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full bg-gray-800 text-white rounded px-3 py-2" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full bg-gray-800 text-white rounded px-3 py-2" />
      <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" className="w-full bg-gray-800 text-white rounded px-3 py-2" />
      <BuyWithCryptoButton
        productId={productId}
        amountUSD={amountUSD}
        buyerName={name}
        buyerEmail={email}
        buyerCountry={country}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
      />
    </div>
  )
}


