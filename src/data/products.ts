export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "forex" | "automation" | "indicators";
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
    description: "Advanced moving average crossover automation with multi-timeframe analysis",
    longDescription:
      "The Forex MA Bot Pro is a sophisticated automation solution designed for forex markets, pairing intelligent crossover logic with configurable risk controls.",
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
    id: "telegram-auto-executor",
    slug: "telegram-auto-executor",
    name: "Telegram Auto Executor",
    category: "automation",
    description: "Professional automation that listens to Telegram signals and executes orders in MetaTrader 5 with advanced strategy management",
    longDescription:
      "The Telegram Auto Executor (AutoTrader Gold V8) is a professional automation bridge between Telegram signal channels and MetaTrader 5. It offers dual Telegram client support (Pyrogram & Telethon), advanced signal parsing with 35+ regex patterns, and comprehensive strategy management including Multi-Take Profit and Trailing Stop handling. A modern PyQt5 GUI, real-time position monitoring, automatic risk controls, and multi-asset support (Forex, Gold, Indices) deliver institutional-grade execution without manual intervention.",
    priceUSD: 99,
    monthlyPriceUSD: 899,
    features: ["Dual Telegram Client Support", "Advanced Signal Parsing (35+ Patterns)", "Multi-TP Strategy Management", "Trailing Stop Automation", "Real-time Position Monitoring", "Breakeven Management", "Custom Symbol Mapping", "Professional PyQt5 GUI", "Comprehensive Risk Management", "Multi-Asset Support (Forex/Gold/Indices)", "SQLite Database Integration", "Automatic MT5 Integration"],
    rating: 4.9,
    reviews: 800,
    badge: "New",
    deliverableType: "file",
    deliverableRef: "telegram-auto-executor.txt",
    support: "Priority Support",
    demo: true,
    specifications: {
      "Platform": "Windows 10/11 (64-bit)",
      "MT5 Integration": "Native API Support",
      "Telegram Clients": "Pyrogram & Telethon",
      "Signal Patterns": "35+ Regex Patterns",
      "Execution Speed": "< 1 Second",
      "Supported Assets": "Forex, Gold, Indices",
      "Strategies": "Multi-TP & Trailing Stop",
      "Database": "SQLite Integration",
      "GUI Framework": "PyQt5 Professional",
      "Risk Management": "Advanced with Breakeven",
      "Update Frequency": "Real-time Monitoring",
      "License System": "Hardware Fingerprinting"
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


