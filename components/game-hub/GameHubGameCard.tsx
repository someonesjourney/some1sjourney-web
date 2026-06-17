import Link from "next/link";
import type { ResolvedGameHubGame } from "@/lib/game-hub";

type GameHubGameCardProps = {
  game: ResolvedGameHubGame;
  inAppBadge: string;
  viewCombatGuide?: string;
  compact?: boolean;
};

export function GameHubGameCard({
  game,
  inAppBadge,
  viewCombatGuide,
  compact = false,
}: GameHubGameCardProps) {
  const badge = game.href ? game.badge : inAppBadge;
  const ctaLabel = game.href ? (game.cta ?? viewCombatGuide) : undefined;

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-surface/40 p-5 transition ${
        game.featured
          ? "border-[var(--border-gold)] shadow-[0_0_32px_rgba(212,175,55,0.1)]"
          : "border-border hover:border-border-gold/50"
      } ${compact ? "p-4" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-semibold text-foreground ${compact ? "text-sm" : "text-lg"}`}
        >
          {game.title}
        </h3>
        {badge ? (
          <span className="shrink-0 rounded-full border border-border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
            {badge}
          </span>
        ) : null}
      </div>
      <p
        className={`mt-2 flex-1 leading-relaxed text-muted ${
          compact ? "text-xs" : "text-sm"
        }`}
      >
        {game.summary}
      </p>
      {game.href && ctaLabel ? (
        <Link
          href={game.href}
          className={`mt-4 inline-flex text-sm font-semibold text-gold transition hover:text-gold-light ${
            compact ? "text-xs" : ""
          }`}
        >
          {ctaLabel} →
        </Link>
      ) : null}
    </article>
  );
}
