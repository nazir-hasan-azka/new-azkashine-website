import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * Styled to match the rest of the page: left-aligned heading at the shared 48px scale,
 * the same card treatment as the capability and product grids, and the same hover lift.
 * It previously used a centred italic 58px heading and 36px card titles, which made it
 * read as a section borrowed from somewhere else.
 */
const CARDS = [
  {
    icon: "/why/business-first.png",
    w: 486,
    h: 414,
    title: "Business-First Approach",
    desc: "We start from the outcome you need, not the technology we would enjoy building.",
  },
  {
    icon: "/why/ai-powered.png",
    w: 485,
    h: 390,
    title: "AI-Powered Solutions",
    desc: "Agentic systems, document intelligence, and analytics built into the workflow rather than bolted on.",
  },
  {
    icon: "/why/scalable-impact.png",
    w: 358,
    h: 335,
    title: "Scalable Impact",
    desc: "Platforms designed to be operated for years — with governance, audit trails, and support that hold up.",
  },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="py-16 lg:py-24">
      <Container>
        <div className="max-w-4xl">
          <h2
            id="why-heading"
            className="text-3xl font-bold text-ink sm:text-4xl lg:text-[48px]"
          >
            Why choose us
          </h2>
          <p className="mt-4 max-w-5xl text-lg leading-relaxed text-muted lg:text-xl">
            Everything you need to automate, optimise, and scale — delivered by a team that
            stays after the launch.
          </p>
        </div>

        <div className="reveal-group mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {CARDS.map((card) => (
            <div key={card.title} className="flex">
              <article className="lift group flex w-full flex-col overflow-hidden rounded-[20px] border border-white bg-white shadow-[0_4px_24px_#E2E9F8] hover:border-border-strong hover:shadow-[0_14px_38px_#D3E7FE]">
                <div className="flex h-56 items-center justify-center bg-surface-2 px-6 lg:h-64">
                  <Image
                    src={card.icon}
                    alt=""
                    width={card.w}
                    height={card.h}
                    className="h-auto max-h-full w-auto"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl font-bold text-ink">{card.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{card.desc}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
