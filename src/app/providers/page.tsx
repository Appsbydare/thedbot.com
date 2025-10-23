import { Metadata } from 'next';
import { getActiveSignalProviders } from '@/data/signalProviders';
import SignalProvidersList from '@/components/SignalProvidersList';

export const metadata: Metadata = {
  title: 'Signal Providers - theDBot',
  description: 'Browse verified signal providers with proven performance track records. Find the best trading signals for forex, crypto, stocks, and indices.',
};

export default function SignalProvidersPage() {
  const providers = getActiveSignalProviders();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Signal Providers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our verified signal providers with proven performance track records.
            Each provider is carefully monitored for transparency and consistent results.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {providers.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Active Providers
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {providers.reduce((acc, p) => acc + p.subscribers, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Subscribers
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round(providers.reduce((acc, p) => acc + p.winRate, 0) / providers.length)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg Win Rate
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {providers.reduce((acc, p) => acc + p.totalSignals, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Signals
            </div>
          </div>
        </div>

        {/* Providers List */}
        <SignalProvidersList providers={providers} />
      </div>
    </div>
  );
}


