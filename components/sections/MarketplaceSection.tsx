"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function MarketplaceSection() {
  const section = useSiteContent().homepage.marketplace;
  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.title}
      description={section.description}
      centered
    >
      <ScrollReveal>
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface/30 p-8 text-center opacity-90">
          <p className="text-sm leading-relaxed text-muted">{section.body}</p>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
