"use client";

import { CARD_PREVIEWS } from "@/lib/cardPreviews";
import { IdentityCard } from "@/components/ui/IdentityCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function IdentitiesSection() {
  const content = useSiteContent();
  const section = content.homepage.identities;
  const { identityCount } = content.worldState.stats;
  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.titleTemplate(identityCount)}
      description={section.descriptionTemplate(identityCount)}
      centered
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {CARD_PREVIEWS.map((card, index) => (
          <ScrollReveal key={card.id} delay={(index % 6) * 0.05}>
            <IdentityCard
              src={card.url}
              alt={`Identity card ${card.id}`}
              priority={index < 6}
            />
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={0.2}>
        <p className="mt-10 text-center text-sm text-muted-dark">
          {section.footnote}
        </p>
      </ScrollReveal>
    </SectionShell>
  );
}
