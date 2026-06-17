"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function PTSSection() {
  const section = useSiteContent().homepage.pts;
  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.title}
      description={section.description}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {section.uses.map((use, index) => (
          <ScrollReveal key={use.title} delay={index * 0.1}>
            <div className="h-full rounded-2xl border border-border bg-surface/50 p-6">
              <h3 className="text-lg font-semibold text-foreground">{use.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {use.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  );
}
