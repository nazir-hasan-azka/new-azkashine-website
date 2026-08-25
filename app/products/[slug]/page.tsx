import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { StatsBand } from "@/components/ui/StatsBand";
import { Media } from "@/components/ui/Media";
import { ProductCta } from "@/components/sections/ProductCta";
import { ProductVisual, hasVisual } from "@/components/product-ui/ProductVisual";
import { PRODUCTS, getProduct } from "@/lib/content/products";
import { CATEGORY_BY_SLUG } from "@/lib/content/taxonomy";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: `${product.name} | Azkashine`,
      description: product.tagline,
    },
  };
}

/**
 * One template for all nine products. Section order is fixed — problem, what it is,
 * capabilities, outcomes, coverage, demo CTA — so the nine pages read as a product line
 * rather than nine one-offs.
 *
 * Sections with no content are omitted rather than padded.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = CATEGORY_BY_SLUG[product.category];

  return (
    <>
      <PageHeader
        eyebrow={category.name}
        title={product.name}
        lede={product.tagline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/" },
          { label: product.name },
        ]}
      />

      {product.image && (
        <Container>
          <Media
            name={product.image}
            alt=""
            ratio="16/9"
            priority
            className="!aspect-[21/9] -mt-px"
            sizes="100vw"
          />
        </Container>
      )}

      {/* The problem, before the solution — paired with the product's interface so the
          reader can see the thing being described, not just read about it. */}
      <section aria-labelledby="problem-heading" className="py-14 lg:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            {/* min-w-0: grid items default to min-width:auto and will not shrink below
                their content's min-content width, which pushes the card past the gutter
                on narrow screens. */}
            <div className="reveal min-w-0">
              <h2
                id="problem-heading"
                className="text-sm font-semibold uppercase tracking-wider text-brand"
              >
                The problem
              </h2>
              <p className="mt-4 text-xl leading-relaxed text-ink lg:text-[26px] lg:leading-[1.45]">
                {product.problem}
              </p>
              <p className="mt-8 text-base leading-relaxed text-muted lg:text-lg">
                {product.summary}
              </p>
            </div>

            {hasVisual(product.slug) && (
              <div className="reveal min-w-0 lg:pt-2">
                <ProductVisual slug={product.slug} />
                <p className="mt-3 text-xs text-muted">
                  Representative {product.name} interface.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {product.stats && product.stats.length > 0 && (
        <StatsBand stats={product.stats} tone="brand" />
      )}

      <section
        aria-labelledby="capabilities-heading"
        className="bg-surface-2 py-16 lg:py-24"
      >
        <Container>
          <h2
            id="capabilities-heading"
            className="text-2xl font-bold text-ink sm:text-3xl lg:text-[36px]"
          >
            What it does
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
            {product.features.map((f) => (
              <article
                key={f.title}
                className="rounded-[20px] border border-white bg-white p-7 shadow-[0_4px_24px_#E2E9F8]"
              >
                <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {f.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {product.outcomes.length > 0 && (
        <section aria-labelledby="outcomes-heading" className="py-16 lg:py-24">
          <Container>
            <h2
              id="outcomes-heading"
              className="text-2xl font-bold text-ink sm:text-3xl lg:text-[36px]"
            >
              Business outcomes
            </h2>
            <ul className="mt-8 grid gap-x-10 gap-y-7 lg:mt-10 lg:grid-cols-2">
              {product.outcomes.map((o) => (
                <li key={o.title} className="border-l-2 border-brand pl-5">
                  <h3 className="text-lg font-bold text-ink">{o.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-muted">
                    {o.description}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {product.coverage && (
        <section
          aria-labelledby="coverage-heading"
          className="border-y border-border bg-surface py-16 lg:py-24"
        >
          <Container>
            <h2
              id="coverage-heading"
              className="text-2xl font-bold text-ink sm:text-3xl lg:text-[36px]"
            >
              {product.coverage.heading}
            </h2>
            <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-3">
              {product.coverage.groups.map((g) => (
                <div key={g.label}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                    {g.label}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border-strong bg-white px-3.5 py-1.5 text-sm font-medium text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ProductCta productName={product.name} demoUrl={product.demoUrl} />

      <section className="pb-16 lg:pb-24">
        <Container>
          <p className="text-sm text-muted">
            Part of{" "}
            <Link
              href={`/what-we-do/${category.slug}/`}
              className="text-ink underline underline-offset-4 hover:text-brand"
            >
              {category.name}
            </Link>{" "}
            &middot; {product.capability}
          </p>
        </Container>
      </section>
    </>
  );
}
