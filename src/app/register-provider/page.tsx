import { Metadata } from 'next';
import ProviderRegistrationForm from '@/components/ProviderRegistrationForm';

export const metadata: Metadata = {
  title: 'Register as Signal Provider - theDBot',
  description: 'Join our platform as a verified signal provider. Submit your information and get evaluated for our exclusive signal provider program.',
};

export default function RegisterProviderPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Become a Signal Provider
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join our exclusive network of verified signal providers. Share your trading expertise and build a subscriber base with our comprehensive platform.
          </p>
        </div>

        {/* Provider Requirements */}
        <div className="mb-12 rounded-lg border border-border bg-secondary p-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">Provider Requirements</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Provide a verifiable performance track record</li>
            <li>Comply with Telegram Terms of Service for your channel</li>
            <li>Acknowledge that you are an independent third party</li>
            <li>No performance guarantees by theDBot; subscribers assume trading risk</li>
          </ul>
        </div>

        {/* Registration Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <ProviderRegistrationForm />
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Real-time Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track your performance with detailed analytics and insights to improve your signals.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Monetize Your Skills
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Earn revenue from your trading signals and build a sustainable income stream.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Global Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with traders worldwide and establish yourself as a trusted signal provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


