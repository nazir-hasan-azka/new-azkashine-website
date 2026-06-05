import Image from "next/image";
import { Container } from "@/components/ui/Container";

// title is split into two lines to match the design's 2-line card titles
// (keeps description start-points aligned across all four cards).
const SERVICES = [
  {
    icon: "/services/ai-ml.png",
    title: ["AI / ML", "Solutions"],
    desc: "Design and deploy intelligent, autonomous, and generative AI solutions to automate decisions, augment operations, and accelerate business value.",
  },
  {
    icon: "/services/analytics.png",
    title: ["Advanced", "Analytics"],
    desc: "Transform enterprise data into real-time, actionable insights through interactive dashboards, predictive analytics, and executive reporting.",
  },
  {
    icon: "/services/digital.png",
    title: ["Digital", "Platforms"],
    desc: "Build secure, scalable, and user-centric web and mobile platforms supporting enterprise workflows, customer engagement, and ecosystem integration.",
  },
  {
    icon: "/services/devops.png",
    title: ["DevOps & Quality", "Engineering"],
    desc: "Enable reliable, high-performance systems through cloud infrastructure engineering, CI/CD automation, site reliability engineering, and comprehensive quality assurance.",
  },
];

export function Services() {
  return (
    <section aria-labelledby="services-heading" className="py-16 lg:py-24">
      <Container>
        <h2
          id="services-heading"
          className="text-center text-3xl font-semibold text-ink sm:text-4xl lg:text-[58px]"
        >
          Our <span className="italic text-brand">Services</span>
        </h2>
        <p className="mt-3 text-center text-lg text-ink sm:text-xl lg:mt-4 lg:text-[28px]">
          Unlock the full potential of your business with our AI services
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article
              key={s.title.join(" ")}
              className="rounded-[20px] border border-white bg-white pb-8 shadow-[0_4px_24px_#E2E9F8]"
            >
              <div className="flex h-56 items-center justify-center px-6 pt-8 lg:h-64">
                <Image
                  src={s.icon}
                  alt=""
                  width={260}
                  height={253}
                  className="h-auto max-h-full w-auto"
                />
              </div>
              <div className="px-6">
                <h3 className="text-2xl font-bold leading-tight text-ink lg:text-[32px]">
                  {s.title[0]}
                  <br />
                  {s.title[1]}
                </h3>
                <p className="mt-3 text-base leading-snug text-black lg:text-xl">
                  {s.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
