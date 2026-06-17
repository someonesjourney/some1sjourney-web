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
    const chevron = open ? "▴" : "▾";

    return (
      <div className="overflow-hidden rounded-xl border border-border/80 bg-surface/30">
        <div className="flex min-h-11 items-center gap-2 px-2">
          <Link
            href={hubHref}
            className="flex min-w-0 flex-1 items-center px-1 text-start text-sm font-semibold text-gold transition hover:text-gold-light"
            onClick={onNavigate}
          >
            {label}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-surface/80 hover:text-foreground"
            aria-expanded={open}
            aria-label={label}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="text-xs">{chevron}</span>
          </button>
        </div>

        {open ? (
          <div className="space-y-2 border-t border-border/60 px-3 py-3">
            {games.map((game) => (
              <div
                key={game.id}
                className="rounded-lg bg-background/60 px-3 py-2.5 text-start"
              >
                <p className="text-sm font-medium text-foreground">{game.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {game.summary}
                </p>
                {game.href ? (
                  <Link
                    href={game.href}
                    className="mt-2 inline-flex text-xs font-semibold text-gold"
                    onClick={onNavigate}
                  >
                    {game.cta ?? gameHub.viewCombatGuide}{" "}
                    <span aria-hidden>{locale === "ar" ? "←" : "→"}</span>
                  </Link>
                ) : (
                  <span className="mt-2 inline-flex text-[10px] text-muted-dark">
                    {gameHub.inAppBadge}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : null}
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
        } start-0`}
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
            {label}{" "}
            <span aria-hidden>{locale === "ar" ? "←" : "→"}</span>
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
