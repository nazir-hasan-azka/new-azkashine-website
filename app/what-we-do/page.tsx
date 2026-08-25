import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Cta } from "@/components/sections/Cta";
import { CATEGORIES } from "@/lib/content/taxonomy";
import { productsByCategory } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "Twelve capabilities across three practices: AI & Automation, Digital Platforms, and Cloud Services & Testing.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHeader
        title="What we do"
        lede="Three practices, twelve capabilities — and the products built on top of them."
        crumbs={[{ label: "Home", href: "/" }, { label: "What we do" }]}
      />

      {CATEGORIES.map((cat, index) => {
        const products = productsByCategory(cat.slug);
        return (
          <section
            key={cat.slug}
            aria-labelledby={`${cat.slug}-heading`}
            className={index % 2 === 1 ? "bg-surface-2 py-16 lg:py-24" : "py-16 lg:py-24"}
          >
            <Container>
              <div className="max-w-5xl">
                <h2
                  id={`${cat.slug}-heading`}
                  className="text-3xl font-bold text-ink sm:text-4xl lg:text-[44px]"
                >
                  {cat.name}
                </h2>
                <p className="mt-3 text-lg font-medium text-brand lg:text-xl">
                  {cat.tagline}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted lg:text-lg">
                  {cat.intro}
                </p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
                {cat.capabilities.map((c) => (
                  <article
                    key={c.title}
                    className="rounded-[20px] border border-white bg-white p-6 shadow-[0_4px_24px_#E2E9F8]"
                  >
                    <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>
                  </article>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={`/what-we-do/${cat.slug}/`}
                  className="inline-flex items-center gap-1.5 text-base font-semibold text-brand transition-colors hover:text-blue-700"
                >
                  More on {cat.name}
                  <span aria-hidden="true">→</span>
                </Link>
                {products.length > 0 && (
                  <p className="text-sm text-muted">
                    Products:{" "}
                    {products.map((p, i) => (
                      <span key={p.slug}>
                        <Link
                          href={`/products/${p.slug}/`}
                          className="text-ink underline underline-offset-4 hover:text-brand"
                        >
                          {p.name}
                        </Link>
                        {i < products.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </Container>
          </section>
        );
      })}

      <Cta />
    </>
  );
}
