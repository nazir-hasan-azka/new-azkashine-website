import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Cta } from "@/components/sections/Cta";
import {
  AT_A_GLANCE,
  CHAIRMAN,
  MISSION,
  SITE,
  VALUES,
  VISION,
} from "@/lib/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Azkashine Software and Services Private Limited — a Bengaluru-based IT software and services company building AI products, digital platforms, and cloud engineering services.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Azkashine"
        lede={`${SITE.legalName} is a Bengaluru-based software and services company building AI products, digital platforms, and the cloud engineering to run them.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section aria-labelledby="glance-heading" className="py-16 lg:py-20">
        <Container>
          <Media
            name="corporate"
            alt=""
            ratio="16/9"
            priority
            className="mb-14 !aspect-[21/9]"
            sizes="100vw"
          />
          <h2
            id="glance-heading"
            className="text-2xl font-bold text-ink sm:text-3xl lg:text-[36px]"
          >
            At a glance
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AT_A_GLANCE.map((item) => (
              <li
                key={item}
                className="border-t-2 border-brand pt-4 text-base leading-relaxed text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="vision-heading"
        className="bg-surface-2 py-16 lg:py-20"
      >
        <Container>
          <h2 id="vision-heading" className="sr-only">
            Vision and mission
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-[20px] border border-white bg-white p-8 shadow-[0_4px_24px_#E2E9F8] lg:p-10">
              <h3 className="text-xl font-bold text-brand lg:text-2xl">Our vision</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink lg:text-xl">
                {VISION}
              </p>
            </article>
            <article className="rounded-[20px] border border-white bg-white p-8 shadow-[0_4px_24px_#E2E9F8] lg:p-10">
              <h3 className="text-xl font-bold text-brand lg:text-2xl">Our mission</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink lg:text-xl">
                {MISSION}
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section aria-labelledby="values-heading" className="py-16 lg:py-20">
        <Container>
          <h2
            id="values-heading"
            className="text-2xl font-bold text-ink sm:text-3xl lg:text-[36px]"
          >
            What we value
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-5">
            {VALUES.map((v) => (
              <article key={v.title}>
                <h3 className="text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {v.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="chairman-heading"
        className="border-y border-border bg-surface py-16 lg:py-24"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <h2
              id="chairman-heading"
              className="text-2xl font-bold text-ink sm:text-3xl lg:text-[36px]"
            >
              A note from our Chairman
            </h2>
            <div className="mt-8 space-y-5">
              {CHAIRMAN.note.map((para) => (
                <p key={para} className="text-lg leading-relaxed text-ink lg:text-xl">
                  {para}
                </p>
              ))}
            </div>
            <p className="mt-8 text-lg font-semibold italic text-brand">
              {CHAIRMAN.tagline}
            </p>
            <div className="mt-6 border-t border-border-strong pt-6">
              <p className="text-base font-bold text-ink">{CHAIRMAN.name}</p>
              <p className="text-sm text-muted">{CHAIRMAN.title}</p>
              <p className="text-sm text-muted">{SITE.legalName}</p>
              <p className="text-sm text-muted">{CHAIRMAN.location}</p>
            </div>
          </div>
          {/* Deliberately architecture rather than a person: any photographed individual
              beside this letter reads as the Chairman himself. A portrait of Ishaq Shaik
              is what belongs here once one is supplied. */}
          <Media
            name="about-meeting"
            alt=""
            ratio="3/2"
            className="lg:mt-2"
            sizes="(max-width: 1024px) 100vw, 35vw"
          />
          </div>
        </Container>
      </section>

      <Cta />
    </>
  );
}
