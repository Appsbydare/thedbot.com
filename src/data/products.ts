export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "forex" | "automation" | "indicators" | "business" | "api" | "data" | "communication";
  description: string;
  longDescription?: string;
  priceUSD: number;
  monthlyPriceUSD?: number;
  features: string[];
  rating?: number;
  reviews?: number;
  badge?: string;
  deliverableType: "file" | "license" | "custom";
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
  {
    id: "workflow-connector",
    slug: "workflow-connector",
    name: "Business Workflow Connector",
    category: "business",
    description: "Multi-platform API integration hub that connects your business systems in real-time",
    longDescription:
      "The Business Workflow Connector is a comprehensive API integration platform that seamlessly connects your CRM, ERP, e-commerce, and other business systems. Pre-built connectors for 20+ popular platforms combined with custom integration support make it the perfect solution for businesses looking to automate data flow and eliminate manual data entry.",
    priceUSD: 199,
    features: [
      "Pre-built connectors for 20+ platforms",
      "Custom API integration support",
      "Real-time data sync",
      "Error handling & logging",
      "Webhook support",
      "Scheduled synchronization",
      "Data transformation tools",
      "Multi-user support"
    ],
    rating: 4.9,
    reviews: 45,
    badge: "Featured",
    deliverableType: "license",
    deliverableRef: "workflow-connector-license",
    support: "Priority Support",
    demo: true,
    specifications: {
      "Platform": "Cloud-based (SaaS)",
      "Supported Platforms": "20+ integrations",
      "API Types": "REST, GraphQL, SOAP",
      "Authentication": "OAuth 2.0, API Keys, JWT",
      "Data Sync": "Real-time & Scheduled",
      "Monitoring": "Real-time logs & alerts",
      "Updates": "Automatic",
      "Support": "24/7 Priority Support"
    }
  },
  {
    id: "ecommerce-automator",
    slug: "ecommerce-automator",
    name: "E-commerce Order Automator",
    category: "business",
    description: "Automatically sync orders between your store, inventory system, and fulfillment partners",
    longDescription:
      "The E-commerce Order Automator streamlines your online business operations by automatically synchronizing orders, inventory, and fulfillment across multiple platforms. Whether you sell on Shopify, WooCommerce, or custom platforms, this solution ensures your inventory is always accurate and your orders are processed efficiently.",
    priceUSD: 149,
    features: [
      "Shopify, WooCommerce, Stripe integration",
      "Inventory sync across platforms",
      "Automated invoice generation",
      "Multi-warehouse support",
      "Order tracking automation",
      "Customer notification system",
      "Financial reporting",
      "Returns management"
    ],
    rating: 4.8,
    reviews: 68,
    badge: "Popular",
    deliverableType: "license",
    deliverableRef: "ecommerce-automator-license",
    support: "Priority Support",
    demo: true,
    specifications: {
      "Platform": "Cloud-based (SaaS)",
      "E-commerce Platforms": "Shopify, WooCommerce, Magento",
      "Payment Gateways": "Stripe, PayPal, Square",
      "Inventory Management": "Real-time sync",
      "Multi-warehouse": "Unlimited warehouses",
      "Order Processing": "Automated",
      "Reporting": "Advanced analytics",
      "Support": "Email & Chat Support"
    }
  },
  {
    id: "custom-api-integration",
    slug: "custom-api-integration",
    name: "Custom API Integration",
    category: "api",
    description: "Tailored automation solutions built specifically for your business requirements and existing systems",
    longDescription:
      "Our Custom API Integration service provides fully customized automation solutions designed specifically for your unique business needs. Whether you need to connect legacy systems, build complex multi-step workflows, or integrate proprietary software, our team of experts will design, develop, and deploy a solution that fits perfectly into your existing infrastructure.",
    priceUSD: 0, // Custom quote
    features: [
      "One-on-one consultation",
      "Custom development from scratch",
      "Legacy system integration",
      "Ongoing support & maintenance",
      "Scalable architecture",
      "Security compliance (GDPR, SOC2)",
      "Documentation & training",
      "Source code included"
    ],
    rating: 0,
    reviews: 0,
    badge: "New",
    deliverableType: "custom",
    deliverableRef: "custom-quote-required",
    support: "Dedicated Support Team",
    demo: false,
    specifications: {
      "Consultation": "Included",
      "Development": "Custom from scratch",
      "Timeline": "Based on complexity",
      "Technologies": "Any platform",
      "Integration Type": "API, Database, Middleware",
      "Deployment": "Cloud or On-premise",
      "Maintenance": "Optional contracts available",
      "Support": "Dedicated support team"
    }
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}


