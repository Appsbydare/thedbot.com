"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/providers", label: "Signal Providers" },
  { href: "/register-provider", label: "Become a Provider" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md glass border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/db-logo.png" alt="theDBot Logo" width={48} height={48} className="w-8 h-8" />
          <span className="text-xl font-bold text-foreground">theDBot</span>
        </Link>

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

        <div className="flex items-center gap-5">
          {/* Mobile menu button */}
          <button className="md:hidden text-foreground p-2 hover:text-accent transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}