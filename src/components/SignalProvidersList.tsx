'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SignalProvider } from '@/data/signalProviders';

interface SignalProvidersListProps {
  providers: SignalProvider[];
}

export default function SignalProvidersList({ providers }: SignalProvidersListProps) {
  const [sortBy, setSortBy] = useState<'winRate' | 'subscribers' | 'totalProfit' | 'sharpeRatio'>('winRate');
  const [filterBy, setFilterBy] = useState<'all' | 'digital-assets' | 'forex' | 'stocks' | 'indices' | 'mixed'>('all');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredAndSortedProviders = useMemo(() => {
    let filtered = providers;

    // Filter by specialization
    if (filterBy !== 'all') {
      filtered = filtered.filter(provider => provider.specialization === filterBy);
    }

    // Filter by risk level
    if (riskFilter !== 'all') {
      filtered = filtered.filter(provider => provider.riskLevel === riskFilter);
    }

    // Sort providers
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'winRate':
          return b.winRate - a.winRate;
        case 'subscribers':
          return b.subscribers - a.subscribers;
        case 'totalProfit':
          return b.totalProfit - a.totalProfit;
        case 'sharpeRatio':
          return b.sharpeRatio - a.sharpeRatio;
        default:
          return 0;
      }
    });
  }, [providers, sortBy, filterBy, riskFilter]);

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

  return (
    <div className="space-y-6">
      {/* Filters and Sorting */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'winRate' | 'subscribers' | 'totalProfit' | 'sharpeRatio')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="winRate">Sort by Win Rate</option>
              <option value="subscribers">Sort by Subscribers</option>
              <option value="totalProfit">Sort by Total Profit</option>
              <option value="sharpeRatio">Sort by Sharpe Ratio</option>
            </select>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'digital-assets' | 'forex' | 'stocks' | 'indices' | 'mixed')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Specializations</option>
              <option value="digital-assets">Digital Assets</option>
              <option value="forex">Forex</option>
              <option value="stocks">Stocks</option>
              <option value="indices">Indices</option>
              <option value="mixed">Mixed</option>
            </select>

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as 'all' | 'low' | 'medium' | 'high')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedProviders.length} of {providers.length} providers
          </div>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProviders.map((provider) => (
          <Link
            key={provider.id}
            href={`/providers/${provider.slug}`}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 block"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {provider.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSpecializationBadgeColor(provider.specialization)}`}>
                    {formatSpecialization(provider.specialization)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskBadgeColor(provider.riskLevel)}`}>
                    {provider.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
              </div>
              {provider.avatar && (
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {provider.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {provider.description}
            </p>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    {provider.winRate}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Win Rate
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {provider.subscribers.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Subscribers
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    +{provider.totalProfit}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Total Profit
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {provider.signalsPerWeek}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Signals/Week
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Style: {formatTradingStyle(provider.tradingStyle)}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredAndSortedProviders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">No providers found</div>
          <div className="text-gray-600 dark:text-gray-400">Try adjusting your filters</div>
        </div>
      )}
    </div>
  );
}
