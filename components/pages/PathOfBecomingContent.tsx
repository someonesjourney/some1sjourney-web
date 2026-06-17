import { CTAButton, ContentPageLayout } from "@/components/ui/ContentPageLayout";
import { FeatureSlider } from "@/components/ui/FeatureSlider";
import { FlowSteps } from "@/components/ui/FlowSteps";
import {
  GuideCardFan,
  GuideCardPerceptionRow,
  GuideCardStrip,
  buildPoBGuideCards,
} from "@/components/ui/GuideCardArt";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getGuideCardArtCopy, enrichGuideSlides } from "@/lib/guideCardArt";
import { getCta, getSiteContent, type Locale } from "@/lib/i18n";

export function PathOfBecomingContent({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const page = content.pathOfBecoming;
  const primaryCta = getCta(locale, page.cta.primaryCta);
  const secondaryCta = getCta(locale, page.cta.secondaryCta);
  const cardArt = getGuideCardArtCopy(locale);
  const cards = buildPoBGuideCards();
  const perceptionLabels = page.perceptionLens.layers.map((layer) =>
    layer.title.split(" (")[0]?.split("(")[0]?.trim() ?? layer.title,
  );
  const sliderSlides = enrichGuideSlides(page.slider.slides, "pathOfBecoming");

  return (
    <ContentPageLayout
      size="wide"
      label={page.label}
      title={page.title}
      description={page.description}
    >
      <ScrollReveal>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(240px,320px)]">
          <div className="rounded-2xl border border-[var(--border-gold)] bg-gold/5 px-5 py-4 text-sm leading-relaxed text-muted md:text-base">
            {page.heroHighlight}
          </div>
          <GuideCardFan
            cards={cards.lensFan}
            alts={cards.lensFan.map((card) => cardArt.pathOfBecoming.cardAlt(card.id))}
            caption={cardArt.pathOfBecoming.lensCaption}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.04}>
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.importance.title}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {page.importance.pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-border bg-surface/40 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-border bg-surface/40 p-5 md:p-6">
            <GuideCardStrip
              cards={cards.library}
              altForId={cardArt.pathOfBecoming.cardAlt}
              caption={cardArt.pathOfBecoming.libraryCaption}
            />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <div className="mt-10">
          <FeatureSlider
            title={page.slider.title}
            subtitle={page.slider.subtitle}
            slides={sliderSlides}
            cardArtContext="pathOfBecoming"
            labels={{
              prev: page.slider.prevLabel,
              next: page.slider.nextLabel,
              goTo: page.slider.goToLabel,
            }}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="mt-16 rounded-2xl border border-[var(--border-gold)] bg-surface/30 p-6 text-center md:p-10">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.philosophy.title}
          </h2>
          <blockquote className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-gold md:text-xl">
            “{page.philosophy.quote}”
          </blockquote>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {page.philosophy.body}
          </p>
          <div className="mx-auto mt-8 max-w-sm">
            <GuideCardFan
              cards={cards.lensFan}
              alts={cards.lensFan.map((card) => cardArt.pathOfBecoming.cardAlt(card.id))}
            />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.stages.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {page.stages.subtitle}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {page.stages.items.map((stage) => (
              <div
                key={stage.number}
                className="rounded-xl border border-border/80 bg-surface/40 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-gold)] bg-background-secondary text-xs font-semibold text-gold">
                    {stage.number}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{stage.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {stage.theme}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <div className="mt-16 rounded-2xl border border-border bg-surface/50 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.decisionFlow.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {page.decisionFlow.body}
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">
                {locale === "ar" ? "المسارات الأساسية" : "Core paths"}
              </h3>
              <div className="mt-4 space-y-3">
                {page.decisionFlow.coreChoices.map((choice) => (
                  <div
                    key={choice.title}
                    className="rounded-xl border border-border/80 bg-background/40 p-4"
                  >
                    <h4 className="font-semibold text-foreground">{choice.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {choice.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                {locale === "ar" ? "المسارات المخفية" : "Hidden paths"}
              </h3>
              <div className="mt-4 space-y-3">
                {page.decisionFlow.hiddenChoices.map((choice) => (
                  <div
                    key={choice.title}
                    className="rounded-xl border border-border/80 bg-background/40 p-4"
                  >
                    <h4 className="font-semibold text-foreground">{choice.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {choice.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.14}>
        <div className="mt-16 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.perceptionLens.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {page.perceptionLens.body}
          </p>
          <div className="mt-8">
            <GuideCardPerceptionRow
              cardIds={cards.perceptionIds}
              labels={perceptionLabels}
              altForId={cardArt.pathOfBecoming.cardAlt}
              caption={cardArt.pathOfBecoming.perceptionCaption}
            />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.perceptionLens.layers.map((layer) => (
              <div
                key={layer.title}
                className="rounded-xl border border-[var(--border-gold)]/60 bg-gold/5 p-5"
              >
                <h3 className="font-semibold text-foreground">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {layer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.16}>
        <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-surface/50">
          <div className="border-b border-border px-6 py-5 md:px-8">
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">
              {page.traveler.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
              {page.traveler.body}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/40 text-start">
                  <th className="px-6 py-3 font-semibold text-foreground md:px-8">
                    {page.traveler.columns.reward}
                  </th>
                  <th className="px-4 py-3 font-semibold text-gold">
                    {page.traveler.columns.owner}
                  </th>
                  <th className="px-4 py-3 font-semibold text-muted md:pe-8">
                    {page.traveler.columns.traveler}
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.traveler.rows.map((row) => (
                  <tr key={row.label} className="border-b border-border/60 last:border-0">
                    <td className="px-6 py-3 text-foreground md:px-8">{row.label}</td>
                    <td className="px-4 py-3 text-muted">{row.owner}</td>
                    <td className="px-4 py-3 text-muted md:pe-8">{row.traveler}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.18}>
        <div className="mt-16 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.entryRitual.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {page.entryRitual.body}
          </p>
          <div className="mt-6">
            <FlowSteps steps={page.entryRitual.steps} />
          </div>
          <div className="mt-8 rounded-xl border border-border/80 bg-background/30 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">
              {locale === "ar" ? "أمثلة على الأسئلة" : "Sample questions"}
            </h3>
            <ul className="mt-4 space-y-2">
              {page.entryRitual.sampleQuestions.map((question) => (
                <li
                  key={question}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mt-16 rounded-2xl border border-[var(--border-gold)] bg-surface/30 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.replay.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {page.replay.body}
          </p>
          <div className="mt-6">
            <FlowSteps steps={page.replay.steps} />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.22}>
        <div className="mt-16 rounded-2xl border border-border bg-surface/50 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.rewards.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            {page.rewards.body}
          </p>
          <ul className="mt-5 space-y-2">
            {page.rewards.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 text-sm leading-relaxed text-muted"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.24}>
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.worldLinks.title}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {page.worldLinks.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-surface/40 p-5"
              >
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.26}>
        <div className="mt-16 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {page.faq.title}
          </h2>
          <div className="mt-6 space-y-3">
            {page.faq.items.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-border/80 bg-background/30 px-4 py-3 open:bg-background/50"
              >
                <summary className="cursor-pointer list-none font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {item.question}
                    <span className="text-gold transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.28}>
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
