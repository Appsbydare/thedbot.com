"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MatrixBackground from "./MatrixBackground";
import AnimatedHamburger from "./AnimatedHamburger";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md glass border-b border-border">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <MatrixBackground containerRef={headerRef} />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/db-logo.png" alt="theDBot Logo" width={96} height={96} className="w-16 h-16" />
          <span className="text-xl font-bold text-foreground">theDBot</span>
        </Link>

        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={
                    "transition-all duration-300 hover:text-accent relative " +
                    (isActive
                      ? "text-accent font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {label}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <AnimatedHamburger
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Layer 1: White Background Slide */}
            {/* Layer 1: White Background Slide */}
            <motion.div
              className="fixed inset-0 w-screen h-[100dvh] bg-white z-[99998] md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Layer 2: Black Background Slide (Main Menu) */}
            <motion.div
              className="fixed inset-0 w-screen h-[100dvh] bg-black z-[99999] md:hidden flex flex-col overflow-hidden touch-none"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Menu Header with Close Button */}
              <div className="flex justify-end p-6 absolute top-0 right-0 z-10 w-full pointer-events-none">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-accent transition-colors p-2 pointer-events-auto"
                  aria-label="Close menu"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Links */}
              <div className="flex-1 flex flex-col justify-start px-8 pt-10 space-y-6">
                {links.map(({ href, label }, index) => (
                  <motion.div
                    key={href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-5xl font-bold tracking-tight hover:text-accent transition-colors block ${pathname === href ? "text-accent" : "text-white"
                        }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Menu Footer */}
              <motion.div
                className="p-8 border-t border-gray-800 mt-auto bg-black relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Image src="/db-logo.png" alt="theDBot Logo" width={40} height={40} className="w-10 h-10" />
                    <span className="text-xl font-bold text-white">theDBot</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    © 2025 the DBot LLC. All rights reserved.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}