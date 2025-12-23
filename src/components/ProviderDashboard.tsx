'use client';

import { SignalProvider } from '@/data/signalProviders';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';

interface ProviderDashboardProps {
  provider: SignalProvider;
}

export default function ProviderDashboard({ provider }: ProviderDashboardProps) {
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
      case 'medium': return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
      case 'high': return 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800';
      default: return 'bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border border-slate-200 dark:border-slate-800';
    }
  };

  const getSpecializationBadgeColor = (specialization: string) => {
    switch (specialization) {
      case 'digital-assets': return 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
      case 'forex': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
      case 'stocks': return 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300 border border-violet-200 dark:border-violet-800';
      case 'indices': return 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border border-orange-200 dark:border-orange-800';
      case 'mixed': return 'bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border border-slate-200 dark:border-slate-800';
      default: return 'bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border border-slate-200 dark:border-slate-800';
    }
  };

  const formatTradingStyle = (style: string) => {
    const labels: Record<string, string> = {
      'scalping': 'Scalping',
      'day-trading': 'Day Execution',
      'swing': 'Swing',
      'long-term': 'Long Term'
    };
    return labels[style] ?? style.replace(/-/g, ' ');
  };

  const formatSpecialization = (specialization: string) => {
    if (specialization === 'digital-assets') return 'Digital Assets';
    return specialization.toUpperCase();
  };

  // Prepare chart data
  const monthlyPerformanceData = provider.monthlyPerformance.map(month => ({
    month: format(new Date(month.month + '-01'), 'MMM yyyy'),
    signals: month.signals,
    winRate: month.winRate,
    profit: month.profit,
    subscribers: month.subscribers,
  }));

  const winLossData = [
    { name: 'Wins', value: Math.round((provider.winRate / 100) * provider.totalSignals), color: '#10B981' },
    { name: 'Losses', value: Math.round(((100 - provider.winRate) / 100) * provider.totalSignals), color: '#EF4444' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600 dark:text-gray-400">
                {provider.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {provider.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Registered since {format(new Date(provider.registeredDate), 'MMMM yyyy')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getSpecializationBadgeColor(provider.specialization)}`}>
              {formatSpecialization(provider.specialization)}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRiskBadgeColor(provider.riskLevel)}`}>
              {provider.riskLevel.toUpperCase()} RISK
            </span>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
              {formatTradingStyle(provider.tradingStyle)}
            </span>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
              {provider.winRate}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Win Rate
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {provider.totalSignals} total signals
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              +{provider.totalProfit}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Profit
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Avg: {provider.averageProfit}% per signal
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {provider.subscribers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Subscribers
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Telegram channel followers
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {provider.sharpeRatio}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Sharpe Ratio
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Risk-adjusted returns
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Performance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Monthly Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} />
                <Line type="monotone" dataKey="winRate" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Win/Loss Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Win/Loss Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Data Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Performance Details
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Signals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Win Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Profit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subscribers
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {monthlyPerformanceData.map((month, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {month.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {month.signals}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {month.winRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                      +{month.profit}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {month.subscribers.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Provider Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              About This Provider
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {provider.description}
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div>Min Investment: ${provider.minInvestment.toLocaleString()}</div>
              <div>Recommended Leverage: {provider.recommendedLeverage}x</div>
              <div>Signals per Week: {provider.signalsPerWeek}</div>
              <div>Max Drawdown: {provider.maxDrawdown}%</div>
            </div>
          </div>

          {/* Telegram Channel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Telegram Channel
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {provider.telegramUsername}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {provider.subscribers.toLocaleString()} subscribers
                  </div>
                </div>
                <a
                  href={provider.telegramChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Join Channel
                </a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All signals are posted in real-time on the Telegram channel. Join to receive signal alerts and market analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
