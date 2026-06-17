"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useCta, useSiteContent } from "@/components/providers/LocaleProvider";

export function CompeteEvolveSection() {
  const section = useSiteContent().homepage.competeEvolve;
  const cta = useCta()(section.cta);

  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.title}
      description={section.description}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {section.pillars.map((pillar, index) => (
          <ScrollReveal key={pillar.title} delay={index * 0.08}>
            <div className="h-full rounded-2xl border border-border p-5 text-center">
              <p className="text-2xl font-semibold text-gold">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-base font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pillar.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="mt-8 flex justify-center">
          <Link
            href={cta.href}
            className="inline-flex items-center justify-center rounded-full border border-[var(--border-gold)] bg-gold/10 px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-background"
          >
            {cta.label}
          </Link>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
