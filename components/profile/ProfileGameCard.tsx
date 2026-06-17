import Image from "next/image";
import type { ProfileCardStat } from "@/lib/user-profile";
import {
  COMBAT_STAT_MAX,
  statBarPercent,
} from "@/lib/supabase/fetch-profile-cards";

type ProfileGameCardProps = {
  card: ProfileCardStat;
  labels: {
    power: string;
    attack: string;
    defend: string;
    identityBadge: string;
  };
  highlight?: boolean;
  compact?: boolean;
};

export function ProfileGameCard({
  card,
  labels,
  highlight = false,
  compact = false,
}: ProfileGameCardProps) {
  const attackPct = statBarPercent(card.attack);
  const defendPct = statBarPercent(card.defend);

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border bg-surface/60 backdrop-blur-sm transition ${
        highlight
          ? "border-[var(--border-gold)] shadow-[0_0_32px_rgba(212,175,55,0.12)]"
          : "border-border hover:border-border-gold/60"
      }`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border/80 px-4 py-3">
        <p className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
          {card.role}
        </p>
        {card.isIdentity ? (
          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
            {labels.identityBadge}
          </span>
        ) : (
          <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
            {card.rarity.replace(/_/g, " ")}
          </span>
        )}
      </div>

      <div className="relative aspect-[2/3] w-full overflow-hidden bg-background-secondary">
        <Image
          src={card.imageUrl}
          alt={card.name}
          fill
          sizes="(max-width: 768px) 45vw, 280px"
          className={`object-contain object-center ${compact ? "p-1.5" : "p-2"}`}
        />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">{card.name}</h3>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-dark">
            {card.cardId}
          </p>
        </div>

        <div className="space-y-2">
          <StatBar
            label={labels.attack}
            value={card.attack}
            percent={attackPct}
            max={COMBAT_STAT_MAX}
            tone="attack"
          />
          <StatBar
            label={labels.defend}
            value={card.defend}
            percent={defendPct}
            max={COMBAT_STAT_MAX}
            tone="defend"
          />
        </div>

        {card.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-[10px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function StatBar({
  label,
  value,
  percent,
  max,
  tone,
}: {
  label: string;
  value: number;
  percent: number;
  max: number;
  tone: "attack" | "defend";
}) {
  const fillClass = tone === "attack" ? "bg-gold" : "bg-accent";

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-muted">{label}</span>
        <span className="font-semibold tabular-nums text-foreground">
          {value}/{max}
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-background-secondary"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${fillClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
