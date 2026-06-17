"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getSiteContent, localizeHref } from "@/lib/i18n";
import { getProfileSharePath } from "@/lib/user-profile";

type HeaderAuthButtonProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function HeaderAuthButton({
  onNavigate,
  variant = "desktop",
}: HeaderAuthButtonProps) {
  const locale = useLocale();
  const copy = getSiteContent(locale).navigation.auth;
  const { user, loading, configured } = useAuth();

  const isMobile = variant === "mobile";
  const containerClass = isMobile
    ? "flex w-full flex-col gap-3"
    : "hidden items-center gap-1.5 md:flex lg:gap-2";

  const signInClass = isMobile
    ? "rounded-full border border-border px-5 py-2 text-center text-sm font-medium text-foreground transition hover:border-border-gold hover:text-gold"
    : "rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-border-gold hover:text-gold lg:px-4 lg:py-2 lg:text-sm";

  const signUpClass = isMobile
    ? "rounded-full border border-[var(--border-gold)] bg-gold/10 px-5 py-2 text-center text-sm font-semibold text-gold transition hover:bg-gold hover:text-background"
    : "rounded-full border border-[var(--border-gold)] bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold transition hover:bg-gold hover:text-background lg:px-4 lg:py-2 lg:text-sm";

  const profileClass = isMobile
    ? "rounded-full border border-border px-5 py-2 text-center text-sm font-medium text-foreground transition hover:border-border-gold hover:text-gold"
    : "rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-border-gold hover:text-gold lg:px-4 lg:py-2 lg:text-sm";

  if (loading) {
    return (
      <span
        className={isMobile ? "text-sm text-muted" : "hidden text-sm text-muted md:inline"}
        aria-hidden
      >
        …
      </span>
    );
  }

  if (user?.id) {
    return (
      <Link
        href={localizeHref(locale, getProfileSharePath(user.id))}
        onClick={onNavigate}
        className={profileClass}
      >
        {copy.myProfile}
      </Link>
    );
  }

  const signInHref = localizeHref(locale, "/profile");
  const signUpHref = localizeHref(locale, "/profile?auth=sign-up");

  if (!configured) {
    return (
      <div className={containerClass}>
        <Link href={signInHref} onClick={onNavigate} className={signInClass}>
          {copy.signIn}
        </Link>
        <Link href={signUpHref} onClick={onNavigate} className={signUpClass}>
          {copy.signUp}
        </Link>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Link href={signInHref} onClick={onNavigate} className={signInClass}>
        {copy.signIn}
      </Link>
      <Link href={signUpHref} onClick={onNavigate} className={signUpClass}>
        {copy.signUp}
      </Link>
    </div>
  );
}
