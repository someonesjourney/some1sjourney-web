"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function SeasonOneSection() {
  const content = useSiteContent();
  const section = content.homepage.seasonOne;
  const { currentSeason, evolutionStage } = content.worldState;
  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.titleTemplate(currentSeason.name, evolutionStage)}
      description={section.description}
    >
      <ScrollReveal>
        <div className="rounded-3xl border border-[var(--border-gold)] bg-gradient-to-br from-surface to-background-secondary p-8 md:p-10">
          <div className="grid gap-4 md:grid-cols-2">
            {section.liveSignals.map((signal) => (
              <div
                key={signal}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-4 py-3"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-40" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
                </span>
                <span className="text-sm text-muted">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
