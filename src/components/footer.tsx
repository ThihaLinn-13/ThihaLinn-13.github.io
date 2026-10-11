"use client";

import { DATA } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-12">
      <p className="mx-auto max-w-5xl px-6 text-center text-xs text-muted-foreground">
        © {year} {DATA.personal.name}. All rights reserved.
      </p>
    </footer>
  );
}
