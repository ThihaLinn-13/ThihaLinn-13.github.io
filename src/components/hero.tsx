"use client";

import { animate } from "animejs";
import { Github, Linkedin, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { DATA } from "@/lib/data";
import { Reveal } from "./reveal";
import { TypingText } from "./typing-text";

/** anime.js hover micro-interaction (transform-only, degrades gracefully). */
function useHoverLift() {
  const enter = (e: React.MouseEvent<HTMLElement>) =>
    animate(e.currentTarget, { scale: 1.03, duration: 200, ease: "outQuad" });
  const leave = (e: React.MouseEvent<HTMLElement>) =>
    animate(e.currentTarget, { scale: 1, duration: 260, ease: "outQuad" });
  return { onMouseEnter: enter, onMouseLeave: leave };
}

export function Hero() {
  const avatarRef = useRef<HTMLDivElement>(null);
  const githubBtn = useHoverLift();
  const linkedinBtn = useHoverLift();

  // anime.js: slow floating loop on the avatar card
  useEffect(() => {
    const el = avatarRef.current;
    if (!el) return;
    const animation = animate(el, {
      y: [0, -8],
      duration: 3400,
      loop: true,
      alternate: true,
      ease: "inOutSine",
    });
    return () => {
      animation.pause();
    };
  }, []);

  const links = [
    {
      key: "github",
      href: DATA.personal.github,
      label: "GitHub",
      icon: Github,
      handlers: githubBtn,
      primary: true,
    },
    {
      key: "linkedin",
      href: DATA.personal.linkedin,
      label: "LinkedIn",
      icon: Linkedin,
      handlers: linkedinBtn,
      primary: false,
    },
  ];

  return (
    <section
      id="summary"
      className="scroll-mt-24 pt-16 pb-20 md:pt-24 md:pb-28"
    >
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
        {/* Left — avatar + identity */}
        <div className="flex w-full flex-col items-center md:w-72 md:shrink-0">
          <div ref={avatarRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-56 h-56 md:w-64 md:h-64"
            >
              <div className="absolute -inset-3 rounded-[2rem] border border-border/60" />
              <img
                src={DATA.personal.avatar}
                alt={`${DATA.personal.name} portrait`}
                width={256}
                height={256}
                className="relative size-full rounded-3xl object-cover shadow-xl ring-1 ring-border"
              />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-center font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {DATA.personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 flex items-center gap-2 text-center text-sm font-medium text-brand"
          >
            <TypingText key={DATA.personal.role} text={DATA.personal.role} />
          </motion.p>

          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin size={13} />
            {DATA.personal.location}
          </p>
        </div>

        {/* Right — summary + CTAs */}
        <div className="flex-1 text-center md:text-left">
          <Reveal>
            <div className="space-y-5">
              {DATA.personal.summary.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap justify-center gap-3 md:justify-start">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={link.handlers.onMouseEnter}
                    onMouseLeave={link.handlers.onMouseLeave}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                      link.primary
                        ? "bg-foreground text-background hover:opacity-90"
                        : "border border-border text-foreground hover:border-foreground/30 hover:bg-accent"
                    }`}
                  >
                    <Icon size={15} />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
