"use client";

import { animate } from "animejs";
import {
  Cloud,
  Code2,
  Database,
  Server,
  Smartphone,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { RadarArea } from "@/components/charts/radar-area";
import { RadarAxis } from "@/components/charts/radar-axis";
import { RadarChart } from "@/components/charts/radar-chart";
import { RadarGrid } from "@/components/charts/radar-grid";
import { RadarLabels } from "@/components/charts/radar-labels";
import { DATA } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type Group = {
  label: string;
  items: string[];
  icon: LucideIcon;
};

const GROUPS: Group[] = [
  { label: "Backend", items: DATA.skills.backend, icon: Server },
  { label: "Frontend", items: DATA.skills.frontend, icon: Code2 },
  { label: "Mobile", items: DATA.skills.mobile, icon: Smartphone },
  { label: "Database", items: DATA.skills.database, icon: Database },
  { label: "DevOps", items: DATA.skills.devops, icon: Cloud },
];

const METRICS = DATA.skillLevels.map(({ key, label }) => ({ key, label }));
const SERIES = [
  {
    label: DATA.personal.name,
    color: "var(--chart-1)",
    values: Object.fromEntries(
      DATA.skillLevels.map(({ key, value }) => [key, value])
    ) as Record<string, number>,
  },
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border/60 py-20 md:py-28">
      <SectionHeading
        eyebrow="Toolbox"
        title="Technical Skills"
        description="Technologies I work with daily across backend services, interfaces, mobile apps, data, and delivery."
      />

      <div className="grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:items-center md:gap-16">
        {/* Radar chart — Bklit UI */}
        <Reveal className="mx-auto w-full max-w-[320px]">
          <RadarChart data={SERIES} metrics={METRICS} margin={52}>
            <RadarGrid />
            <RadarAxis />
            <RadarLabels offset={20} fontSize={11} />
            <RadarArea index={0} />
          </RadarChart>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Self-assessed proficiency
          </p>
        </Reveal>

        {/* Skill groups */}
        <div className="space-y-8">
          {GROUPS.map((group, index) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.label} delay={index * 0.05}>
                <div className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                  <div className="mb-4 flex items-center gap-2">
                    <Icon size={15} className="text-brand" />
                    <h3 className="font-heading text-sm font-semibold tracking-wide text-foreground uppercase">
                      {group.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        onMouseEnter={(e) =>
                          animate(e.currentTarget, {
                            y: -3,
                            scale: 1.03,
                            duration: 180,
                            ease: "outQuad",
                          })
                        }
                        onMouseLeave={(e) =>
                          animate(e.currentTarget, {
                            y: 0,
                            scale: 1,
                            duration: 220,
                            ease: "outQuad",
                          })
                        }
                        className="cursor-default rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
