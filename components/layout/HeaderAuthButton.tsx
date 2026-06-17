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

const btnBase =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full transition";

export function HeaderAuthButton({
  onNavigate,
  variant = "desktop",
}: HeaderAuthButtonProps) {
  const locale = useLocale();
  const copy = getSiteContent(locale).navigation.auth;
  const { user, loading, configured } = useAuth();
  const isMobile = variant === "mobile";

  const shellClass = isMobile
    ? "flex w-full flex-col gap-2.5"
    : "hidden items-center gap-1.5 md:flex lg:gap-2";

  const signInClass = `${btnBase} ${
    isMobile
      ? "border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-border-gold hover:text-gold"
      : "border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:border-border-gold hover:text-gold lg:px-3.5 lg:py-2 lg:text-sm"
  }`;

  const signUpClass = `${btnBase} ${
    isMobile
      ? "border border-[var(--border-gold)] bg-gold/10 px-4 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-background"
      : "border border-[var(--border-gold)] bg-gold/10 px-2.5 py-1.5 text-xs font-semibold text-gold hover:bg-gold hover:text-background lg:px-3.5 lg:py-2 lg:text-sm"
  }`;

  const enterWorldClass = `${btnBase} ${
    isMobile
      ? "bg-gold px-4 py-2 text-sm font-semibold text-background hover:bg-gold-light"
      : "bg-gold px-2.5 py-1.5 text-xs font-semibold text-background hover:bg-gold-light lg:px-3.5 lg:py-2 lg:text-sm"
  }`;

  const profileClass = `${
    isMobile
      ? `${btnBase} border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-border-gold hover:text-gold`
      : "shrink-0 whitespace-nowrap text-xs font-medium text-muted transition hover:text-gold lg:text-sm"
  }`;

  if (loading) {
    return (
      <span
        className={
          isMobile ? "text-sm text-muted" : "hidden h-8 w-8 md:inline-block"
        }
        aria-hidden
      />
    );
  }

  if (user?.id) {
    return (
      <div className={shellClass}>
        <Link href="/app" onClick={onNavigate} className={enterWorldClass}>
          {isMobile ? copy.enterWorld : copy.enterWorldShort}
        </Link>
        <Link
          href={localizeHref(locale, getProfileSharePath(user.id))}
          onClick={onNavigate}
          className={profileClass}
        >
          {copy.myProfile}
        </Link>
      </div>
    );
  }

  const signInHref = localizeHref(locale, "/profile");
  const signUpHref = localizeHref(locale, "/profile?auth=sign-up");

  if (!configured) {
    return (
      <div className={shellClass}>
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
    <div className={shellClass}>
      <Link href={signInHref} onClick={onNavigate} className={signInClass}>
        {copy.signIn}
      </Link>
      <Link href={signUpHref} onClick={onNavigate} className={signUpClass}>
        {copy.signUp}
      </Link>
    </div>
  );
}
