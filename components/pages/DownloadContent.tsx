import Link from "next/link";
import { CTAButton, ContentPageLayout } from "@/components/ui/ContentPageLayout";
import { QRAccessPanel } from "@/components/ui/QRAccessPanel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getCta, getSiteContent, getStoreUrl, type Locale } from "@/lib/i18n";

export function DownloadContent({ locale }: { locale: Locale }) {
  const page = getSiteContent(locale).download;
  const primaryCta = getCta(locale, page.primaryCta);
  const secondaryCta = getCta(locale, page.secondaryCta);

  return (
    <ContentPageLayout
      label={page.label}
      title={page.title}
      description={page.description}
    >
      <div className="space-y-8">
        {page.steps.map((step, index) => (
          <ScrollReveal key={step.title} delay={index * 0.08}>
            <div className="rounded-2xl border border-border bg-surface/50 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-background">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                  {step.storeLinks ? (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {step.storeLinks.map((link) => (
                        <a
                          key={link.label}
                          href={getStoreUrl(locale, link.key)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition hover:border-border-gold hover:text-gold"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="mt-12">
          <QRAccessPanel />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.25}>
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-surface/20 p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-dark">
            {page.nativeStores.label}
          </p>
          <p className="mt-3 text-sm text-muted">{page.nativeStores.description}</p>
          <div className="mt-6 flex justify-center gap-4 opacity-40">
            {page.nativeStores.placeholders.map((label) => (
              <div
                key={label}
                className="rounded-lg border border-border px-6 py-3 text-xs text-muted"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <CTAButton href={primaryCta.href} variant="secondary">
          {primaryCta.label}
        </CTAButton>
        <Link
          href={secondaryCta.href}
          className="text-sm text-muted hover:text-foreground"
        >
          {secondaryCta.label}
        </Link>
      </div>
    </ContentPageLayout>
  );
}
