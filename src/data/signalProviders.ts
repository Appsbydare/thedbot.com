// Import performance tracker for historical data generation
import { generateHistoricalPerformanceData } from '@/lib/performanceTracker';

export type SignalProvider = {
  id: string;
  name: string;
  slug: string;
  description: string;
  telegramChannel: string;
  telegramUsername: string;
  avatar?: string;
  registeredDate: string;
  isActive: boolean;
  tradingStyle: 'scalping' | 'day-trading' | 'swing' | 'long-term';
  specialization: 'forex' | 'digital-assets' | 'stocks' | 'indices' | 'mixed';

  // Performance Metrics
  totalSignals: number;
  winRate: number; // percentage
  averageProfit: number; // per signal in %
  totalProfit: number; // overall profit in %
  maxDrawdown: number; // maximum drawdown in %
  sharpeRatio: number;
  subscribers: number;
  signalsPerWeek: number;

  // Risk Metrics
  riskLevel: 'low' | 'medium' | 'high';
  minInvestment: number;
  recommendedLeverage: number;

  // Historical Data
  monthlyPerformance: MonthlyPerformance[];
  dailyPerformance?: DailyPerformance[];
};

export type MonthlyPerformance = {
  month: string; // YYYY-MM format
  signals: number;
  winRate: number;
  profit: number;
  subscribers: number;
};

export type DailyPerformance = {
  date: string; // YYYY-MM-DD format
  signals: number;
  winRate: number;
  profit: number;
  cumulativeProfit: number;
};

// Sample Signal Providers Data
export const signalProviders: SignalProvider[] = [
  {
    id: "telegram-signal-bridge",
    name: "Telegram Signal Bridge",
    slug: "telegram-signal-bridge",
    description: "Professional signal alerts via Telegram with multi-asset support. Focus on Forex, Gold, and digital assets.",
    telegramChannel: "https://t.me/telegramsignalbridge",
    telegramUsername: "@telegramsignalbridge",
    avatar: "/avatars/telegram-bridge.jpg",
    registeredDate: "2024-01-15",
    isActive: true,
    tradingStyle: 'scalping',
    specialization: 'digital-assets',
    totalSignals: 1247,
    winRate: 68.5,
    averageProfit: 0.85,
    totalProfit: 1058.95,
    maxDrawdown: 12.3,
    sharpeRatio: 1.85,
    subscribers: 2847,
    signalsPerWeek: 35,
    riskLevel: 'high',
    minInvestment: 1000,
    recommendedLeverage: 10,
    monthlyPerformance: [
      { month: "2024-09", signals: 142, winRate: 69.2, profit: 120.64, subscribers: 2750 },
      { month: "2024-08", signals: 138, winRate: 67.8, profit: 117.85, subscribers: 2680 },
      { month: "2024-07", signals: 145, winRate: 71.0, profit: 129.95, subscribers: 2590 },
      { month: "2024-06", signals: 132, winRate: 66.5, profit: 112.77, subscribers: 2470 },
      { month: "2024-05", signals: 148, winRate: 68.9, profit: 121.95, subscribers: 2350 },
      { month: "2024-04", signals: 135, winRate: 70.2, profit: 126.36, subscribers: 2210 },
    ]
  },
  {
    id: "forex-master",
    name: "Forex Master",
    slug: "forex-master",
    description: "Professional forex signals for major and minor pairs. Specializes in EUR/USD, GBP/USD, and USD/JPY.",
    telegramChannel: "https://t.me/forexmaster_signals",
    telegramUsername: "@forexmaster_signals",
    avatar: "/avatars/forex-master.jpg",
    registeredDate: "2023-11-20",
    isActive: true,
    tradingStyle: 'day-trading',
    specialization: 'forex',
    totalSignals: 892,
    winRate: 72.3,
    averageProfit: 1.25,
    totalProfit: 1115.0,
    maxDrawdown: 8.7,
    sharpeRatio: 2.15,
    subscribers: 5632,
    signalsPerWeek: 18,
    riskLevel: 'medium',
    minInvestment: 2000,
    recommendedLeverage: 5,
    monthlyPerformance: [
      { month: "2024-09", signals: 76, winRate: 73.1, profit: 95.03, subscribers: 5480 },
      { month: "2024-08", signals: 72, winRate: 71.8, profit: 90.14, subscribers: 5320 },
      { month: "2024-07", signals: 78, winRate: 74.2, profit: 97.84, subscribers: 5190 },
      { month: "2024-06", signals: 70, winRate: 70.5, profit: 87.50, subscribers: 5020 },
      { month: "2024-05", signals: 75, winRate: 72.9, profit: 93.75, subscribers: 4850 },
      { month: "2024-04", signals: 68, winRate: 73.2, profit: 92.16, subscribers: 4710 },
    ]
  },
  {
    id: "swing-king",
    name: "Swing King",
    slug: "swing-king",
    description: "Swing signal alerts for stocks and indices. Holds positions for 2-7 days with higher profit targets.",
    telegramChannel: "https://t.me/swingking_trades",
    telegramUsername: "@swingking_trades",
    avatar: "/avatars/swing-king.jpg",
    registeredDate: "2024-03-10",
    isActive: true,
    tradingStyle: 'swing',
    specialization: 'stocks',
    totalSignals: 456,
    winRate: 64.8,
    averageProfit: 2.85,
    totalProfit: 1299.6,
    maxDrawdown: 15.2,
    sharpeRatio: 1.65,
    subscribers: 1923,
    signalsPerWeek: 12,
    riskLevel: 'medium',
    minInvestment: 5000,
    recommendedLeverage: 3,
    monthlyPerformance: [
      { month: "2024-09", signals: 48, winRate: 65.2, profit: 136.8, subscribers: 1870 },
      { month: "2024-08", signals: 45, winRate: 63.8, profit: 128.25, subscribers: 1810 },
      { month: "2024-07", signals: 52, winRate: 67.1, profit: 148.2, subscribers: 1750 },
      { month: "2024-06", signals: 42, winRate: 62.5, profit: 119.7, subscribers: 1680 },
      { month: "2024-05", signals: 47, winRate: 65.9, profit: 133.95, subscribers: 1590 },
      { month: "2024-04", signals: 44, winRate: 64.2, profit: 125.4, subscribers: 1520 },
    ]
  },
  {
    id: "indices-elite",
    name: "Indices Elite",
    slug: "indices-elite",
    description: "Specialized in major stock indices like S&P 500, NASDAQ, DAX, and FTSE. Long-term positioning strategies.",
    telegramChannel: "https://t.me/indiceselite",
    telegramUsername: "@indiceselite",
    avatar: "/avatars/indices-elite.jpg",
    registeredDate: "2023-09-05",
    isActive: true,
    tradingStyle: 'long-term',
    specialization: 'indices',
    totalSignals: 234,
    winRate: 78.5,
    averageProfit: 3.25,
    totalProfit: 760.5,
    maxDrawdown: 9.8,
    sharpeRatio: 2.35,
    subscribers: 3421,
    signalsPerWeek: 8,
    riskLevel: 'low',
    minInvestment: 10000,
    recommendedLeverage: 2,
    monthlyPerformance: [
      { month: "2024-09", signals: 32, winRate: 79.2, profit: 104.0, subscribers: 3350 },
      { month: "2024-08", signals: 28, winRate: 77.8, profit: 91.0, subscribers: 3280 },
      { month: "2024-07", signals: 34, winRate: 80.1, profit: 110.5, subscribers: 3180 },
      { month: "2024-06", signals: 26, winRate: 76.5, profit: 84.5, subscribers: 3090 },
      { month: "2024-05", signals: 30, winRate: 78.9, profit: 97.5, subscribers: 2950 },
      { month: "2024-04", signals: 24, winRate: 79.2, profit: 78.0, subscribers: 2810 },
    ]
  },
  {
    id: "diversified-trader",
    name: "Diversified Trader",
    slug: "diversified-trader",
    description: "Balanced approach across forex, digital assets, and indices. Risk-managed portfolio diversification signals.",
    telegramChannel: "https://t.me/diversifiedtrader",
    telegramUsername: "@diversifiedtrader",
    avatar: "/avatars/diversified-trader.jpg",
    registeredDate: "2024-02-28",
    isActive: true,
    tradingStyle: 'day-trading',
    specialization: 'mixed',
    totalSignals: 678,
    winRate: 70.2,
    averageProfit: 1.45,
    totalProfit: 982.1,
    maxDrawdown: 11.5,
    sharpeRatio: 1.95,
    subscribers: 4156,
    signalsPerWeek: 22,
    riskLevel: 'medium',
    minInvestment: 3000,
    recommendedLeverage: 5,
    monthlyPerformance: [
      { month: "2024-09", signals: 88, winRate: 71.1, profit: 127.58, subscribers: 4020 },
      { month: "2024-08", signals: 82, winRate: 69.8, profit: 118.86, subscribers: 3890 },
      { month: "2024-07", signals: 90, winRate: 72.2, profit: 130.5, subscribers: 3750 },
      { month: "2024-06", signals: 78, winRate: 68.5, profit: 113.1, subscribers: 3610 },
      { month: "2024-05", signals: 85, winRate: 70.9, profit: 123.25, subscribers: 3480 },
      { month: "2024-04", signals: 76, winRate: 71.2, profit: 110.2, subscribers: 3340 },
    ]
  },
  {
    id: "commodity-king",
    name: "Commodity King",
    slug: "commodity-king",
    description: "Expert in commodities strategies including gold, silver, oil, and agricultural products.",
    telegramChannel: "https://t.me/commodityking",
    telegramUsername: "@commodityking",
    avatar: "/avatars/commodity-king.jpg",
    registeredDate: "2023-12-12",
    isActive: false,
    tradingStyle: 'swing',
    specialization: 'mixed',
    totalSignals: 312,
    winRate: 65.8,
    averageProfit: 2.15,
    totalProfit: 670.8,
    maxDrawdown: 18.5,
    sharpeRatio: 1.45,
    subscribers: 1287,
    signalsPerWeek: 15,
    riskLevel: 'high',
    minInvestment: 8000,
    recommendedLeverage: 8,
    monthlyPerformance: [
      { month: "2024-09", signals: 0, winRate: 0, profit: 0, subscribers: 1287 },
      { month: "2024-08", signals: 0, winRate: 0, profit: 0, subscribers: 1287 },
      { month: "2024-07", signals: 58, winRate: 66.2, profit: 124.8, subscribers: 1287 },
      { month: "2024-06", signals: 52, winRate: 64.5, profit: 111.8, subscribers: 1260 },
      { month: "2024-05", signals: 62, winRate: 67.1, profit: 133.3, subscribers: 1230 },
      { month: "2024-04", signals: 48, winRate: 65.2, profit: 103.2, subscribers: 1180 },
    ]
  },
  {
    id: "top-gun-trader",
    name: "Top Gun Trader",
    slug: "top-gun-trader",
    description: "Elite forex trader specializing in major pairs with institutional-level analysis and precision entries.",
    telegramChannel: "https://t.me/topguntrader",
    telegramUsername: "@topguntrader",
    avatar: "/avatars/top-gun-trader.jpg",
    registeredDate: "2023-08-15",
    isActive: true,
    tradingStyle: 'day-trading',
    specialization: 'forex',
    totalSignals: 1456,
    winRate: 76.2,
    averageProfit: 1.85,
    totalProfit: 2693.6,
    maxDrawdown: 7.8,
    sharpeRatio: 2.45,
    subscribers: 8945,
    signalsPerWeek: 25,
    riskLevel: 'low',
    minInvestment: 5000,
    recommendedLeverage: 3,
    monthlyPerformance: [
      { month: "2024-09", signals: 102, winRate: 77.1, profit: 188.7, subscribers: 8700 },
      { month: "2024-08", signals: 98, winRate: 75.8, profit: 181.9, subscribers: 8450 },
      { month: "2024-07", signals: 105, winRate: 78.2, profit: 194.2, subscribers: 8200 },
      { month: "2024-06", signals: 95, winRate: 74.5, profit: 177.8, subscribers: 7950 },
      { month: "2024-05", signals: 108, winRate: 76.9, profit: 199.8, subscribers: 7700 },
      { month: "2024-04", signals: 92, winRate: 75.2, profit: 173.9, subscribers: 7450 },
    ]
  },
  {
    id: "digital-signals-queen",
    name: "Digital Signals Queen",
    slug: "digital-signals-queen",
    description: "Specialist in digital asset signal alerts with focus on altcoins and DeFi opportunities. Expert in market cycles.",
    telegramChannel: "https://t.me/digitalsignalsqueen",
    telegramUsername: "@digitalsignalsqueen",
    avatar: "/avatars/crypto-queen.jpg",
    registeredDate: "2023-10-22",
    isActive: true,
    tradingStyle: 'swing',
    specialization: 'digital-assets',
    totalSignals: 987,
    winRate: 71.5,
    averageProfit: 2.45,
    totalProfit: 2418.15,
    maxDrawdown: 14.2,
    sharpeRatio: 1.95,
    subscribers: 6743,
    signalsPerWeek: 20,
    riskLevel: 'medium',
    minInvestment: 2500,
    recommendedLeverage: 7,
    monthlyPerformance: [
      { month: "2024-09", signals: 82, winRate: 72.1, profit: 201.0, subscribers: 6500 },
      { month: "2024-08", signals: 78, winRate: 70.8, profit: 191.2, subscribers: 6250 },
      { month: "2024-07", signals: 85, winRate: 73.2, profit: 208.2, subscribers: 6000 },
      { month: "2024-06", signals: 75, winRate: 69.5, profit: 183.8, subscribers: 5750 },
      { month: "2024-05", signals: 88, winRate: 71.9, profit: 215.7, subscribers: 5500 },
      { month: "2024-04", signals: 72, winRate: 70.2, profit: 176.9, subscribers: 5250 },
    ]
  },
  {
    id: "stock-sage",
    name: "Stock Sage",
    slug: "stock-sage",
    description: "Wise stock market analyst providing signals for blue-chip stocks and growth companies with fundamental analysis.",
    telegramChannel: "https://t.me/stocksage_signals",
    telegramUsername: "@stocksage_signals",
    avatar: "/avatars/stock-sage.jpg",
    registeredDate: "2023-07-08",
    isActive: true,
    tradingStyle: 'long-term',
    specialization: 'stocks',
    totalSignals: 567,
    winRate: 69.8,
    averageProfit: 3.15,
    totalProfit: 1786.05,
    maxDrawdown: 11.5,
    sharpeRatio: 1.85,
    subscribers: 4567,
    signalsPerWeek: 14,
    riskLevel: 'low',
    minInvestment: 10000,
    recommendedLeverage: 2,
    monthlyPerformance: [
      { month: "2024-09", signals: 58, winRate: 70.2, profit: 182.5, subscribers: 4400 },
      { month: "2024-08", signals: 55, winRate: 69.1, profit: 173.0, subscribers: 4250 },
      { month: "2024-07", signals: 62, winRate: 71.8, profit: 195.3, subscribers: 4100 },
      { month: "2024-06", signals: 52, winRate: 67.5, profit: 163.8, subscribers: 3950 },
      { month: "2024-05", signals: 59, winRate: 69.9, profit: 185.9, subscribers: 3800 },
      { month: "2024-04", signals: 48, winRate: 68.2, profit: 151.2, subscribers: 3650 },
    ]
  },
  {
    id: "index-master",
    name: "Index Master",
    slug: "index-master",
    description: "Master of global indices strategies with expertise in S&P 500, NASDAQ, FTSE, DAX, and Nikkei correlations.",
    telegramChannel: "https://t.me/indexmaster_trades",
    telegramUsername: "@indexmaster_trades",
    avatar: "/avatars/index-master.jpg",
    registeredDate: "2023-06-30",
    isActive: true,
    tradingStyle: 'swing',
    specialization: 'indices',
    totalSignals: 723,
    winRate: 74.3,
    averageProfit: 2.75,
    totalProfit: 1988.25,
    maxDrawdown: 9.8,
    sharpeRatio: 2.25,
    subscribers: 5234,
    signalsPerWeek: 16,
    riskLevel: 'low',
    minInvestment: 7500,
    recommendedLeverage: 3,
    monthlyPerformance: [
      { month: "2024-09", signals: 68, winRate: 75.1, profit: 187.0, subscribers: 5050 },
      { month: "2024-08", signals: 64, winRate: 73.8, profit: 176.0, subscribers: 4900 },
      { month: "2024-07", signals: 72, winRate: 76.2, profit: 198.1, subscribers: 4750 },
      { month: "2024-06", signals: 60, winRate: 72.5, profit: 165.0, subscribers: 4600 },
      { month: "2024-05", signals: 69, winRate: 74.9, profit: 189.8, subscribers: 4450 },
      { month: "2024-04", signals: 58, winRate: 73.2, profit: 159.5, subscribers: 4300 },
    ]
  }
];

export function getSignalProviderById(id: string): SignalProvider | undefined {
  return signalProviders.find((provider) => provider.id === id);
}

export function getSignalProviderBySlug(slug: string): SignalProvider | undefined {
  return signalProviders.find((provider) => provider.slug === slug);
}

export function getActiveSignalProviders(): SignalProvider[] {
  return signalProviders.filter((provider) => provider.isActive);
}

// Generate providers with historical performance data for better charts
export function getProvidersWithHistoricalData(): SignalProvider[] {
  return signalProviders.map(provider => generateHistoricalPerformanceData(provider, 30));
}
