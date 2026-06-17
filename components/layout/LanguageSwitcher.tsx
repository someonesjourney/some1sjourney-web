"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, switchLocalePath, type Locale } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={`flex shrink-0 items-center gap-0.5 rounded-full border border-border p-0.5 sm:gap-1 sm:p-1 ${className}`}>
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={switchLocalePath(pathname, code as Locale)}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 py-2 text-xs font-medium transition sm:min-h-0 sm:min-w-0 sm:px-2.5 sm:py-1 sm:text-xs ${
              active
                ? "bg-gold text-background"
                : "text-muted hover:text-foreground"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {code === "ar" ? "عربي" : "EN"}
          </Link>
        );
      })}
    </div>
  );
}
