import Link from "next/link";
import { Media } from "@/components/ui/Media";
import type { Product } from "@/lib/content/products";
import { CATEGORY_BY_SLUG } from "@/lib/content/taxonomy";

export function ProductCard({ product }: { product: Product }) {
  const category = CATEGORY_BY_SLUG[product.category];

  return (
    <article className="lift group flex w-full flex-col overflow-hidden rounded-[20px] border border-white bg-white shadow-[0_4px_24px_#E2E9F8] hover:border-border-strong hover:shadow-[0_14px_38px_#D3E7FE]">
      {product.image && (
        <Media
          name={product.image}
          alt=""
          card
          ratio="16/9"
          className="rounded-none"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      <div className="flex flex-1 flex-col p-7">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand">
        {category.name}
      </p>
      <h3 className="mt-3 text-2xl font-bold text-ink">
        <Link
          href={`/products/${product.slug}/`}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {product.name}
        </Link>
      </h3>
      <p className="mt-2 text-base leading-snug text-ink">{product.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {product.summary}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-brand transition-colors group-hover:text-blue-700">
        Learn more
        <span aria-hidden="true" className="nudge">
          →
        </span>
      </span>
      </div>
    </article>
  );
}

/** Grid wrapper — `relative` is needed for ProductCard's full-card link overlay. */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="reveal-group grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <div key={p.slug} className="relative flex">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
