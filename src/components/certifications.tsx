"use client";

import { Check } from "lucide-react";
import { DATA } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="scroll-mt-24 border-t border-border/60 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications"
        description="Classroom and programme-based training completed alongside professional work."
      />

      <ul className="grid gap-3 sm:grid-cols-2">
        {DATA.certifications.map((certification, index) => (
          <Reveal
            as="li"
            key={certification}
            delay={index * 0.06}
            className="flex items-start gap-3 rounded-xl border border-border bg-card/40 px-4 py-3.5 transition-colors hover:border-brand/40"
          >
            <Check size={15} className="mt-0.5 shrink-0 text-brand" />
            <span className="text-sm text-muted-foreground">{certification}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
