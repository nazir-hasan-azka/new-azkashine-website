import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "./FaqAccordion";

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="py-16 lg:py-24">
      <Container>
        <h2
          id="faq-heading"
          className="text-center text-3xl font-semibold text-ink sm:text-4xl lg:text-[58px]"
        >
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center text-lg text-ink sm:text-xl lg:mt-4 lg:text-[28px]">
          Find quick answers to the most common support questions
        </p>

        <div className="mt-10 grid gap-7 lg:mt-16 lg:grid-cols-[minmax(0,560px)_1fr]">
          {/* Still Have Questions? card */}
          <div className="flex flex-col items-center rounded-[20px] border border-white bg-white p-8 text-center shadow-[0_4px_24px_#E2E9F8] lg:p-12">
            <Image
              src="/faq/question.png"
              alt=""
              width={127}
              height={127}
              className="h-28 w-28"
            />
            <h3 className="mt-5 text-2xl font-semibold text-ink lg:text-[36px]">
              Still Have Questions?
            </h3>
            <p className="mt-3 max-w-sm text-base text-muted lg:text-[22px]">
              Still have questions? Feel free to get in touch with us today!
            </p>
            <Link
              href="#contact"
              className="mt-7 inline-flex h-13 items-center justify-center rounded-none bg-brand-light px-8 text-lg font-semibold text-ink transition-opacity hover:opacity-90"
            >
              Contact Us
            </Link>
          </div>

          {/* Accordion */}
          <FaqAccordion />
        </div>
      </Container>
    </section>
  );
}
