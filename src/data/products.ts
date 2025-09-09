export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "forex" | "crypto" | "indicators";
  description: string;
  longDescription?: string;
  priceUSD: number;
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
    name: "Crypto Scalper Elite",
    category: "crypto",
    description: "High-frequency cryptocurrency scalping bot with advanced algorithms",
    longDescription:
      "The Crypto Scalper Elite is designed for high-frequency trading in cryptocurrency markets.",
    priceUSD: 499,
    features: ["24/7 Trading", "Low Latency", "Multi-exchange", "Real-time Alerts"],
    rating: 4.9,
    reviews: 89,
    badge: "New",
    deliverableType: "file",
    deliverableRef: "crypto-scalper.txt",
    support: "Priority Support",
    demo: true,
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


