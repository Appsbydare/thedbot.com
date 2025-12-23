import { SignalProvider, DailyPerformance } from '@/data/signalProviders';
import { format, subDays } from 'date-fns';

// Generate realistic daily performance updates
export function generateDailyPerformanceUpdate(provider: SignalProvider): DailyPerformance {
  const today = format(new Date(), 'yyyy-MM-dd');

  // Generate realistic daily signals based on provider's average
  const baseSignals = Math.floor(provider.signalsPerWeek / 7);
  const signalVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
  const dailySignals = Math.max(0, baseSignals + signalVariation);

  // Generate realistic win rate (within 10% of provider's average)
  const winRateVariation = (Math.random() - 0.5) * 20; // -10% to +10%
  const dailyWinRate = Math.max(0, Math.min(100, provider.winRate + winRateVariation));

  // Generate profit based on win rate and signals
  const profitPerSignal = provider.averageProfit;
  const profitVariation = (Math.random() - 0.5) * 0.5; // -0.25% to +0.25%
  const dailyProfit = dailySignals * (profitPerSignal + profitVariation) * (dailyWinRate / 100);

  // Calculate cumulative profit (simplified - in reality this would track from provider start)
  const lastMonth = provider.monthlyPerformance[provider.monthlyPerformance.length - 1];
  const baseCumulative = lastMonth ? lastMonth.profit : 0;
  const cumulativeProfit = baseCumulative + dailyProfit;

  return {
    date: today,
    signals: dailySignals,
    winRate: Math.round(dailyWinRate * 100) / 100,
    profit: Math.round(dailyProfit * 100) / 100,
    cumulativeProfit: Math.round(cumulativeProfit * 100) / 100,
  };
}

// Update provider's monthly performance with new daily data
export function updateProviderMonthlyPerformance(
  provider: SignalProvider,
  dailyUpdate: DailyPerformance
): SignalProvider {
  const currentMonth = format(new Date(), 'yyyy-MM');
  const existingMonthIndex = provider.monthlyPerformance.findIndex(m => m.month === currentMonth);

  const updatedMonthlyPerformance = [...provider.monthlyPerformance];

  if (existingMonthIndex >= 0) {
    // Update existing month
    const existingMonth = updatedMonthlyPerformance[existingMonthIndex];
    updatedMonthlyPerformance[existingMonthIndex] = {
      month: currentMonth,
      signals: existingMonth.signals + dailyUpdate.signals,
      winRate: existingMonth.signals === 0 ? dailyUpdate.winRate :
        ((existingMonth.winRate * existingMonth.signals) + (dailyUpdate.winRate * dailyUpdate.signals)) /
        (existingMonth.signals + dailyUpdate.signals),
      profit: Math.round((existingMonth.profit + dailyUpdate.profit) * 100) / 100,
      subscribers: existingMonth.subscribers, // This would be updated separately
    };
  } else {
    // Add new month
    updatedMonthlyPerformance.push({
      month: currentMonth,
      signals: dailyUpdate.signals,
      winRate: dailyUpdate.winRate,
      profit: dailyUpdate.profit,
      subscribers: provider.subscribers, // Keep current subscriber count for now
    });
  }

  // Update overall provider stats
  const totalSignals = provider.totalSignals + dailyUpdate.signals;
  const totalProfit = Math.round((provider.totalProfit + dailyUpdate.profit) * 100) / 100;

  // Calculate new win rate (weighted average)
  const newWinRate = totalSignals === 0 ? 0 :
    ((provider.winRate * provider.totalSignals) + (dailyUpdate.winRate * dailyUpdate.signals)) / totalSignals;

  // Simulate subscriber growth (small random changes)
  const subscriberChange = Math.floor(Math.random() * 21) - 10; // -10 to +10
  const newSubscribers = Math.max(0, provider.subscribers + subscriberChange);

  return {
    ...provider,
    totalSignals,
    winRate: Math.round(newWinRate * 100) / 100,
    totalProfit,
    subscribers: newSubscribers,
    monthlyPerformance: updatedMonthlyPerformance,
    dailyPerformance: [...(provider.dailyPerformance || []), dailyUpdate],
  };
}

// Generate performance data for multiple days (for testing/historical data)
export function generateHistoricalPerformanceData(
  provider: SignalProvider,
  days: number = 30
): SignalProvider {
  let updatedProvider = { ...provider };
  const dailyUpdates: DailyPerformance[] = [];

  for (let i = 0; i < days; i++) {
    const date = format(subDays(new Date(), days - i - 1), 'yyyy-MM-dd');
    const dailyUpdate = {
      ...generateDailyPerformanceUpdate(updatedProvider),
      date,
    };

    dailyUpdates.push(dailyUpdate);
    updatedProvider = updateProviderMonthlyPerformance(updatedProvider, dailyUpdate);
  }

  return {
    ...updatedProvider,
    dailyPerformance: dailyUpdates,
  };
}

// Get performance trends for charting
export function getPerformanceTrends(provider: SignalProvider) {
  const dailyData = provider.dailyPerformance || [];

  return {
    profitTrend: dailyData.map(day => ({
      date: day.date,
      profit: day.cumulativeProfit,
    })),
    winRateTrend: dailyData.map(day => ({
      date: day.date,
      winRate: day.winRate,
    })),
    signalsTrend: dailyData.map(day => ({
      date: day.date,
      signals: day.signals,
    })),
  };
}
