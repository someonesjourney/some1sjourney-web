"use client";

import Image from "next/image";
import Link from "next/link";
import { useCta, useSiteContent } from "@/components/providers/LocaleProvider";
import { EXPO_GO_URL } from "@/lib/i18n";

type QRAccessPanelProps = {
  compact?: boolean;
};

export function QRAccessPanel({ compact = false }: QRAccessPanelProps) {
  const content = useSiteContent();
  const cta = useCta();
  const { qrPanel, access, assets } = content;
  const secondaryCta = cta(qrPanel.secondaryCta);
  const primaryCta = cta(qrPanel.primaryCta);
  const showExpoLink = Boolean(EXPO_GO_URL);

  return (
    <div
      className={`rounded-3xl border border-border bg-surface/70 p-6 backdrop-blur-sm md:p-8 ${
        compact ? "max-w-md mx-auto" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="rounded-2xl bg-white p-3 shadow-[0_0_40px_rgba(123,47,247,0.12)]">
          <Image
            src={assets.expoQr}
            alt={access.qrAlt}
            width={compact ? 160 : 200}
            height={compact ? 160 : 200}
            className="rounded-lg"
            priority
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {qrPanel.label}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">
            {qrPanel.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {qrPanel.description}
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            {showExpoLink ? (
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-light"
              >
                {primaryCta.label}
              </a>
            ) : null}
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-border-gold hover:text-gold"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
