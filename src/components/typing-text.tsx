"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
  className?: string;
};

/** Typewriter effect. State updates happen inside the interval callback
 *  (async), so this does not trip react-hooks/set-state-in-effect.
 *  Pass a `key` when `text` can change to restart from scratch. */
export function TypingText({ text, speed = 70, className }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span className={className}>{displayed}</span>;
}
