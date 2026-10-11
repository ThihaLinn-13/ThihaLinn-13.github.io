"use client";

import { BookOpen, CalendarDays } from "lucide-react";
import { DATA } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-t border-border/60 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Background"
        title="Education"
        description="Undergraduate studies with hands-on academic projects."
        icon={BookOpen}
      />

      <Reveal>
        <div className="grid gap-8 rounded-2xl border border-border bg-card/40 p-6 md:grid-cols-[220px_1fr] md:gap-12 md:p-8">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {DATA.education.school}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <CalendarDays size={13} />
              {DATA.education.year}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-brand">
              {DATA.education.degree}
            </h4>

            <h5 className="mt-6 mb-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Academic Projects
            </h5>
            <ul className="space-y-3">
              {DATA.education.projects.map((project) => (
                <li
                  key={project.slice(0, 24)}
                  className="relative pl-5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="absolute top-2 left-0 size-1.5 rounded-full bg-border" />
                  {project}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Languages:</span>{" "}
              {DATA.languages.join(", ")}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
