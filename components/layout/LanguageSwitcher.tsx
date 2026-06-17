"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, switchLocalePath, type Locale } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-1 rounded-full border border-border p-1 ${className}`}>
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={switchLocalePath(pathname, code as Locale)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
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
