import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative">
      <Container>
        <div className="mx-auto flex max-w-7xl flex-col items-center pt-16 pb-20 text-center sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 xl:pt-37">
          {/* Badge */}
          <span className="inline-flex items-center rounded-full border border-brand px-4 py-1.5 text-base font-semibold text-brand">
            AI Solutions
          </span>

          {/* Headline — forced 2-line structure at lg+, natural wrap on mobile.
             "AI-Powered" kept non-breaking so the hyphen never splits. */}
          <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.1] text-ink sm:text-5xl lg:text-6xl lg:leading-[1.06] xl:text-[5.375rem] xl:leading-[1.05]">
            Transform Your Business with
            <br className="hidden lg:block" />{" "}
            <span className="whitespace-nowrap font-bold text-brand">AI-Powered</span>{" "}
            Intelligence
          </h1>

          {/* Subcopy — exact design spec: #000, Figtree 400, 20px / 30px line-height */}
          <p className="mt-6 max-w-3xl text-base leading-normal text-black sm:text-lg lg:text-xl">
            We build intelligent systems, automation workflows, and AI agents
            that streamline operations, reduce costs, and unlock exponential
            growth.
          </p>

          {/* CTA */}
          <Link
            href="#contact"
            className="mt-10 inline-flex h-13 items-center justify-center rounded-none bg-brand-light px-8 text-lg font-semibold text-ink transition-opacity hover:opacity-90"
          >
            Book a demo
          </Link>
        </div>
      </Container>
    </section>
  );
}
