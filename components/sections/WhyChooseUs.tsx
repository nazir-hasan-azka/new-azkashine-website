import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * Three reasons, each one checkable against the decks rather than a stated attitude.
 *
 * The previous copy ("We align every solution with your goals and challenges", later
 * "We start from the outcome you need, not the technology we would enjoy building")
 * asserted nothing a reader could verify or a competitor could not equally claim. These
 * point at things Azkashine demonstrably does: nine products in production, AI-specific
 * validation as a service (deck p17), and governance defaults built into the platforms.
 *
 * The icon panel is deep navy so the pale template renders read as deliberate marks
 * rather than washed-out clip-art, and it ties back to the hero.
 */
const CARDS = [
  {
    icon: "/why/business-first.png",
    w: 486,
    h: 414,
    title: "Nine products, already running",
    desc: "We are not starting from a blank page. Financial compliance, agentic AI, visitor management, and hiring platforms are built and operating — so you get a product line, not a proposal.",
  },
  {
    icon: "/why/ai-powered.png",
    w: 485,
    h: 390,
    title: "We build it, run it, and test it",
    desc: "Products, the cloud engineering to operate them, and independent validation of AI systems — including prompt-engineering and RAG groundedness testing. Few engineering firms offer that third part at all.",
  },
  {
    icon: "/why/scalable-impact.png",
    w: 358,
    h: 335,
    title: "Governed by default",
    desc: "Approval checkpoints, audit trails, and role-based access are built in, not bolted on — because our buyers in telecom, public sector, and finance answer to regulators, not just to users.",
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
            Three things you can check, rather than three things we believe about
            ourselves.
          </p>
        </div>

        <div className="reveal-group mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <div key={card.title} className="flex">
              <article className="lift group flex w-full flex-col overflow-hidden rounded-[20px] border border-white bg-white shadow-[0_4px_24px_#E2E9F8] hover:border-border-strong hover:shadow-[0_14px_38px_#D3E7FE]">
                <div className="relative flex h-52 items-center justify-center bg-blue-900 px-6 lg:h-56">
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-5 text-sm font-bold text-white/35"
                  >
                    0{i + 1}
                  </span>
                  <Image
                    src={card.icon}
                    alt=""
                    width={card.w}
                    height={card.h}
                    className="h-auto max-h-[78%] w-auto"
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
