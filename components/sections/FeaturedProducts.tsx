"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/content/products";
import { CATEGORY_BY_SLUG } from "@/lib/content/taxonomy";

/**
 * All nine products, one at a time.
 *
 * Every slide is mounted in a flex track that slides horizontally, so the motion is
 * direction-aware — advancing pushes left, going back pushes right — rather than the
 * fade it used to be, which read the same whichever way you went. The copy inside the
 * active slide then staggers up, so the eye lands on the name before the paragraph.
 *
 * Because all nine slides stay in the DOM as real links (translated, never hidden),
 * search engines see the whole product line even though one is visible.
 *
 * Hand-built: no carousel dependency, consistent with the rest of the site.
 */

const AUTOPLAY_MS = 7000;

export function FeaturedProducts({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const count = products.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Keyboard
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
    }
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [index, go]);

  // Autoplay — stops on hover, focus, hidden tab, or reduced-motion preference.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section aria-labelledby="featured-heading" className="bg-surface-2 py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <h2
              id="featured-heading"
              className="text-3xl font-bold text-ink sm:text-4xl lg:text-[48px]"
            >
              Our products
            </h2>
            <p className="mt-4 max-w-5xl text-lg leading-relaxed text-muted lg:text-xl">
              Nine platforms built and operated by Azkashine — financial compliance,
              agentic AI, analytics, whistleblowing, visitor management, cloud
              provisioning, and blue-collar hiring.
            </p>
          </div>
          <p className="shrink-0 font-mono text-sm text-muted">
            <span className="text-2xl font-bold text-ink">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mx-1">/</span>
            {String(count).padStart(2, "0")}
          </p>
        </div>

        <div
          ref={regionRef}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Products"
          className="mt-10 focus-visible:outline-none lg:mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
            touchX.current = null;
          }}
        >
          <div className="overflow-hidden rounded-3xl">
            <div
              className="slide-track flex"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {products.map((p, i) => {
                const category = CATEGORY_BY_SLUG[p.category];
                const active = i === index;
                return (
                  <article
                    key={p.slug}
                    data-slide
                    data-active={active}
                    aria-hidden={!active}
                    className="w-full shrink-0 px-px"
                  >
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                      <div className="min-w-0">
                        {p.image && (
                          <Media
                            name={p.image}
                            alt=""
                            ratio="3/2"
                            sizes="(max-width: 1024px) 100vw, 48vw"
                          />
                        )}
                      </div>

                      <div className="slide-copy min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                          {category.name}
                        </p>
                        <h3 className="mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-[40px]">
                          {p.name}
                        </h3>
                        <p className="mt-3 text-lg font-medium text-brand lg:text-xl">
                          {p.tagline}
                        </p>
                        <p className="mt-5 text-base leading-relaxed text-muted lg:text-lg">
                          {p.summary}
                        </p>
                        <Link
                          href={`/products/${p.slug}/`}
                          tabIndex={active ? 0 : -1}
                          className="mt-7 inline-flex items-center gap-1.5 text-base font-semibold text-brand transition-colors hover:text-blue-700"
                        >
                          Explore {p.name}
                          <span aria-hidden="true" className="nudge">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Track + controls */}
          <div className="mt-10 flex items-center gap-5">
            <ul className="flex flex-1 flex-wrap items-center gap-1.5">
              {products.map((p, i) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show ${p.name}`}
                    aria-current={i === index ? "true" : undefined}
                    title={p.name}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index
                        ? "w-10 bg-ink"
                        : "w-5 bg-border-strong hover:bg-ink/40",
                    )}
                  />
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous product"
                className="grid h-11 w-11 place-items-center rounded-full border border-border-strong bg-white text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next product"
                className="grid h-11 w-11 place-items-center rounded-full border border-brand bg-brand text-white transition-opacity hover:opacity-90"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
