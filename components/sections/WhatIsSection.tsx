"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function WhatIsSection() {
  const section = useSiteContent().homepage.whatIs;
  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.title}
      description={section.description}
      centered
    >
      <div className="grid gap-6 md:grid-cols-3">
        {section.pillars.map((pillar, index) => (
          <ScrollReveal key={pillar.title} delay={index * 0.1}>
            <div className="h-full rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {pillar.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  );
}
