'use client';

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import MatrixBackground from "./MatrixBackground";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer ref={footerRef} className="bg-secondary border-t border-border mt-20 relative overflow-hidden">
      <MatrixBackground containerRef={footerRef} />
      <div className="mx-auto max-w-7xl px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/db-logo.png" alt="theDBot Logo" width={96} height={96} className="w-16 h-16" />
              <span className="text-xl font-bold text-foreground">theDBot</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Professional automation solutions for trading platforms, business systems, and custom API integrations.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Products</h3>
            <nav className="space-y-2">
              <Link href="/products?category=forex" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Trading Automation
              </Link>
              <Link href="/products?category=business" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Business Workflow Solutions
              </Link>
              <Link href="/products?category=api" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                API Integration Services
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Custom Development
              </Link>
              <Link href="/products?category=data" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Data Synchronization
              </Link>
              <Link href="/products?category=communication" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Communication Tools
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Support</h3>
            <nav className="space-y-2">
              <Link href="/blog" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Blog
              </Link>
              <Link href="/faq" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                FAQ
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Contact
              </Link>
              <a href="mailto:%22Support%20Agent%22%20%3Cdarshana@thedbot.com%3E" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                support@thedbot.com
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Legal</h3>
            <nav className="space-y-2">
              <Link href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/refund" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Refund Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} the DBot LLC. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            1207 Delaware Ave #2685, Wilmington, DE 19806
          </p>
          <div className="max-w-4xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              All product names, logos, brands, trademarks and registered trademarks are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, trademarks and brands does not imply endorsement. theDBot is an independent service provider not affiliated with or endorsed by any third-party platforms mentioned.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


