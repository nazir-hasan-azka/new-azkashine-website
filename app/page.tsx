import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { CapabilityGrid } from "@/components/sections/CapabilityGrid";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Cta } from "@/components/sections/Cta";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { PRODUCTS } from "@/lib/content/products";
import { INDUSTRIES } from "@/lib/content/industries";

/**
 * Home page. Kept deliberately short — the reference research found page length is not
 * correlated with authority, and the strongest comparable (Master Works) covers the same
 * ground in a third of the longest site's height.
 *
 * Section order is deliberate and set by the client: what we do, why choose us,
 * industries, then products last before the closing CTA.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <CapabilityGrid
        heading="What we do"
        lede="Three practices: the AI and automation that removes manual decisions, the platforms that run the work, and the cloud engineering and testing that keep both standing up. Twelve capabilities, and nine products built on them."
      />

      <WhyChooseUs />

      <section aria-labelledby="industries-heading" className="bg-surface-2 py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl">
            <h2
              id="industries-heading"
              className="text-3xl font-bold text-ink sm:text-4xl lg:text-[48px]"
            >
              Industries we serve
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">
              Sectors where operational complexity is high and the cost of getting software
              wrong is measured in more than money.
            </p>
          </div>

          <div className="reveal-group mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {INDUSTRIES.map((industry) => (
              <div key={industry.slug} className="flex">
              <Link
                href={`/industries/#${industry.slug}`}
                className="lift group flex-1 overflow-hidden rounded-[20px] border border-border bg-white hover:border-border-strong hover:shadow-[0_14px_38px_#E2E9F8]"
              >
                <Media
                  name={industry.image}
                  alt=""
                  card
                  ratio="3/2"
                  className="rounded-none"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ink group-hover:text-brand lg:text-2xl">
                    {industry.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {industry.tagline}
                  </p>
                </div>
              </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FeaturedProducts products={PRODUCTS} />

      <section className="pb-16 lg:pb-24">
        <Container>
          <Link
            href="/products/"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-brand transition-colors hover:text-blue-700"
          >
            See all nine products side by side
            <span aria-hidden="true" className="nudge">
              →
            </span>
          </Link>
        </Container>
      </section>

      <Cta />
    </>
  );
}
