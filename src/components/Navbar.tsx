"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DB</span>
          </div>
          <span className="text-xl font-bold text-white">theDBot</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={
                  "transition-all duration-300 hover:text-blue-400 relative " +
                  (isActive 
                    ? "text-blue-400 font-semibold" 
                    : "text-gray-300 hover:text-white"
                  )
                }
              >
                {label}
                {isActive && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <button className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}


