"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function MemoriesSection() {
  const content = useSiteContent();
  const section = content.homepage.memories;
  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.title}
      description={section.description}
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <ScrollReveal>
          <ul className="space-y-4">
            {section.layers.map((layer) => (
              <li
                key={layer}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface/40 p-4"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <span className="text-sm leading-relaxed text-muted">{layer}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            {section.callout}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative mx-auto max-w-xs">
            <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border-gold">
              <Image
                src={content.assets.cardBack}
                alt={section.cardAlt}
                width={320}
                height={480}
                className="w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-surface px-4 py-3 text-xs text-muted shadow-lg">
              {section.badge}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}
