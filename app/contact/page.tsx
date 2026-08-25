import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/content/site";
import { PRODUCTS } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Azkashine — Bengaluru, India. Email contact@azkashine.com or call +91 9492062249.",
};

/**
 * The site is a static export (`output: "export"`), so there is no server to receive a
 * form post. Contact is therefore direct — mailto and telephone links — rather than a
 * form that silently fails. Wiring a third-party form service is a separate decision.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact us"
        lede="Tell us what you are trying to solve. If we are not the right fit, we will say so."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section aria-labelledby="contact-heading" className="py-16 lg:py-24">
        <Container>
          <h2 id="contact-heading" className="sr-only">
            Contact details
          </h2>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                Email
              </h3>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-3 block text-2xl font-bold text-ink underline underline-offset-4 hover:text-brand lg:text-[32px]"
              >
                {SITE.email}
              </a>

              <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-muted">
                Phone
              </h3>
              <ul className="mt-3 space-y-1.5">
                {SITE.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-lg text-ink hover:text-brand lg:text-xl"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`tel:${SITE.landline.replace(/[\s-]/g, "")}`}
                    className="text-lg text-muted hover:text-brand lg:text-xl"
                  >
                    {SITE.landline}{" "}
                    <span className="text-sm">(landline)</span>
                  </a>
                </li>
              </ul>

              <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-muted">
                Office
              </h3>
              <address className="mt-3 text-lg not-italic leading-relaxed text-ink lg:text-xl">
                <span className="block font-semibold">{SITE.legalName}</span>
                {SITE.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="rounded-[20px] border border-white bg-white p-8 shadow-[0_4px_24px_#E2E9F8] lg:p-10">
              <h3 className="text-xl font-bold text-ink lg:text-2xl">
                Asking about a specific product?
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Pick one and we will reply with a walkthrough against your own use case
                rather than a generic deck.
              </p>
              <ul className="mt-6 space-y-1">
                {PRODUCTS.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                        `${p.name} enquiry`,
                      )}`}
                      className="block rounded-lg px-3 py-2 text-base font-medium text-ink transition-colors hover:bg-surface hover:text-brand"
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-5 text-sm text-muted">
                Prefer to browse first? See{" "}
                <Link
                  href="/products/"
                  className="text-ink underline underline-offset-4 hover:text-brand"
                >
                  all products
                </Link>{" "}
                or{" "}
                <Link
                  href="/what-we-do/"
                  className="text-ink underline underline-offset-4 hover:text-brand"
                >
                  what we do
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
