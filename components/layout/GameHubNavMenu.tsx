"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GameHubGameCard } from "@/components/game-hub/GameHubGameCard";
import { useLocale, useSiteContent } from "@/components/providers/LocaleProvider";
import { resolveGameHubGames } from "@/lib/game-hub";

type GameHubNavMenuProps = {
  hubHref: string;
  label: string;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function GameHubNavMenu({
  hubHref,
  label,
  variant = "desktop",
  onNavigate,
}: GameHubNavMenuProps) {
  const locale = useLocale();
  const gameHub = useSiteContent().gameHub;
  const games = resolveGameHubGames(locale, gameHub.games);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "desktop" || !open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [open, variant]);

  if (variant === "mobile") {
    return (
      <div className="space-y-3 border-b border-border/60 pb-4">
        <Link
          href={hubHref}
          className="text-sm font-semibold text-gold"
          onClick={onNavigate}
        >
          {label}
        </Link>
        <div className="space-y-2 ps-2">
          {games.map((game) => (
            <div key={game.id}>
              <p className="text-sm font-medium text-foreground">{game.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">
                {game.summary}
              </p>
              {game.href ? (
                <Link
                  href={game.href}
                  className="mt-1 inline-block text-xs font-semibold text-gold"
                  onClick={onNavigate}
                >
                  {game.cta ?? gameHub.viewCombatGuide} →
                </Link>
              ) : (
                <span className="mt-1 inline-block text-[10px] uppercase tracking-wide text-muted-dark">
                  {gameHub.inAppBadge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
      >
        {label}
        <span className="text-[10px] text-muted-dark">{open ? "▴" : "▾"}</span>
      </button>

      <div
        className={`absolute top-full z-50 mt-3 w-[min(92vw,720px)] rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-md transition ${
          open
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        } ${locale === "ar" ? "right-0" : "left-0"}`}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            {gameHub.availableGamesLabel}
          </p>
          <Link
            href={hubHref}
            className="text-xs font-semibold text-gold transition hover:text-gold-light"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            {label} →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {games.map((game) => (
            <GameHubGameCard
              key={game.id}
              game={game}
              inAppBadge={gameHub.inAppBadge}
              viewCombatGuide={gameHub.viewCombatGuide}
              compact
            />
          ))}
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-muted-dark">
          {gameHub.questsNote}
        </p>
      </div>
    </div>
  );
}
