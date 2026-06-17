"use client";

import { FlowSteps } from "@/components/ui/FlowSteps";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { useSiteContent } from "@/components/providers/LocaleProvider";

export function DiscoverySection() {
  const section = useSiteContent().homepage.discovery;
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
    </SectionShell>
  );
}
