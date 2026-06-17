"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function EvolutionSection() {
  const section = useSiteContent().homepage.evolution;
  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.title}
      description={section.description}
      centered
    >
      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block" />
        <div className="space-y-8">
          {section.seasons.map((season, index) => (
            <ScrollReveal key={season.name} delay={index * 0.1}>
              <div
                className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-4 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-gold bg-background md:left-1/2 md:block" />
                <div className="md:w-1/2">
                  <div className="rounded-2xl border border-border bg-surface/50 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                      {season.status}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">
                      {season.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{season.subtitle}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
