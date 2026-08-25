import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/content/site";

/**
 * Closing call to action.
 *
 * Rebuilt to match the rest of the site: dark like the hero, so the page opens and closes
 * on the same note; sentence case like every other heading; and real buttons instead of a
 * small grey circle-arrow, which gave no indication of what it did.
 *
 * The previous copy — "Embrace the Future of AI Innovation" — was title case and said
 * nothing. This asks for the one thing we actually want: the problem.
 */
export function Cta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-blue-900"
    >
      {/* Same convergence glow as the hero, so the bookend reads deliberately. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_120%_at_75%_0%,rgba(92,194,237,0.28)_0%,rgba(33,133,248,0.10)_45%,transparent_75%)]"
      />

      <Container>
        <div className="max-w-4xl py-20 lg:py-28">
          <h2
            id="cta-heading"
            className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[52px]"
          >
            Tell us what you&rsquo;re trying to solve
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 lg:text-xl">
            Bring us the problem, not a specification. We&rsquo;ll tell you which of our
            products fits, what we&rsquo;d have to build, or whether you&rsquo;d be better
            served elsewhere.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact/"
              className="btn-motion inline-flex h-13 items-center justify-center rounded-md bg-brand-light px-8 text-lg font-semibold text-ink hover:opacity-90"
            >
              Talk to us
            </Link>
            <Link
              href="/products/"
              className="btn-motion inline-flex h-13 items-center justify-center rounded-md border border-white/25 px-8 text-lg font-semibold text-white hover:bg-white/10"
            >
              See the products
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="text-base font-medium text-white/70 underline underline-offset-4 transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
