"use client";

import { FlowSteps } from "@/components/ui/FlowSteps";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function PathBeyondSection() {
  const section = useSiteContent().homepage.pathBeyond;
  return (
    <SectionShell
      id={section.id}
      label={section.label}
      title={section.title}
      description={section.description}
    >
      <ScrollReveal>
        <FlowSteps steps={section.flow} />
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <div className="mt-10 rounded-2xl border border-[var(--border-gold)] bg-surface/40 p-6 md:p-8">
          <p className="text-sm leading-relaxed text-muted md:text-base">
            {section.callout}
          </p>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
