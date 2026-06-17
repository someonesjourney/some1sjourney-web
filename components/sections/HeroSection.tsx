"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { useCta, useSiteContent } from "@/components/providers/LocaleProvider";

export function HeroSection() {
  const content = useSiteContent();
  const cta = useCta();
  const { hero, assets, worldState } = content;
  const primaryCta = cta(hero.primaryCta);
  const secondaryCta = cta(hero.secondaryCta);
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <GradientBackground />
      <div className="absolute inset-0">
        <Image
          src={assets.hero}
          alt=""
          fill
          priority
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {worldState.currentSeason.shortLabel}
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground md:text-7xl md:leading-[1.05]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-background transition hover:bg-gold-light"
            >
              {primaryCta.label}
            </Link>
            <a
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition hover:border-border-gold hover:text-gold"
            >
              {secondaryCta.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
