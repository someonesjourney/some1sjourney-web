"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function TribesSection() {
  const section = useSiteContent().homepage.tribes;
  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.title}
      description={section.description}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {section.traits.map((trait, index) => (
          <ScrollReveal key={trait.title} delay={index * 0.1}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-background-secondary p-6">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
              <h3 className="relative text-lg font-semibold text-foreground">
                {trait.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted">
                {trait.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  );
}
