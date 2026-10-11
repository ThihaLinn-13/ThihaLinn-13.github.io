"use client";

import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { DATA } from "@/lib/data";
import { gmailComposeUrl } from "@/lib/mail";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * Static-friendly contact: the site is exported to GitHub Pages with no server,
 * so "sending" hands the composed message to Gmail's web compose page instead.
 */
export function Contact() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mailSubject =
      subject.trim() || `Portfolio enquiry from ${name.trim() || "a visitor"}`;
    const body = `${message.trim()}\n\n— ${name.trim() || "Visitor"}`;

    window.open(
      gmailComposeUrl({
        to: DATA.personal.email,
        subject: mailSubject,
        body,
      }),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const fieldClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand/50";

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border/60 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Contact"
        title="Let's connect"
        description="Have an opportunity, a project, or just want to say hi? My inbox is open."
        icon={Mail}
      />

      <div className="grid gap-10 md:grid-cols-[minmax(0,260px)_minmax(0,440px)] md:justify-between md:gap-12">
        {/* details */}
        <Reveal>
          <div className="space-y-6">
            <a
              href={gmailComposeUrl({ to: DATA.personal.email })}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3"
            >
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
                <Mail size={15} />
              </span>
              <span>
                <span className="block text-xs tracking-wide text-muted-foreground uppercase">
                  Email
                </span>
                <span className="text-sm text-foreground underline-offset-4 group-hover:underline">
                  {DATA.personal.email}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground">
                <MapPin size={15} />
              </span>
              <span>
                <span className="block text-xs tracking-wide text-muted-foreground uppercase">
                  Location
                </span>
                <span className="text-sm text-foreground">{DATA.personal.location}</span>
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
              >
                <Github size={15} />
              </a>
              <a
                href={DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
              >
                <Linkedin size={15} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* compose form → mailto */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-border bg-card/40 p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                aria-label="Your name"
                className={fieldClass}
              />
              <input
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Subject"
                aria-label="Subject"
                className={fieldClass}
              />
            </div>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your message…"
              aria-label="Message"
              rows={5}
              className={`${fieldClass} resize-none`}
            />

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <Send size={15} />
              Send message
            </button>

            <p className="text-xs text-muted-foreground">
              Opens Gmail in a new tab with everything pre-filled — nothing is stored
              or sent through a third party.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
