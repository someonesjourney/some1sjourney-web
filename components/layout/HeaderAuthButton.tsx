"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getSiteContent, localizeHref } from "@/lib/i18n";
import { getProfileSharePath } from "@/lib/user-profile";

export function HeaderAuthButton({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useLocale();
  const copy = getSiteContent(locale).navigation.auth;
  const { user, loading, configured } = useAuth();

  if (loading) {
    return (
      <span className="hidden text-sm text-muted lg:inline" aria-hidden>
        …
      </span>
    );
  }

  const href = user?.id
    ? localizeHref(locale, getProfileSharePath(user.id))
    : localizeHref(locale, "/profile");

  const label = user?.id ? copy.myProfile : copy.signIn;

  if (!configured) {
    return (
      <Link
        href={localizeHref(locale, "/profile")}
        onClick={onNavigate}
        className="hidden text-sm text-muted transition hover:text-gold lg:inline"
      >
        {copy.signIn}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="hidden rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-border-gold hover:text-gold lg:inline-flex"
    >
      {label}
    </Link>
  );
}
