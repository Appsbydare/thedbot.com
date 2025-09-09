'use client'

type Props = {
  productId: string;
  amountUSD: number;
  className?: string;
};

export default function BuyWithCryptoButton({ productId, amountUSD, className }: Props) {
  async function handleClick() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, amountUSD }),
    });
    const data = await res.json();
    if (data?.status_url) {
      window.location.href = data.status_url as string;
    } else {
      alert(data?.error || 'Failed to start checkout');
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      Pay with Crypto
    </button>
  );
}


