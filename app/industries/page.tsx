import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Cta } from "@/components/sections/Cta";
import { INDUSTRIES } from "@/lib/content/industries";
import { getProduct } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Telecom, public sector, manufacturing, and energy — the sectors Azkashine builds and operates software for.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        title="Industries"
        lede="Four sectors where operational complexity is high and the cost of getting software wrong is measured in more than money."
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />

      {INDUSTRIES.map((industry, index) => (
        <section
          key={industry.slug}
          id={industry.slug}
          aria-labelledby={`${industry.slug}-heading`}
          className={
            index % 2 === 1
              ? "scroll-mt-24 bg-surface-2 py-16 lg:py-20"
              : "scroll-mt-24 py-16 lg:py-20"
          }
        >
          <Container>
            {/* Image and copy swap sides on alternate rows so the four sections read as
                a rhythm rather than four identical blocks. */}
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Media
                name={industry.image}
                alt=""
                ratio="3/2"
                className={index % 2 === 1 ? "lg:order-2" : ""}
                sizes="(max-width: 1024px) 100vw, 48vw"
              />

              <div className={index % 2 === 1 ? "min-w-0 lg:order-1" : "min-w-0"}>
                <h2
                  id={`${industry.slug}-heading`}
                  className="text-3xl font-bold text-ink sm:text-4xl lg:text-[44px]"
                >
                  {industry.name}
                </h2>
                <p className="mt-3 text-lg font-medium text-brand lg:text-xl">
                  {industry.tagline}
                </p>
                <p className="mt-5 text-base leading-relaxed text-muted lg:text-lg">
                  {industry.intro}
                </p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                    Capabilities applied
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {industry.capabilities.map((c) => (
                      <li key={c} className="text-base text-ink">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/what-we-do/${industry.primaryCategory}/`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-blue-700"
                  >
                    Explore the practice
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                    Relevant products
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {industry.products.map((slug) => {
                      const product = getProduct(slug);
                      if (!product) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/products/${slug}/`}
                            className="text-base text-ink underline underline-offset-4 hover:text-brand"
                          >
                            {product.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <Cta />
    </>
  );
}
