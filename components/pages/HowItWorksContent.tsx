import Image from "next/image";
import { CARD_PREVIEWS } from "@/lib/cardPreviews";
import { CTAButton, ContentPageLayout } from "@/components/ui/ContentPageLayout";
import { FlowSteps } from "@/components/ui/FlowSteps";
import { IdentityCard } from "@/components/ui/IdentityCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getCta, getSiteContent, type Locale } from "@/lib/i18n";

export function HowItWorksContent({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const page = content.howItWorks;
  const primaryCta = getCta(locale, page.primaryCta);

  return (
    <ContentPageLayout
      label={page.label}
      title={page.title}
      description={page.description}
    >
      <ScrollReveal>
        <FlowSteps steps={page.productFlow.slice(0, 4)} className="mb-4" />
        <FlowSteps steps={page.productFlow.slice(4)} />
      </ScrollReveal>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <ScrollReveal>
          <div className="rounded-2xl border border-border bg-surface/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              {page.mockPanels.identity.label}
            </p>
            <div className="mt-4 max-w-[180px]">
              <IdentityCard
                src={CARD_PREVIEWS[1].url}
                alt={page.mockPanels.identity.cardAlt}
                priority
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {page.mockPanels.identity.description}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-surface/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              {page.mockPanels.tribe.label}
            </p>
            <div className="mt-4 flex -space-x-3 rtl:space-x-reverse">
              {[0, 2, 4].map((i) => (
                <div
                  key={i}
                  className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background"
                >
                  <Image
                    src={CARD_PREVIEWS[i].url}
                    alt={page.mockPanels.tribe.memberAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {page.mockPanels.tribe.description}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.15}>
        <div className="mt-16 rounded-2xl border border-[var(--border-gold)] bg-surface/30 p-8">
          <h2 className="text-xl font-semibold text-foreground">
            {page.differentiators.title}
          </h2>
          <ul className="mt-4 space-y-3">
            {page.differentiators.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <div className="mt-12">
        <CTAButton href={primaryCta.href}>{primaryCta.label}</CTAButton>
      </div>
    </ContentPageLayout>
  );
}
