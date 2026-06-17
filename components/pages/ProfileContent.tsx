"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProfileAuthPanel } from "@/components/profile/ProfileAuthPanel";
import { ProfileGameCard } from "@/components/profile/ProfileGameCard";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { useLocale } from "@/components/providers/LocaleProvider";
import { EXPO_GO_URL, getSiteContent, localizeHref, SITE_URL } from "@/lib/i18n";
import {
  getProfileExpoDeepLink,
  getProfileSharePath,
  type UserProfile,
} from "@/lib/user-profile";

type ProfileContentProps = {
  profile: UserProfile | null;
  userId: string | null;
  notFound?: boolean;
  unconfigured?: boolean;
  loading?: boolean;
};

export function ProfileContent({
  profile,
  userId,
  notFound = false,
  unconfigured = false,
  loading = false,
}: ProfileContentProps) {
  const locale = useLocale();
  const copy = getSiteContent(locale).profile;
  const reduceMotion = useReducedMotion();

  if (loading) {
    return <ProfileLoadingState copy={copy} />;
  }

  if (unconfigured) {
    return <ProfileUnconfigured copy={copy} locale={locale} />;
  }

  if (!userId) {
    return <ProfileEmptyState copy={copy} locale={locale} />;
  }

  if (notFound || !profile) {
    return <ProfileNotFound copy={copy} locale={locale} />;
  }

  return (
    <ProfileView
      profile={profile}
      copy={copy}
      locale={locale}
      reduceMotion={reduceMotion ?? false}
    />
  );
}

function ProfileLoadingState({
  copy,
}: {
  copy: ReturnType<typeof getSiteContent>["profile"];
}) {
  return (
    <div className="relative min-h-[60vh] overflow-hidden py-24">
      <GradientBackground />
      <div className="relative mx-auto max-w-lg px-6 text-center">
        <div className="mx-auto h-10 w-10 animate-pulse rounded-full border-2 border-gold/30 border-t-gold" />
        <h1 className="mt-6 text-2xl font-semibold text-foreground">{copy.loading.title}</h1>
        <p className="mt-3 text-sm text-muted">{copy.loading.description}</p>
      </div>
    </div>
  );
}

function ProfileUnconfigured({
  copy,
  locale,
}: {
  copy: ReturnType<typeof getSiteContent>["profile"];
  locale: ReturnType<typeof useLocale>;
}) {
  return (
    <div className="relative min-h-[60vh] overflow-hidden py-24">
      <GradientBackground />
      <div className="relative mx-auto max-w-lg px-6 text-center">
        <h1 className="text-3xl font-semibold text-foreground">{copy.unconfigured.title}</h1>
        <p className="mt-4 text-muted">{copy.unconfigured.description}</p>
        <Link
          href={localizeHref(locale, "/download")}
          className="mt-8 inline-flex rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-border-gold hover:text-gold"
        >
          {copy.unconfigured.downloadLabel}
        </Link>
      </div>
    </div>
  );
}

function ProfileEmptyState({
  copy,
  locale,
}: {
  copy: ReturnType<typeof getSiteContent>["profile"];
  locale: ReturnType<typeof useLocale>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mt-8 h-40 animate-pulse rounded-xl border border-border bg-surface/40" />
      }
    >
      <ProfileEmptyStateContent copy={copy} locale={locale} />
    </Suspense>
  );
}

function ProfileEmptyStateContent({
  copy,
  locale,
}: {
  copy: ReturnType<typeof getSiteContent>["profile"];
  locale: ReturnType<typeof useLocale>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [journeyId, setJourneyId] = useState("");

  const authParam = searchParams.get("auth")?.toLowerCase();
  const initialMode =
    authParam === "sign-up" || authParam === "signup" || authParam === "register"
      ? "signUp"
      : "signIn";

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const id = journeyId.trim();
    if (!id) return;
    router.push(localizeHref(locale, getProfileSharePath(id)));
  }

  function handleSignedIn() {
    router.refresh();
  }

  return (
    <div className="relative min-h-[80vh] overflow-hidden py-24">
      <GradientBackground />
      <div className="relative mx-auto max-w-lg px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {copy.label}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {copy.empty.title}
        </h1>
        <p className="mt-4 text-muted">{copy.empty.description}</p>

        <ProfileAuthPanel onSignedIn={handleSignedIn} initialMode={initialMode} />

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-muted-dark">
          {copy.empty.divider}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 text-left rtl:text-right">
          <label
            htmlFor="journey-id"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {copy.empty.inputLabel}
          </label>
          <input
            id="journey-id"
            type="text"
            value={journeyId}
            onChange={(e) => setJourneyId(e.target.value)}
            placeholder={copy.empty.inputPlaceholder}
            className="w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-foreground outline-none transition focus:border-border-gold focus:ring-1 focus:ring-gold/30"
            autoComplete="off"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-gold py-3 text-sm font-semibold text-background transition hover:bg-gold-light"
          >
            {copy.empty.submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}

function ProfileNotFound({
  copy,
  locale,
}: {
  copy: ReturnType<typeof getSiteContent>["profile"];
  locale: ReturnType<typeof useLocale>;
}) {
  return (
    <div className="relative min-h-[60vh] overflow-hidden py-24">
      <GradientBackground />
      <div className="relative mx-auto max-w-lg px-6 text-center">
        <h1 className="text-3xl font-semibold text-foreground">{copy.notFound.title}</h1>
        <p className="mt-4 text-muted">{copy.notFound.description}</p>
        <Link
          href={localizeHref(locale, "/profile")}
          className="mt-8 inline-flex rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-border-gold hover:text-gold"
        >
          {copy.notFound.backLabel}
        </Link>
      </div>
    </div>
  );
}

function ProfileView({
  profile,
  copy,
  locale,
  reduceMotion,
}: {
  profile: UserProfile;
  copy: ReturnType<typeof getSiteContent>["profile"];
  locale: ReturnType<typeof useLocale>;
  reduceMotion: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${SITE_URL}${localizeHref(locale, getProfileSharePath(profile.id))}`;
  const expoDeepLink = getProfileExpoDeepLink(profile.id);

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profile.name} — Some1sJourney`,
          url: shareUrl,
        });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // User cancelled share or clipboard blocked
    }
  }

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 } as const,
        animate: { opacity: 1, y: 0 } as const,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  function delayed(delay: number) {
    if (reduceMotion) return {};
    return {
      ...motionProps,
      transition: { ...motionProps.transition, delay },
    };
  }

  return (
    <div className="relative overflow-hidden pb-24 pt-28">
      <GradientBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div {...delayed(0)} className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {copy.label}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {copy.journeyId}:{" "}
              <span className="break-all text-foreground">{profile.id}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-border-gold hover:text-gold"
            >
              {copied ? copy.actions.copied : copy.actions.share}
            </button>
            <a
              href={EXPO_GO_URL || expoDeepLink}
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-gold-light"
            >
              {copy.actions.openInApp}
            </a>
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[280px_1fr] xl:items-start">
          <motion.div {...delayed(0.1)} className="w-full max-w-[280px]">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              {copy.sections.identity}
            </p>
            <ProfileGameCard
              card={{
                cardId: profile.identityCard.cardId || String(profile.identityCard.id),
                name: profile.identityCard.name,
                imageUrl: profile.identityCard.imageUrl,
                rarity: profile.identityCard.rarity,
                role: profile.identityCard.role,
                power: profile.identityCard.power,
                defend: profile.identityCard.defend,
                attack: profile.identityCard.attack,
                tags: profile.identityCard.tags,
                isIdentity: true,
              }}
              labels={copy.cardStats}
              highlight
            />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.identityCard.archetype}
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div {...delayed(0.15)} className="grid gap-4 sm:grid-cols-3">
              <StatCard
                label={copy.sections.level}
                value={`${copy.levelPrefix} ${profile.level}`}
              />
              <StatCard
                label={copy.sections.pts}
                value={profile.pts.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")}
                accent
              />
              <StatCard
                label={copy.sections.season}
                value={profile.season.name}
                sub={profile.season.stage}
              />
            </motion.div>

            <motion.div {...delayed(0.2)} className="rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                {copy.sections.tribe}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-foreground">
                {profile.tribe.name}
              </h3>
              <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-muted-dark">{copy.tribeLabels.role}</dt>
                  <dd className="mt-1 text-sm text-foreground">{profile.tribe.role}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-dark">{copy.tribeLabels.members}</dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {profile.tribe.memberCount.toLocaleString(
                      locale === "ar" ? "ar-EG" : "en-US",
                    )}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs text-muted-dark">{copy.tribeLabels.pattern}</dt>
                  <dd className="mt-1 text-sm text-muted">{profile.tribe.collectivePattern}</dd>
                </div>
              </dl>
            </motion.div>

            <motion.div {...delayed(0.22)}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                {copy.sections.myCards}
              </p>
              {profile.ownedCards.filter((card) => !card.isIdentity).length === 0 ? (
                <p className="text-sm text-muted">{copy.emptyMyCards}</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {profile.ownedCards
                    .filter((card) => !card.isIdentity)
                    .map((card) => (
                    <ProfileGameCard
                      key={card.cardId}
                      card={card}
                      labels={copy.cardStats}
                      compact
                      highlight={card.isIdentity}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div {...delayed(0.25)}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                {copy.sections.memories}
              </p>
              {profile.memories.length === 0 ? (
                <p className="text-sm text-muted">{copy.emptyMemories}</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {profile.memories.map((memory, index) => (
                    <div
                      key={memory.id}
                      className="rounded-xl border border-border bg-surface/40 p-5 transition hover:border-border-gold/50"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <p className="text-xs text-muted-dark">{memory.earnedAt}</p>
                      <h4 className="mt-2 font-semibold text-foreground">{memory.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {memory.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              {...delayed(0.3)}
              className="rounded-2xl border border-[var(--border-gold)] bg-gradient-to-br from-surface/80 to-background-secondary p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                {copy.sections.season}
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {profile.season.name} — {profile.season.stage}
              </p>
              <p className="mt-3 text-sm text-muted">{copy.actions.viewInApp}</p>
              <Link
                href={localizeHref(locale, "/download")}
                className="mt-4 inline-flex text-sm text-gold hover:text-gold-light"
              >
                {getSiteContent(locale).ctas.enterJourney.label}{" "}
                <span aria-hidden>{locale === "ar" ? "←" : "→"}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/50 p-5 text-center backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-dark">
        {label}
      </p>
      <p
        className={`mt-2 text-2xl font-semibold ${accent ? "text-gold" : "text-foreground"}`}
      >
        {value}
      </p>
      {sub ? <p className="mt-1 text-xs text-muted">{sub}</p> : null}
    </div>
  );
}
