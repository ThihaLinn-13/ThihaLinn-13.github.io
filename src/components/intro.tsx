"use client";

import { createTimeline, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";
import { DATA } from "@/lib/data";

/** Splits text into per-character spans so they can be staggered in. */
function AnimatedText({ text }: { text: string }) {
  return (
    <span>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          data-char=""
          className="inline-block whitespace-pre opacity-0"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/**
 * Duolingo-style opening sequence. Plays on every page load, then hands over to the
 * portfolio. Skippable by button or click, and skipped entirely when the user
 * prefers reduced motion.
 */
export function Intro() {
  const [play, setPlay] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<ReturnType<typeof createTimeline> | null>(null);

  // Deferred to the next frame: never during SSR and never a synchronous
  // setState inside the effect body.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setPlay(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // lock scrolling while the intro is up
  useEffect(() => {
    if (!play) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [play]);

  // the anime.js sequence
  useEffect(() => {
    const root = rootRef.current;
    if (!play || !root) return;

    const mascot = root.querySelector("[data-mascot]");
    const greeting = root.querySelector("[data-greeting]");
    const role = root.querySelector("[data-role]");
    const welcome = root.querySelector("[data-welcome]");
    const chars = root.querySelectorAll("[data-char]");

    const timeline = createTimeline({
      onComplete: () => setPlay(false),
    });

    if (mascot) {
      timeline.add(
        mascot,
        {
          opacity: [0, 1],
          scale: [0.5, 1.14, 1],
          y: [16, 0],
          duration: 750,
          ease: "outQuad",
        },
        0
      );
    }

    if (greeting) {
      timeline.add(
        greeting,
        { opacity: [0, 1], scale: [0.85, 1], duration: 600, ease: "outExpo" },
        200
      );
    }

    if (chars.length > 0) {
      timeline.add(
        chars,
        {
          opacity: [0, 1],
          y: [18, 0],
          rotate: [-10, 0],
          duration: 600,
          delay: stagger(38),
          ease: "outExpo",
        },
        550
      );
    }

    if (role) {
      timeline.add(
        role,
        { opacity: [0, 1], y: [24, 0], duration: 700, ease: "outExpo" },
        2100
      );
    }

    if (welcome) {
      timeline.add(
        welcome,
        { opacity: [0, 1], y: [18, 0], duration: 700, ease: "outExpo" },
        2900
      );
    }

    timeline.add(
      root,
      {
        opacity: [1, 0],
        scale: [1, 1.08],
        filter: ["blur(0px)", "blur(5px)"],
        duration: 750,
        ease: "inOutQuad",
        onComplete: () => setPlay(false),
      },
      3900
    );

    timelineRef.current = timeline;

    return () => {
      timeline.pause();
      timelineRef.current = null;
    };
  }, [play]);

  const skip = () => {
    timelineRef.current?.pause();
    setPlay(false);
  };

  if (!play) return null;

  return (
    <div
      ref={rootRef}
      onClick={skip}
      className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-background px-6"
    >
      <div className="relative w-full max-w-3xl text-center">
        {/* robot mascot */}
        <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
          <img
            data-mascot=""
            src="/assets/robot.svg"
            alt=""
            width={120}
            height={130}
            className="h-24 opacity-0 drop-shadow-[0_8px_20px_rgba(56,189,248,0.3)]"
          />
        </div>

        <p
          data-greeting=""
          className="font-heading text-4xl font-bold text-muted-foreground opacity-0 md:text-6xl"
        >
          {DATA.intro.greeting}
        </p>

        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <AnimatedText text={DATA.intro.name} />
        </h1>

        <p data-role="" className="mt-4 text-lg text-brand opacity-0 md:text-2xl">
          {DATA.intro.role}
        </p>

        <p
          data-welcome=""
          className="mt-10 text-sm text-muted-foreground opacity-0 md:text-base"
        >
          {DATA.intro.welcome}
        </p>
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute top-6 right-6 rounded-full border border-border px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        Skip
      </button>
    </div>
  );
}
