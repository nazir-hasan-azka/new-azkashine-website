import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HeroCanvas } from "@/components/sections/HeroCanvas";

/**
 * Full-viewport dark hero with the navbar sitting transparently on top of it.
 *
 * Modelled on the reference site's opening: atmosphere first, text second. The previous
 * hero was white with black type and thin cyan lines, which read as a document rather
 * than an entrance.
 */
export function Hero() {
  return (
    // -mt-20 pulls the hero up behind the sticky 80px header so the canvas runs edge to
    // edge and the transparent nav sits *on* it. Without this the header keeps its own
    // band at the top and white nav text lands on the light page background.
    <section className="relative isolate -mt-20 flex min-h-svh items-center overflow-hidden pt-20">
      <HeroCanvas className="absolute inset-0 -z-10 h-full w-full" />

      {/* Darkens the lower-left so the copy always has contrast, whatever the canvas
          happens to be doing behind it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,11,28,0.92)_0%,rgba(5,11,28,0.72)_38%,rgba(5,11,28,0.15)_70%,transparent_100%)]"
      />

      <Container>
        <div className="max-w-5xl py-16 lg:py-20">
          {/* Forced to two lines from sm up: line 1 the promise, line 2 the mechanism.
              Mobile wraps naturally. */}
          <h1 className="text-[2.6rem] font-semibold leading-[1.08] text-white sm:text-[3.4rem] lg:text-[4.25rem]">
            Transform your business with
            <br className="hidden sm:block" />{" "}
            <span className="whitespace-nowrap font-bold text-brand">AI-powered</span>{" "}
            intelligence
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70 lg:text-xl">
            We build intelligent systems, automation workflows, and AI agents that
            streamline operations, reduce costs, and unlock exponential growth.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/products/"
              className="btn-motion inline-flex h-13 items-center justify-center rounded-md bg-brand-light px-8 text-lg font-semibold text-ink hover:opacity-90"
            >
              Explore our products
            </Link>
            <Link
              href="/contact/"
              className="btn-motion inline-flex h-13 items-center justify-center rounded-md border border-white/25 px-8 text-lg font-semibold text-white hover:bg-white/10"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
