export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Payment Initiated</h1>
        <p className="text-gray-300">
          Thank you. Once your transaction confirms on-chain, your order will be completed.
        </p>
      </div>
    </div>
  );
}


