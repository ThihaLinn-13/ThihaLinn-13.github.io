"use client";

import { ExternalLink, FolderGit2, Github } from "lucide-react";
import { DATA } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border/60 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
        description="Products I've built for employers and on my own — from payment-enabled insurance mini apps to full-stack side projects."
        icon={FolderGit2}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {DATA.projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.05}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-card/40 p-6 transition-colors duration-300 hover:border-brand/40">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {project.title}
                </h3>
                <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {project.tag}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.repo || project.live ? (
                <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} source code on GitHub`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-brand"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  ) : null}
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live site`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-brand"
                    >
                      <ExternalLink size={14} />
                      Live
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
