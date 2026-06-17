import Link from "next/link";
import type { ReactNode } from "react";
import { GradientBackground } from "./GradientBackground";

type ContentPageLayoutProps = {
  label?: string;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "default" | "wide";
};

export function ContentPageLayout({
  label,
  title,
  description,
  children,
  size = "default",
}: ContentPageLayoutProps) {
  const maxWidth = size === "wide" ? "max-w-6xl" : "max-w-4xl";

  return (
    <div className="relative overflow-hidden">
      <GradientBackground />
      <div className={`relative mx-auto ${maxWidth} px-6 py-24 md:py-32`}>
        {label ? (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {label}
          </p>
        ) : null}
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
}

export function CTAButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const classes =
    variant === "primary"
      ? "bg-gold text-background hover:bg-gold-light"
      : "border border-border text-foreground hover:border-border-gold hover:text-gold";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${classes}`}
    >
      {children}
    </Link>
  );
}
