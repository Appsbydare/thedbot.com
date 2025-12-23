'use client'

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'

type Props = {
  disabled?: boolean;
  onCardChange?: (complete: boolean) => void;
}

export default function StripeCardInput({ disabled = false, onCardChange }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState<string | null>(null)

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#9ca3af',
        },
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
    disabled: disabled,
  }

  const handleCardChange = (event: any) => {
    if (event.error) {
      setCardError(event.error.message)
    } else {
      setCardError(null)
    }
    if (onCardChange) {
      onCardChange(event.complete)
    }
  }

  return (
    <div className="space-y-3">
      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <CardElement
          options={cardElementOptions}
          onChange={handleCardChange}
        />
      </div>
      {cardError && (
        <p className="text-sm text-red-400">{cardError}</p>
      )}
    </div>
  )
}

