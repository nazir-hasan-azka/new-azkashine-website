import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/content/site";

/**
 * The "sample it" slot that closes every product page.
 *
 * `demoUrl` is null for every product today, so this falls back to contact. When a live
 * sample exists, setting `demoUrl` in lib/content/products.ts is the only change needed.
 */
export function ProductCta({
  productName,
  demoUrl,
}: {
  productName: string;
  demoUrl: string | null;
}) {
  return (
    <section aria-labelledby="product-cta-heading" className="py-16 lg:py-24">
      <Container>
        <div className="rounded-[24px] bg-blue-900 px-8 py-12 text-white lg:px-14 lg:py-16">
          <div className="max-w-4xl">
            <h2
              id="product-cta-heading"
              className="text-3xl font-bold leading-tight lg:text-[40px]"
            >
              See {productName} in action
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              We&rsquo;ll walk you through {productName} against a problem you actually
              have, and tell you plainly whether it fits.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              {demoUrl && (
                <a
                  href={demoUrl}
                  className="btn-motion inline-flex h-12 items-center justify-center rounded-md bg-brand-light px-7 text-base font-semibold text-ink hover:opacity-90"
                >
                  Try {productName}
                </a>
              )}
              <Link
                href="/contact/"
                className={
                  demoUrl
                    ? "btn-motion inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-7 text-base font-semibold text-white hover:bg-white/10"
                    : "btn-motion inline-flex h-12 items-center justify-center rounded-md bg-brand-light px-7 text-base font-semibold text-ink hover:opacity-90"
                }
              >
                Request a demo
              </Link>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                  `${productName} enquiry`,
                )}`}
                className="text-base font-medium text-white/75 underline underline-offset-4 transition-colors hover:text-white"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
