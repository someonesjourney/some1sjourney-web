"use client";

import Link from "next/link";
import { QRAccessPanel } from "@/components/ui/QRAccessPanel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useCta, useSiteContent } from "@/components/providers/LocaleProvider";

export function EarlyAccessSection() {
  const content = useSiteContent();
  const cta = useCta();
  const section = content.homepage.earlyAccess;
  const primaryCta = cta(section.primaryCta);
  const secondaryCta = cta(section.secondaryCta);
  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.title}
      description={section.description}
      centered
    >
      <ScrollReveal>
        <ol className="mx-auto mb-10 flex max-w-xl flex-col gap-3 text-left">
          {section.steps.map((step, index) => (
            <li
              key={step}
              className="flex items-center gap-4 rounded-xl border border-border bg-surface/40 px-4 py-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-background">
                {index + 1}
              </span>
              <span className="text-sm text-muted">{step}</span>
            </li>
          ))}
        </ol>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <QRAccessPanel compact />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-background transition hover:bg-gold-light"
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="text-sm text-muted transition hover:text-foreground"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
