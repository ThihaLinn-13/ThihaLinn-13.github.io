"use client";

import type { LucideIcon } from "lucide-react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
  id,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 md:mb-14">
      {eyebrow ? (
        <p className="mb-2 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex items-center gap-3">
        <h2
          id={id}
          className="scroll-mt-28 font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
        >
          {title}
        </h2>
        {Icon ? <Icon size={20} className="shrink-0 text-brand" /> : null}
      </div>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
