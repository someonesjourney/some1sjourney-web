"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FeatureSliderCards } from "@/components/ui/GuideCardArt";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getGuideCardArtCopy } from "@/lib/guideCardArt";
import { localeDirection } from "@/lib/i18n";
import type { CombatSlide } from "@/lib/i18n/types";

export type FeatureSliderSlide = CombatSlide;

type FeatureSliderProps = {
  slides: FeatureSliderSlide[];
  title?: string;
  subtitle?: string;
  cardArtContext?: "combat" | "pathOfBecoming";
  labels: {
    prev: string;
    next: string;
    goTo: string;
  };
};

const ACCENT_STYLES: Record<
  NonNullable<FeatureSliderSlide["accent"]>,
  string
> = {
  gold: "border-[var(--border-gold)] bg-gold/5 shadow-[0_0_40px_rgba(212,175,55,0.08)]",
  violet: "border-accent/40 bg-accent/5 shadow-[0_0_40px_rgba(123,47,247,0.12)]",
  crimson: "border-red-500/35 bg-red-500/5 shadow-[0_0_40px_rgba(239,68,68,0.08)]",
  emerald:
    "border-emerald-500/35 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.08)]",
};

const SWIPE_THRESHOLD = 48;

export function FeatureSlider({
  slides,
  title,
  subtitle,
  cardArtContext = "combat",
  labels,
}: FeatureSliderProps) {
  const locale = useLocale();
  const isRtl = localeDirection(locale) === "rtl";
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const cardArtCopy = useMemo(() => getGuideCardArtCopy(locale), [locale]);
  const resolveCardAlt =
    cardArtContext === "pathOfBecoming"
      ? cardArtCopy.pathOfBecoming.cardAlt
      : cardArtCopy.combat.cardAlt;
  const vsLabel = locale === "ar" ? "ضد" : "VS";

  const slideCount = slides.length;
  const activeSlide = slides[index];
  const hasSlideCards = Boolean(activeSlide?.cardIds?.length);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (slideCount === 0) return;
      setIndex(((nextIndex % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goNext = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  const goPrev = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        isRtl ? goPrev() : goNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        isRtl ? goNext() : goPrev();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, isRtl]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragStartX.current == null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD) return;

    if (delta < 0) {
      isRtl ? goPrev() : goNext();
    } else {
      isRtl ? goNext() : goPrev();
    }
  }

  if (!activeSlide) return null;

  const accent = activeSlide.accent ?? "gold";

  return (
    <section
      className="rounded-3xl border border-border/80 bg-surface/30 p-5 md:p-8"
      aria-roledescription="carousel"
      aria-label={title ?? "Feature slider"}
    >
      {(title || subtitle) && (
        <div className="mb-6 max-w-3xl">
          {title ? (
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
      )}

      <div
        className="touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={activeSlide.id}
            initial={reduceMotion ? false : { opacity: 0, x: isRtl ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: isRtl ? 24 : -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`min-h-[320px] rounded-2xl border p-6 md:min-h-[360px] md:p-8 ${ACCENT_STYLES[accent]} ${
              hasSlideCards ? "md:min-h-[380px]" : ""
            }`}
          >
            <div
              className={
                hasSlideCards
                  ? "grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_168px] xl:grid-cols-[minmax(0,1fr)_188px]"
                  : undefined
              }
            >
              <div className={hasSlideCards ? "min-w-0" : undefined}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {activeSlide.kicker}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {activeSlide.title}
                </h3>

                {hasSlideCards ? (
                  <div className="my-5 lg:hidden">
                    <FeatureSliderCards
                      cardIds={activeSlide.cardIds!}
                      layout={activeSlide.cardLayout}
                      altForId={resolveCardAlt}
                      vsLabel={vsLabel}
                    />
                  </div>
                ) : null}

                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                  {activeSlide.body}
                </p>

                {activeSlide.chips && activeSlide.chips.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeSlide.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-border-gold/50 bg-background/50 px-3 py-1 text-xs font-medium text-gold"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}

                {activeSlide.bullets && activeSlide.bullets.length > 0 ? (
                  <ul className="mt-5 space-y-2.5">
                    {activeSlide.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {hasSlideCards ? (
                <div className="hidden justify-center lg:flex lg:pt-6">
                  <FeatureSliderCards
                    cardIds={activeSlide.cardIds!}
                    layout={activeSlide.cardLayout}
                    altForId={resolveCardAlt}
                    vsLabel={vsLabel}
                  />
                </div>
              ) : null}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition hover:border-border-gold hover:text-gold"
            aria-label={labels.prev}
          >
            {isRtl ? "→" : "←"}
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition hover:border-border-gold hover:text-gold"
            aria-label={labels.next}
          >
            {isRtl ? "←" : "→"}
          </button>
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label={labels.goTo}
        >
          {slides.map((slide, slideIndex) => {
            const active = slideIndex === index;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`${labels.goTo} ${slideIndex + 1}`}
                onClick={() => goTo(slideIndex)}
                className={`h-2.5 rounded-full transition-all ${
                  active
                    ? "w-8 bg-gold"
                    : "w-2.5 bg-border hover:bg-border-gold/70"
                }`}
              />
            );
          })}
        </div>

        <p className="text-xs tabular-nums text-muted">
          {String(index + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
