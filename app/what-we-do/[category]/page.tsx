import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { ProductGrid } from "@/components/sections/ProductCard";
import { Cta } from "@/components/sections/Cta";
import { CATEGORIES, CATEGORY_BY_SLUG, type CategorySlug } from "@/lib/content/taxonomy";
import { productsByCategory } from "@/lib/content/products";
import { CLIENT_WORK } from "@/lib/content/client-work";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORY_BY_SLUG[category as CategorySlug];
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.tagline,
    openGraph: { title: `${cat.name} | Azkashine`, description: cat.tagline },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = CATEGORY_BY_SLUG[category as CategorySlug];
  if (!cat) notFound();

  const products = productsByCategory(cat.slug);
  const work = CLIENT_WORK.filter((w) => w.category === cat.slug);

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title={cat.name}
        lede={cat.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "What we do", href: "/what-we-do/" },
          { label: cat.name },
        ]}
      />

      <section aria-labelledby="capabilities-heading" className="py-16 lg:py-24">
        <Container>
          <Media
            name={cat.image}
            alt=""
            ratio="3/2"
            priority
            className="mb-12 !aspect-[21/9]"
            sizes="100vw"
          />
          <h2
            id="capabilities-heading"
            className="text-2xl font-bold text-ink sm:text-3xl lg:text-[36px]"
          >
            Capabilities
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-2">
            {cat.capabilities.map((c) => (
              <article
                key={c.title}
                className="rounded-[20px] border border-white bg-white p-7 shadow-[0_4px_24px_#E2E9F8]"
              >
                <h3 className="text-xl font-bold text-ink">{c.title}</h3>
                <p className="mt-1 text-sm font-medium text-brand">{c.descriptor}</p>
                <p className="mt-3 text-base leading-relaxed text-muted">{c.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {products.length > 0 && (
        <section
          aria-labelledby="category-products-heading"
          className="bg-surface-2 py-16 lg:py-24"
        >
          <Container>
            <h2
              id="category-products-heading"
              className="text-2xl font-bold text-ink sm:text-3xl lg:text-[36px]"
            >
              Products in this practice
            </h2>
            <div className="mt-8 lg:mt-10">
              <ProductGrid products={products} />
            </div>
          </Container>
        </section>
      )}

      {work.length > 0 && (
        <section aria-labelledby="client-work-heading" className="py-16 lg:py-24">
          <Container>
            <div className="max-w-3xl">
              <h2
                id="client-work-heading"
                className="text-2xl font-bold text-ink sm:text-3xl lg:text-[36px]"
              >
                Platforms we have built
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted lg:text-lg">
                Delivered client platforms, not products in our own line.
              </p>
            </div>
            <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-2">
              {work.map((w) => (
                <article
                  key={w.title}
                  className="rounded-[20px] border border-border bg-white p-7"
                >
                  <h3 className="text-xl font-bold text-ink">{w.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {w.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {w.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <Cta />
    </>
  );
}
