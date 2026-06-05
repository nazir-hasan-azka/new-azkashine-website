import Image from "next/image";
import { Container } from "@/components/ui/Container";

const CARDS = [
  {
    icon: "/why/business-first.png",
    w: 486,
    h: 414,
    title: "Business-First Approach",
    desc: "We align every solution with your goals and challenges.",
  },
  {
    icon: "/why/ai-powered.png",
    w: 485,
    h: 390,
    title: "AI-Powered Solutions",
    desc: "We build intelligent systems driven by automation and innovation.",
  },
  {
    icon: "/why/scalable-impact.png",
    w: 358,
    h: 335,
    title: "Scalable Impact",
    desc: "We deliver measurable results designed for long-term growth.",
  },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="py-16 lg:py-24">
      <Container>
        <h2
          id="why-heading"
          className="text-center text-3xl font-semibold italic text-ink sm:text-4xl lg:text-[58px]"
        >
          Why <span className="font-extrabold text-brand">choose</span> us?
        </h2>
        <p className="mt-3 text-center text-lg text-ink sm:text-xl lg:mt-4 lg:text-[28px]">
          Everything you need to automate, optimize, and scale
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-[20px] border border-white bg-white pb-8 shadow-[0_4px_24px_#E2E9F8]"
            >
              <div className="flex h-60 items-center justify-center px-6 pt-8 lg:h-80">
                <Image
                  src={card.icon}
                  alt=""
                  width={card.w}
                  height={card.h}
                  className="h-auto max-h-full w-auto"
                />
              </div>
              <div className="px-9">
                <h3 className="text-2xl font-bold text-ink lg:text-[36px]">
                  {card.title}
                </h3>
                <p className="mt-3 text-base leading-snug text-black lg:text-2xl">
                  {card.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
