import Link from "next/link";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Hero } from "@/components/sections/Hero";
import { CapabilityGrid } from "@/components/sections/CapabilityGrid";
import { ProductGrid } from "@/components/sections/ProductCard";
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
      <HeroBackdrop />
      <Hero />

      <CapabilityGrid
        heading="What we do"
        lede="Three practices, twelve capabilities. The same taxonomy we use internally to describe the business — because it is the one that actually reflects how the work is organised."
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

      <section aria-labelledby="products-heading" className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <h2
                id="products-heading"
                className="text-3xl font-bold text-ink sm:text-4xl lg:text-[48px]"
              >
                Our products
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">
                Nine platforms built and operated by Azkashine — from financial compliance
                automation to agentic AI, visitor management, and blue-collar hiring.
              </p>
            </div>
            <Link
              href="/products/"
              className="inline-flex items-center gap-1.5 text-base font-semibold text-brand transition-colors hover:text-blue-700"
            >
              All products
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-10 lg:mt-14">
            <ProductGrid products={PRODUCTS} />
          </div>
        </Container>
      </section>

      <Cta />
    </>
  );
}
