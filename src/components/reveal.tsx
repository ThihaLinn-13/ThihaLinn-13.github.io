"use client";

import { animate } from "animejs";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Rotation (deg) the element settles from — gives sections a subtle turn as they enter. */
  rotate?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * anime.js scroll reveal: each block fades in while sliding + rotating into place,
 * triggered as it enters the viewport.
 * Hidden state comes from CSS (`.js [data-reveal] { opacity: 0 }`), so it degrades
 * safely to always-visible when JavaScript is unavailable.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  rotate = -1.5,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        observer.disconnect();
        animate(el, {
          opacity: [0, 1],
          y: [y, 0],
          rotate: [rotate, 0],
          duration: 950,
          delay,
          ease: "outExpo",
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, y, rotate]);

  const Tag = as as React.ElementType;

  return (
    <Tag ref={ref} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
