"use client";

import Link from "next/link";
import { ArrowRight, Zap, Shield, TrendingUp, Globe } from "@/components/icons";
import AnimatedHeading from "@/components/AnimatedHeading";
import { useState, useRef, useEffect } from "react";

const categories = [
  {
    href: "/products?category=workflow",
    icon: "🔁",
    title: "Workflow Automator",
    description: "Trigger automated trading actions via REST APIs, webhook listeners, or custom event pipelines. Ideal for signal providers, bot creators, or platforms needing scalable execution logic.",
    features: [
      "Supports TradingView, Telegram, and custom webhook formats",
      "JSON-based API with authentication and rate limits",
      "Includes sandbox mode for testing integrations",
      "Compatible with MT5, MT4, and custom bots"
    ],
    cta: "Explore Workflow Automator",
    gradient: "from-white via-slate-50 to-white hover:via-slate-100",
    ctaColor: "text-blue-700"
  },
  {
    href: "/products?category=strategy",
    icon: "🧠",
    title: "Strategy Engine",
    description: "Design and deploy rule-based or AI-enhanced trading strategies with modular logic blocks and real-time market feeds.",
    features: [
      "Drag-and-drop strategy builder or Python scripting",
      "Supports multi-timeframe analysis and indicator stacking",
      "Backtest with historical data or simulate live conditions",
      "Export strategies to MT5 or integrate via API"
    ],
    cta: "Explore Strategy Engine",
    gradient: "from-white via-blue-50 to-white hover:via-blue-100",
    ctaColor: "text-indigo-700"
  },
  {
    href: "/products?category=signal-sync",
    icon: "📡",
    title: "Signal Sync Hub",
    description: "Synchronize signals from multiple sources—Telegram, TradingView, Discord—and route them to your preferred execution platform.",
    features: [
      "Real-time parsing of messages, alerts, and webhook payloads",
      "Signal filtering, delay control, and conditional triggers",
      "Multi-account routing with license-based access",
      "MT5, MT4, and Binance execution modules available"
    ],
    cta: "Explore Signal Sync Hub",
    gradient: "from-white via-indigo-50 to-white hover:via-indigo-100",
    ctaColor: "text-indigo-700"
  },
  {
    href: "/products?category=business",
    icon: "💼",
    title: "Business Process Automation",
    description: "Streamline recurring business tasks with intelligent automation. Connect your CRM, ERP, accounting, and e-commerce systems for seamless operations.",
    features: [
      "Invoice processing, order fulfillment, inventory sync",
      "Multi-platform data synchronization (Shopify, WooCommerce, QuickBooks)",
      "Custom workflow builders for unique business processes",
      "Scheduled tasks, conditional triggers, error handling"
    ],
    cta: "Explore Business Automation",
    gradient: "from-white via-purple-50 to-white hover:via-purple-100",
    ctaColor: "text-purple-700"
  },
  {
    href: "/products?category=api",
    icon: "🔗",
    title: "API Integration Services",
    description: "Build bridges between any two systems. Whether connecting modern SaaS tools or legacy enterprise software, we create reliable API middleware.",
    features: [
      "REST API development and integration",
      "Real-time data exchange between platforms",
      "Custom authentication and security protocols",
      "Webhook creation, management, and monitoring"
    ],
    cta: "Explore API Services",
    gradient: "from-white via-green-50 to-white hover:via-green-100",
    ctaColor: "text-green-700"
  },
  {
    href: "/products?category=data",
    icon: "📊",
    title: "Data & Reporting Automation",
    description: "Automate data collection, transformation, and reporting from multiple sources. Real-time dashboards and scheduled reports delivered on autopilot.",
    features: [
      "Automated report generation (PDF, Excel, Google Sheets)",
      "Live dashboard updates from multiple data sources",
      "ETL pipelines for data warehousing",
      "Database integrations (MySQL, PostgreSQL, MongoDB)"
    ],
    cta: "Explore Data Solutions",
    gradient: "from-white via-orange-50 to-white hover:via-orange-100",
    ctaColor: "text-orange-700"
  },
  {
    href: "/products?category=communication",
    icon: "💬",
    title: "Communication Automation",
    description: "Automate customer communications, notifications, and alerts across multiple channels. Keep your team and customers informed automatically.",
    features: [
      "WhatsApp Business API, Email, SMS integration",
      "Auto-responses and intelligent routing",
      "CRM integration for lead tracking and follow-ups",
      "Event-triggered notifications and escalations"
    ],
    cta: "Explore Communication Tools",
    gradient: "from-white via-pink-50 to-white hover:via-pink-100",
    ctaColor: "text-pink-700"
  }
];

function CategoryCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pausedTransform = useRef<string>('');
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused && trackRef.current) {
        const style = window.getComputedStyle(trackRef.current);
        const transform = style.transform;
        if (transform && transform !== 'none') {
          pausedTransform.current = transform;
        }
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Detect which card is in the center and pause it
  useEffect(() => {
    if (isPaused) return;

    const checkCenterCard = () => {
      if (!trackRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      const cards = trackRef.current.children;
      let closestIndex = -1;
      let minDistance = Infinity;

      // Check first set of cards only (not duplicates)
      for (let i = 0; i < categories.length; i++) {
        const card = cards[i] as HTMLElement;
        if (!card) continue;

        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }

      // If a card is close enough to center (within threshold), focus it
      const threshold = containerRect.width * 0.15; // 15% of container width
      if (minDistance < threshold && closestIndex !== focusedIndex && focusedIndex === -1) {
        setFocusedIndex(closestIndex);
        
        // Clear any existing timeout
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }

        // Pause for 5 seconds when a card reaches center, then resume
        pauseTimeoutRef.current = setTimeout(() => {
          setFocusedIndex(-1);
        }, 5000);
      }
    };

    const interval = setInterval(checkCenterCard, 100);
    return () => {
      clearInterval(interval);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isPaused, focusedIndex]);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex overflow-hidden py-8">
        <div 
          ref={trackRef}
          className="flex"
          style={{
            animation: 'scrollCards 60s linear infinite',
            animationPlayState: (isPaused || focusedIndex !== -1) ? 'paused' : 'running',
          }}
        >
          {/* First set of cards */}
          {categories.map((category, index) => (
            <CategoryCard 
              key={`first-${index}`} 
              category={category} 
              isPaused={isPaused}
              isFocused={index === focusedIndex}
            />
          ))}
          {/* Duplicate for seamless loop */}
          {categories.map((category, index) => (
            <CategoryCard 
              key={`second-${index}`} 
              category={category} 
              isPaused={isPaused}
              isFocused={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category, isPaused, isFocused }: { category: typeof categories[0], isPaused: boolean, isFocused: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  // Reduce width by 40%: 25% * 0.6 = 15% per card
  return (
    <div className="flex-shrink-0" style={{ width: '15%', minWidth: '15%' }}>
      <Link 
        href={category.href} 
        className="group block px-3"
        onMouseEnter={(e) => {
          setIsHovered(true);
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
        }}
      >
        <div className={`category-card relative overflow-visible rounded-2xl backdrop-blur-sm bg-white/10 border-2 border-blue-400/30 p-6 h-[500px] transition-all duration-700 w-full ${
          isFocused ? 'scale-110 shadow-2xl border-blue-500/80 bg-white/30 z-50' : isHovered ? 'scale-105 shadow-2xl border-blue-500/60 bg-white/20' : 'hover:shadow-xl'
        }`}>
          <div className="relative z-10 h-full flex flex-col">
            <div className="mb-4 transform transition-transform duration-500 text-center" style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}>
              <span className="text-4xl">{category.icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{category.title}</h3>
            <p className="text-blue-700 mb-4 text-sm leading-relaxed font-medium">
              {category.description}
            </p>
            <ul className="text-xs text-blue-300 space-y-2 mb-4 flex-grow font-medium">
              {category.features.map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
            </ul>
            <div className="flex items-center transition-colors mt-auto">
              <span className="font-semibold text-sm text-blue-700">{category.cta}</span>
              <ArrowRight className={`size-5 ml-2 text-blue-700 transition-transform ${isHovered ? 'translate-x-2' : 'group-hover:translate-x-1'}`} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-20 sm:pb-32 overflow-hidden bg-black dark:bg-black">
        <div className="absolute inset-0 hero-gradient opacity-30"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center space-y-5">
            <div className="space-y-2 hero-headings-group">
              <div className="hero-line hero-line-left">
                <AnimatedHeading enablePerspective={false} groupHover={true} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block">
                  BUSINESS
                </AnimatedHeading>
              </div>
              <div className="hero-line hero-line-left">
                <AnimatedHeading enablePerspective={false} groupHover={true} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block">
                  AUTOMATION
                </AnimatedHeading>
              </div>
              <div className="hero-line hero-line-right">
                <AnimatedHeading enablePerspective={false} groupHover={true} lineStyle="second" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block">
                  MADE SIMPLE
                </AnimatedHeading>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground max-w-5xl mx-auto leading-relaxed pt-3">
                <span className="text-accent font-semibold">Automation software that connects your business systems through API integrations, webhooks, and custom workflows. From trading platforms to CRM systems, inventory management to data synchronization—we automate what matters.</span>
                <br />
                <span className="text-muted-foreground">Connect APIs • Automate workflows • Synchronize data • Custom integrations • Secure licensing • 24/7 support</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Explore Products
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/faq" 
                className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <AnimatedHeading className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading tracking-tight leading-[0.95] cursor-heading cursor-heading-why-choose mb-4">
              WHY CHOOSE
              <br />
              theDBot
            </AnimatedHeading>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Professional-grade automation with enterprise-level security and support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center space-y-4 p-6 rounded-2xl card hover-lift">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center text-3xl">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-foreground">Instant Setup</h3>
              <p className="text-muted-foreground">Download and deploy in minutes. Works across trading platforms, alert systems, and custom workflows—no complex configuration required.</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl card hover-lift">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center text-3xl">
                🔗
              </div>
              <h3 className="text-xl font-semibold text-foreground">Multi-Platform Integration</h3>
              <p className="text-muted-foreground">Connect any business system via REST APIs, webhooks, or custom middleware. Compatible with popular platforms and legacy systems.</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl card hover-lift">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center text-3xl">
                🛡️
              </div>
              <h3 className="text-xl font-semibold text-foreground">Secure Licensing</h3>
              <p className="text-muted-foreground">One license per user or endpoint. Enforced session control and anti-abuse protection for trading bots, API clients, and automation agents.</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl card hover-lift">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center text-3xl">
                📈
              </div>
              <h3 className="text-xl font-semibold text-foreground">Proven Results</h3>
              <p className="text-muted-foreground">Used in live trading, alert routing, and workflow automation across industries. Includes performance logs, backtests, and audit trails.</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl card hover-lift">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center text-3xl">
                💼
              </div>
              <h3 className="text-xl font-semibold text-foreground">Expert Consultation</h3>
              <p className="text-muted-foreground">Personalized solution design and 24/7 technical support. We understand your workflow and build automation that fits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-black dark:bg-black" data-bg="black">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <AnimatedHeading className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading tracking-tight leading-[0.95] cursor-heading cursor-heading-why-choose mb-4">
              AUTOMATION
              <br />
              CATEGORIES
            </AnimatedHeading>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Choose from our comprehensive range of automation solutions for trading, business operations, and custom integrations
            </p>
          </div>

          <CategoryCarousel />
        </div>
      </section>

      {/* CTA Section - White Background */}
      <section className="py-20 bg-white dark:bg-white relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-6">
          <AnimatedHeading enablePerspective={false} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading tracking-tight leading-[0.95] cursor-heading cursor-heading-why-choose mb-2">
              READY TO START
              <br />
              AUTOMATED
              <br />
              EXECUTION
          </AnimatedHeading>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of teams who trust theDBot for automated order execution. 
            Start with a free demo or launch your first automation today.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              Browse All Products
              <ArrowRight className="size-5" />
            </Link>
            <Link 
              href="/contact" 
              className="text-lg text-gray-600 hover:text-black transition-colors duration-300"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
