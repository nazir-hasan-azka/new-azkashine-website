import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    num: "01",
    title: "Discover and Analyze",
    desc: "We analyze your current tech infrastructure, data streams, and operational processes to identify areas for improvement and AI integration. Every touchpoint is carefully evaluated for maximum impact.",
    img: "/process/discover.png",
    w: 637,
    h: 452,
    textSide: "left" as const,
  },
  {
    num: "02",
    title: "Design & Implement",
    desc: "We design custom AI solutions that boost efficiency and cut costs. Our team develops, tests, and implements intelligent systems that integrate seamlessly into your existing infrastructure.",
    img: "/process/code.png",
    w: 694,
    h: 500,
    textSide: "right" as const,
  },
  {
    num: "03",
    title: "Optimize & Scale",
    desc: "We monitor vital metrics and continuously improve performance using up-to-the-minute analytics. As your enterprise expands, your automation adapts with it.",
    img: "/process/gauge.png",
    w: 718,
    h: 606,
    textSide: "left" as const,
  },
];

export function Process() {
  return (
    <section aria-labelledby="process-heading" className="py-16 lg:py-24">
      <Container>
        <h2
          id="process-heading"
          className="text-center text-3xl font-semibold text-ink sm:text-4xl lg:text-[58px]"
        >
          Our <span className="italic text-brand">Simple</span> &amp;{" "}
          <span className="italic text-brand">Smart</span> Process
        </h2>
        <p className="mt-3 text-center text-lg text-ink sm:text-xl lg:mt-4 lg:text-[28px]">
          Everything you need to collaborate, create, and scale, all in one place.
        </p>

        <div className="relative mt-12 lg:mt-20">
          {/* Central connecting line (desktop) */}
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-border lg:block" />

          <div className="flex flex-col gap-14 lg:gap-20">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="relative grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24"
              >
                {/* Text */}
                <div
                  className={cn(
                    step.textSide === "right" ? "lg:order-2 lg:pl-20" : "lg:pr-20",
                  )}
                >
                  <span className="mb-3 block text-4xl font-semibold text-brand/50 lg:hidden">
                    {step.num}
                  </span>
                  <h3 className="text-3xl font-bold text-ink lg:text-[40px] xl:text-[54px]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-lg leading-snug text-black lg:text-[22px] xl:text-[28px]">
                    {step.desc}
                  </p>
                </div>

                {/* Illustration */}
                <div
                  className={cn(
                    "flex justify-center",
                    step.textSide === "right" && "lg:order-1",
                  )}
                >
                  <Image
                    src={step.img}
                    alt=""
                    width={step.w}
                    height={step.h}
                    className="h-auto w-full max-w-150"
                  />
                </div>

                {/* Number node on the central line (desktop) */}
                <span className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 bg-linear-to-b from-brand/60 to-brand-light/20 bg-clip-text text-[64px] font-semibold text-transparent lg:block">
                  {step.num}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
