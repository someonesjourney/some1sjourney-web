import { localizeHref, type Locale } from "@/lib/i18n";
import type { SiteContent } from "@/lib/i18n/types";

export type ResolvedGameHubGame =
  SiteContent["gameHub"]["games"][number] & {
    href?: string;
  };

export function resolveGameHubGames(
  locale: Locale,
  games: SiteContent["gameHub"]["games"],
): ResolvedGameHubGame[] {
  return games.map((game) => ({
    ...game,
    href: game.href ? localizeHref(locale, game.href) : undefined,
  }));
}
