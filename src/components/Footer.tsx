import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-foreground/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} theDBot. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-foreground/80">Terms</Link>
          <Link href="/privacy" className="hover:text-foreground/80">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}


