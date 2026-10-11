"use client";

import { Briefcase } from "lucide-react";
import { DATA } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-border/60 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Career"
        title="Experience"
        description="Enterprise software delivery across insurance and enterprise platforms."
        icon={Briefcase}
      />

      <div className="relative space-y-12">
        {DATA.experience.map((job, index) => (
          <Reveal key={job.id} delay={index * 0.08}>
            <article className="relative grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
              {/* Left — company + period */}
              <div className="md:text-right">
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {job.company}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {job.period}
                </p>
              </div>

              {/* Right — role + bullets */}
              <div className="relative border-l border-border pl-6 md:pl-8">
                <span className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-brand ring-4 ring-background" />
                <h4 className="font-heading text-lg font-semibold text-brand">{job.role}</h4>
                <ul className="mt-4 space-y-3">
                  {job.description.map((line) => (
                    <li
                      key={line.slice(0, 24)}
                      className="relative pl-5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="absolute top-2 left-0 size-1.5 rounded-full bg-border" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
