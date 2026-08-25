import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/sections/ProductCard";
import { Cta } from "@/components/sections/Cta";
import { CATEGORIES } from "@/lib/content/taxonomy";
import { productsByCategory } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Nine platforms built and operated by Azkashine — AI analytics, financial compliance and XBRL automation, agentic AI, whistleblowing and ethics, visitor management, cloud orchestration, and blue-collar hiring.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        lede="Nine platforms, grouped by the practice they belong to. Each one is built, run, and supported by Azkashine."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      {CATEGORIES.map((cat, index) => {
        const products = productsByCategory(cat.slug);
        if (products.length === 0) return null;
        return (
          <section
            key={cat.slug}
            aria-labelledby={`${cat.slug}-products-heading`}
            className={index % 2 === 1 ? "bg-surface-2 py-16 lg:py-20" : "py-16 lg:py-20"}
          >
            <Container>
              <div className="max-w-3xl">
                <h2
                  id={`${cat.slug}-products-heading`}
                  className="text-2xl font-bold text-ink sm:text-3xl lg:text-[36px]"
                >
                  {cat.name}
                </h2>
                <p className="mt-3 text-base text-muted lg:text-lg">{cat.tagline}</p>
              </div>
              <div className="mt-8 lg:mt-10">
                <ProductGrid products={products} />
              </div>
            </Container>
          </section>
        );
      })}

      <Cta />
    </>
  );
}
