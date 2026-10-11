"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { DATA, NAV_LINKS } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-transparent transition-colors duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a
            href="#summary"
            className="font-heading text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-brand"
          >
            {DATA.personal.name}
            <span className="text-brand">.</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* scroll progress — fixed to the bottom of the viewport so it persists */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-50 h-0.5 origin-left bg-brand"
        style={{ scaleX }}
      />
    </>
  );
}
