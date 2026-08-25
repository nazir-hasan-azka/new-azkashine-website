import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { CATEGORIES } from "@/lib/content/taxonomy";

/**
 * The three-bucket taxonomy from deck p4, rendered as the site's central navigational
 * object. Appears on the home page and on /what-we-do.
 */
export function CapabilityGrid({
  heading,
  lede,
  headingId = "capabilities-heading",
}: {
  heading: string;
  lede?: string;
  headingId?: string;
}) {
  return (
    <section aria-labelledby={headingId} className="py-16 lg:py-24">
      <Container>
        <div>
          <h2
            id={headingId}
            className="text-3xl font-bold text-ink sm:text-4xl lg:text-[48px]"
          >
            {heading}
          </h2>
          {lede && (
            <p className="mt-4 max-w-5xl text-lg leading-relaxed text-muted lg:text-xl">{lede}</p>
          )}
        </div>

        {/* The reveal wrapper and the lifting card must be separate elements: a
            scroll-driven animation with `both` fill holds `transform: none`, and
            animations outrank normal declarations, so hover transforms on the same
            node would never apply. */}
        <div className="reveal-group mt-10 grid gap-6 lg:mt-14 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.slug} className="flex">
            <article
              className="lift group relative flex w-full flex-col overflow-hidden rounded-[20px] border border-white bg-white shadow-[0_4px_24px_#E2E9F8] hover:border-border-strong hover:shadow-[0_14px_38px_#D3E7FE]"
            >
              <Media
                name={cat.image}
                alt=""
                card
                ratio="16/9"
                className="rounded-none"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="flex flex-1 flex-col p-7">
              <h3 className="text-2xl font-bold text-ink lg:text-[28px]">{cat.name}</h3>
              <p className="mt-2 text-base leading-snug text-muted">{cat.tagline}</p>

              <ul className="mt-6 flex-1 space-y-4 border-t border-border pt-6">
                {cat.capabilities.map((c) => (
                  <li key={c.title}>
                    <span className="block text-base font-semibold text-ink">
                      {c.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {c.descriptor}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/what-we-do/${cat.slug}/`}
                className="mt-7 inline-flex items-center gap-1.5 text-base font-semibold text-brand transition-colors after:absolute after:inset-0 hover:text-blue-700 focus-visible:outline-none"
              >
                Explore {cat.navLabel}
                <span aria-hidden="true" className="nudge">
                  →
                </span>
              </Link>
              </div>
            </article>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
