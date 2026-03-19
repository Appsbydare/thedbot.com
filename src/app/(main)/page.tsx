"use client";

import Link from "next/link";
import { ArrowRight, Zap, Shield, TrendingUp, Globe } from "@/components/icons";
import AnimatedHeading from "@/components/AnimatedHeading";
import { useState, useRef, useEffect } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { motion } from "framer-motion";

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
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef(-1);
  const cooldownUntilRef = useRef(0);

  // Desktop Focus Logic
  useEffect(() => {
    if (isPaused) return;

    const checkInterval = setInterval(() => {
      const now = Date.now();

      if (now < cooldownUntilRef.current || focusedIndex !== -1) return;
      if (!trackRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const cards = trackRef.current.children;

      let closestIndex = -1;
      let closestDistance = Infinity;

      for (let i = 0; i < categories.length; i++) {
        const card = cards[i] as HTMLElement;
        if (!card) continue;

        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      if (closestIndex !== -1 && closestDistance < 15 && lastFocusedRef.current !== closestIndex) {
        setFocusedIndex(closestIndex);
        lastFocusedRef.current = closestIndex;

        setTimeout(() => {
          setFocusedIndex(-1);
          cooldownUntilRef.current = Date.now() + 3000;
        }, 5000);
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, [isPaused, focusedIndex]);

  // Mobile Auto-Scroll Logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (mobileContainerRef.current) {
        const container = mobileContainerRef.current;
        const card = container.querySelector('.snap-center');
        if (!card) return;

        const cardWidth = card.clientWidth;
        const gap = 16; // gap-4 is 16px
        const scrollAmount = cardWidth + gap;

        // Check if we can scroll more
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - 10) {
          // Reset to start gently
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000); // 3 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Desktop Infinite Scroll View (Hidden on mobile) */}
      <div className="hidden md:flex overflow-hidden py-8">
        <div
          ref={trackRef}
          className="flex"
          style={{
            animation: 'scrollCards 60s linear infinite',
            animationPlayState: (isPaused || focusedIndex !== -1) ? 'paused' : 'running',
          }}
        >
          {categories.map((category, index) => (
            <div key={`desktop-1-${index}`} className="flex-shrink-0 w-[30%] lg:w-[20%] xl:w-[15%]">
              <CategoryCard category={category} isFocused={focusedIndex === index} />
            </div>
          ))}
          {categories.map((category, index) => (
            <div key={`desktop-2-${index}`} className="flex-shrink-0 w-[30%] lg:w-[20%] xl:w-[15%]">
              <CategoryCard category={category} isFocused={false} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Snap Carousel View (Visible only on mobile) */}
      <div
        ref={mobileContainerRef}
        className="md:hidden flex overflow-x-auto snap-x snap-mandatory py-8 gap-4 px-4 no-scrollbar select-none"
        style={{ WebkitOverflowScrolling: 'touch' }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          // Small delay before resuming to avoid fighting the user's last swipe momentum
          setTimeout(() => setIsPaused(false), 2000);
        }}
        onScroll={() => setIsPaused(true)}
      >
        {categories.map((category, index) => (
          <div key={`mobile-${index}`} className="snap-center flex-shrink-0 w-[85vw]">
            <CategoryCard category={category} isFocused={false} mobileMode={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ category, isFocused, mobileMode = false }: { category: typeof categories[0], isFocused: boolean, mobileMode?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (mobileMode) {
      startX.current = e.touches[0].clientX;
      setIsDragging(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (mobileMode) {
      const currentX = e.touches[0].clientX;
      const diff = Math.abs(currentX - startX.current);
      if (diff > 5) {
        setIsDragging(true);
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  return (
    <Link
      href={category.href}
      className={`group block px-2 h-full ${mobileMode ? 'px-0' : 'sm:px-3'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
    >
      <div className={`category-card relative overflow-visible rounded-2xl backdrop-blur-sm bg-white/10 border-2 border-primary/30 p-6 transition-all duration-700 w-full flex flex-col h-full
        ${isFocused ? 'scale-110 shadow-2xl border-primary/80 bg-white/30 z-50' : isHovered ? 'scale-105 shadow-2xl border-primary/60 bg-white/20' : 'hover:shadow-xl'}
        ${mobileMode ? 'min-h-[450px]' : 'min-h-[420px] sm:h-[500px]'}
        `}>
        <div className="relative z-10 h-full flex flex-col">
          <div className="mb-4 transform transition-transform duration-500 text-center" style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}>
            <span className="text-5xl sm:text-4xl block">{category.icon}</span>
          </div>
          <h3 className="text-2xl sm:text-2xl font-bold text-white mb-3 leading-tight">{category.title}</h3>

          {/* Enforced Text Wrapping */}
          <div className="text-blue-100 mb-4 text-base sm:text-sm leading-relaxed font-medium whitespace-normal break-words">
            {category.description}
          </div>

          <ul className="text-sm sm:text-xs text-blue-200 space-y-2 mb-4 flex-grow font-medium">
            {category.features.map((feature, idx) => (
              <li key={idx} className="break-words">• {feature}</li>
            ))}
          </ul>
          <div className="flex items-center transition-colors mt-auto pt-4">
            <span className="font-semibold text-sm text-accent">{category.cta}</span>
            <ArrowRight className={`size-5 ml-2 text-accent transition-transform ${isHovered ? 'translate-x-2' : 'group-hover:translate-x-1'}`} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-35 pb-24 sm:pt-40 sm:pb-32 min-h-screen flex items-center overflow-hidden bg-black dark:bg-black">
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
                <AnimatedHeading enablePerspective={false} groupHover={true} lineStyle="second" className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading tracking-tight leading-[0.9] uppercase cursor-heading inline-block">
                  MADE SIMPLE
                </AnimatedHeading>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="space-y-2 pt-8 px-4 sm:px-0"
            >
              <p className="text-base sm:text-lg md:text-xl text-accent font-semibold mx-auto leading-relaxed whitespace-normal px-4">
                Automation software that links your systems with APIs, webhooks, and workflows—from trading to CRM, inventory to data sync
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mx-auto leading-loose opacity-90 whitespace-normal px-4">
                Connect APIs • Automate workflows • Synchronize data • Custom integrations • Secure licensing • 24/7 support
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center pt-6"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Explore Products
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/faq"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300 hover:tracking-wide"
            >
              Learn More →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-white dark:bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll className="text-center mb-10 sm:mb-16" width="100%">
            <AnimatedHeading className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading tracking-tight leading-[0.9] cursor-heading cursor-heading-why-choose mb-4">
              WHY CHOOSE
              <br />
              the DBot
            </AnimatedHeading>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              Professional-grade automation with enterprise-level security and support
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {[
              { icon: "⚡", title: "Instant Setup", desc: "Download and deploy in minutes. Works across trading platforms, alert systems, and custom workflows." },
              { icon: "🔗", title: "Multi-Platform", desc: "Connect any business system via REST APIs, webhooks, or custom middleware." },
              { icon: "🛡️", title: "Secure Licensing", desc: "One license per user. Enforced session control and anti-abuse protection." },
              { icon: "📈", title: "Proven Results", desc: "Used in live trading and workflow automation. Includes performance logs and trails." },
              { icon: "💼", title: "Expert Support", desc: "Personalized solution design and 24/7 technical support. We build for your workflow." }
            ].map((feature, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="text-center space-y-4 p-6 rounded-2xl card hover-lift border border-gray-100 dark:border-gray-800 h-full">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-accent/10 sm:bg-accent/20 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-12 sm:py-20 bg-black dark:bg-black" data-bg="black">
        <div className="mx-auto max-w-7xl px-4">
          <RevealOnScroll className="text-center mb-8 sm:mb-16" width="100%">
            <AnimatedHeading className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading tracking-tight leading-[0.9] cursor-heading cursor-heading-why-choose mb-4">
              AUTOMATION
              <br />
              CATEGORIES
            </AnimatedHeading>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              Choose from our comprehensive range of automation solutions
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2} width="100%">
            <CategoryCarousel />
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA Section - White Background */}
      <section className="py-16 sm:py-20 bg-white dark:bg-white relative overflow-hidden">
        <RevealOnScroll className="relative mx-auto max-w-4xl px-4 text-center space-y-6" width="100%">
          <AnimatedHeading enablePerspective={false} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading tracking-tight leading-[0.9] cursor-heading cursor-heading-why-choose mb-2">
            READY TO START
            <br />
            AUTOMATED
            <br />
            EXECUTION
          </AnimatedHeading>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams who trust theDBot for automated order execution.
            Start with a free demo or launch your first automation today.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              Browse All Products
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/contact"
              className="text-lg text-gray-600 hover:text-black transition-colors duration-300 mt-2 sm:mt-0"
            >
              Contact Support →
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
