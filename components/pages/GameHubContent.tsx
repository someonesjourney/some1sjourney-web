import { GameHubGameCard } from "@/components/game-hub/GameHubGameCard";
import { CTAButton, ContentPageLayout } from "@/components/ui/ContentPageLayout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { resolveGameHubGames } from "@/lib/game-hub";
import { getCta, getSiteContent, type Locale } from "@/lib/i18n";

export function GameHubContent({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const page = content.gameHub;
  const games = resolveGameHubGames(locale, page.games);
  const primaryCta = getCta(locale, page.cta.primaryCta);
  const secondaryCta = getCta(locale, page.cta.secondaryCta);

  return (
    <ContentPageLayout
      size="wide"
      label={page.label}
      title={page.title}
      description={page.description}
    >
      <ScrollReveal>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
          {page.availableGamesLabel}
        </p>
      </ScrollReveal>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game, index) => (
          <ScrollReveal key={game.id} delay={index * 0.05}>
            <GameHubGameCard
              game={game}
              inAppBadge={page.inAppBadge}
              viewCombatGuide={page.viewCombatGuide}
            />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.15}>
        <div className="mt-10 space-y-4">
          <p className="rounded-xl border border-border/80 bg-surface/40 px-4 py-3 text-sm leading-relaxed text-muted">
            {page.questsNote}
          </p>
          <p className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm leading-relaxed text-muted">
            {page.clubNote}
          </p>
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
