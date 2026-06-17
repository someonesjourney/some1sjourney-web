import { CTAButton, ContentPageLayout } from "@/components/ui/ContentPageLayout";
import { FeatureSlider } from "@/components/ui/FeatureSlider";
import { FlowSteps } from "@/components/ui/FlowSteps";
import {
  GuideCardDuel,
  GuideCardSpotlight,
  GuideCardStrip,
  buildCombatGuideCards,
} from "@/components/ui/GuideCardArt";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getCta, getSiteContent, type Locale } from "@/lib/i18n";
import { enrichGuideSlides, getGuideCardArtCopy } from "@/lib/guideCardArt";

export function CombatContent({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const page = content.combat;
  const primaryCta = getCta(locale, page.cta.primaryCta);
  const secondaryCta = getCta(locale, page.cta.secondaryCta);
  const cardArt = getGuideCardArtCopy(locale);
  const cards = buildCombatGuideCards();
  const vsLabel = locale === "ar" ? "ضد" : "VS";
  const sliderSlides = enrichGuideSlides(page.slider.slides, "combat");

  return (
    <ContentPageLayout
      size="wide"
      label={page.label}
      title={page.title}
      description={page.description}
    >
      <ScrollReveal>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(260px,340px)]">
          <div className="rounded-2xl border border-[var(--border-gold)] bg-gold/5 px-5 py-4 text-sm leading-relaxed text-muted md:text-base">
            {page.heroHighlight}
          </div>
          <GuideCardDuel
            left={cards.duel.left}
            right={cards.duel.right}
            leftAlt={cardArt.combat.duelLeftAlt}
            rightAlt={cardArt.combat.duelRightAlt}
            vsLabel={vsLabel}
            caption={cardArt.combat.duelCaption}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="mt-10">
          <FeatureSlider
            title={page.slider.title}
            subtitle={page.slider.subtitle}
            slides={sliderSlides}
            cardArtContext="combat"
            labels={{
              prev: page.slider.prevLabel,
              next: page.slider.nextLabel,
              goTo: page.slider.goToLabel,
            }}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-5 md:p-6">
          <GuideCardStrip
            cards={cards.roster}
            altForId={cardArt.combat.cardAlt}
            caption={cardArt.combat.rosterCaption}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mt-16 rounded-2xl border border-border bg-surface/50 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.matchRules.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {page.matchRules.body}
          </p>
          <div className="mt-6">
            <FlowSteps steps={page.matchRules.steps} />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.modes.title}
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {page.modes.items.map((mode, index) => (
              <div
                key={mode.id}
                className="h-full rounded-2xl border border-border bg-surface/40 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {mode.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {mode.summary}
                </p>
                <ul className="mt-4 space-y-2">
                  {mode.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <ScrollReveal delay={0.14}>
          <div className="rounded-2xl border border-border bg-surface/50 p-6">
            <h2 className="text-xl font-semibold text-foreground">
              {page.actions.title}
            </h2>
            <div className="mt-5 space-y-4">
              {page.actions.items.map((action) => (
                <div
                  key={action.title}
                  className="rounded-xl border border-border/80 bg-background/40 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-foreground">{action.title}</h3>
                    <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gold">
                      {action.cost}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <div className="rounded-2xl border border-border bg-surface/50 p-6">
            <GuideCardSpotlight
              card={cards.layers}
              alt={cardArt.combat.cardAlt(cards.layers.id)}
              className="mb-6"
            />
            <p className="mb-5 text-center text-xs leading-relaxed text-muted">
              {cardArt.combat.layersCaption}
            </p>
            <h2 className="text-xl font-semibold text-foreground">
              {page.layers.title}
            </h2>
            <div className="mt-5 space-y-4">
              {page.layers.items.map((layer) => (
                <div key={layer.title}>
                  <h3 className="font-semibold text-foreground">{layer.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.18}>
        <div className="mt-16 rounded-2xl border border-[var(--border-gold)] bg-surface/30 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.flow.title}
          </h2>
          <div className="mt-6">
            <FlowSteps steps={page.flow.steps} />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mt-16 rounded-2xl border border-border bg-surface/40 p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground">{page.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {page.cta.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <CTAButton href={primaryCta.href}>{primaryCta.label}</CTAButton>
            <CTAButton href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </CTAButton>
          </div>
        </div>
      </ScrollReveal>
    </ContentPageLayout>
  );
}
