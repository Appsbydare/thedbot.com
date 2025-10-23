export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "forex" | "crypto" | "indicators";
  description: string;
  longDescription?: string;
  priceUSD: number;
  monthlyPriceUSD?: number;
  features: string[];
  rating?: number;
  reviews?: number;
  badge?: string;
  deliverableType: "file" | "license";
  deliverableRef: string; // path or SKU
  support?: string;
  demo?: boolean;
  specifications?: Record<string, string>;
};

export const products: Product[] = [
  {
    id: "forex-ma-bot",
    slug: "forex-ma-bot",
    name: "Forex MA Bot Pro",
    category: "forex",
    description: "Advanced moving average crossover bot with multi-timeframe analysis",
    longDescription:
      "The Forex MA Bot Pro is a sophisticated automated trading solution designed for forex markets.",
    priceUSD: 299,
    features: ["MT4/MT5 Compatible", "Multi-timeframe", "Risk Management", "Backtesting"],
    rating: 4.8,
    reviews: 127,
    badge: "Best Seller",
    deliverableType: "file",
    deliverableRef: "forex-ma-bot.txt",
    support: "24/7 Email Support",
    demo: true,
  },
  {
    id: "crypto-scalper",
    slug: "crypto-scalper",
    name: "Telegram Trading Bot",
    category: "crypto",
    description: "Automated trading bot that listens to Telegram signals and executes trades in MT5 with hassle-free user experience",
    longDescription:
      "The Telegram Trading Bot revolutionizes automated trading by seamlessly connecting Telegram signal channels to your MT5 trading platform. This intelligent bot monitors your favorite signal providers and automatically executes trades based on their recommendations, eliminating the need for manual intervention. With its user-friendly interface and robust architecture, you can enjoy 24/7 trading without the stress of monitoring markets constantly. The bot features advanced risk management, customizable position sizing, and real-time performance tracking, making it perfect for both beginners and experienced traders who want to leverage professional signals while maintaining full control over their trading strategy.",
    priceUSD: 899,
    monthlyPriceUSD: 99,
    features: ["Telegram Signal Integration", "MT5 Auto-Trading", "Risk Management", "24/7 Monitoring", "Custom Position Sizing", "Real-time Performance Tracking"],
    rating: 4.9,
    reviews: 800,
    badge: "New",
    deliverableType: "file",
    deliverableRef: "telegram-trading-bot.txt",
    support: "Priority Support",
    demo: true,
    specifications: {
      "Platform": "MT5 Compatible",
      "Signal Source": "Telegram Channels",
      "Execution Speed": "< 1 Second",
      "Supported Assets": "Forex, Crypto, Indices",
      "Risk Management": "Advanced",
      "Update Frequency": "Real-time"
    }
  },
  {
    id: "rsi-divergence",
    slug: "rsi-divergence",
    name: "RSI Divergence Indicator",
    category: "indicators",
    description: "Advanced RSI divergence detection for TradingView with custom alerts",
    priceUSD: 99,
    features: ["TradingView Compatible", "Custom Alerts", "Multiple Timeframes", "Visual Signals"],
    rating: 4.7,
    reviews: 203,
    badge: "Popular",
    deliverableType: "file",
    deliverableRef: "rsi-divergence.txt",
    support: "Email Support",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}


