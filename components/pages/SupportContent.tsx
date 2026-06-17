import Link from "next/link";
import { CTAButton, ContentPageLayout } from "@/components/ui/ContentPageLayout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getCta, getSiteContent, SUPPORT_EMAIL, type Locale } from "@/lib/i18n";

export function SupportContent({ locale }: { locale: Locale }) {
  const page = getSiteContent(locale).support;
  const primaryCta = getCta(locale, page.primaryCta);

  return (
    <ContentPageLayout
      label={page.label}
      title={page.title}
      description={page.description}
    >
      <ScrollReveal>
        <div className="rounded-2xl border border-border bg-surface/50 p-6">
          <h2 className="text-lg font-semibold text-foreground">
            {page.emailBlock.title}
          </h2>
          <p className="mt-2 text-sm text-muted">{page.emailBlock.description}</p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-4 inline-flex text-gold hover:text-gold-light"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </ScrollReveal>

      <div className="mt-8 space-y-8">
        {page.sections.map((section, index) => (
          <ScrollReveal key={section.title} delay={index * 0.08}>
            <div className="rounded-2xl border border-border bg-surface/30 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {section.description}
              </p>
              {section.items ? (
                <ul className="mt-4 space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.linkKey ? (
                <Link
                  href={getCta(locale, section.linkKey).href}
                  className="mt-4 inline-flex text-sm text-gold hover:text-gold-light"
                >
                  {getCta(locale, section.linkKey).label}
                  {locale === "ar" ? " ←" : " →"}
                </Link>
              ) : null}
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-12">
        <CTAButton href={primaryCta.href}>{primaryCta.label}</CTAButton>
      </div>
    </ContentPageLayout>
  );
}
