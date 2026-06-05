"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

// NOTE: placeholder testimonials from the Figma design — real content comes in the content pass.
const TESTIMONIALS = [
  {
    quote:
      "I was blown away by how complete this product is. It has everything I need, from strategy to execution.",
    name: "Mirana Marci",
    role: "3D Designer",
    avatar: "/testimonials/avatar-1.png",
  },
  {
    quote:
      "The quality of the work is amazing and I love how organized everything is. We'll definitely partner again.",
    name: "Crystal Maiden",
    role: "UI/UX Designer",
    avatar: "/testimonials/avatar-2.png",
  },
  {
    quote:
      "Working with this team transformed our operations. The AI solutions delivered real, measurable impact fast.",
    name: "Adam Carter",
    role: "Product Lead",
    avatar: "/testimonials/avatar-1.png",
  },
  {
    quote:
      "Seamless integration and outstanding support — exactly the partner we needed to scale with confidence.",
    name: "Sophia Lin",
    role: "CTO",
    avatar: "/testimonials/avatar-2.png",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 424, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="testimonials-heading" className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,640px)_1fr] lg:items-center lg:gap-16">
          {/* Left: heading + nav arrows */}
          <div>
            <h2
              id="testimonials-heading"
              className="text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[56px] lg:leading-[1.1]"
            >
              What They Say After
              <br className="hidden lg:block" /> Using Our Product
            </h2>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous testimonials"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-white text-brand shadow-sm transition-colors hover:bg-surface"
              >
                <Arrow dir="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next testimonials"
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white transition-opacity hover:opacity-90"
              >
                <Arrow dir="right" />
              </button>
            </div>
          </div>

          {/* Right: carousel */}
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="w-85 shrink-0 snap-start rounded-3xl border border-white bg-white p-7 shadow-[0_4px_24px_#E2E9F8] sm:w-100"
              >
                <Stars />
                <p className="mt-5 text-base leading-relaxed text-ink">{t.quote}</p>
                <div className="mt-6 flex items-center gap-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={72}
                    height={72}
                    className="h-18 w-18 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 text-accent-orange" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
