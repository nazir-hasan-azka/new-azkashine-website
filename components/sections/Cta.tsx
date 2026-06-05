import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Cta() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#79C1DE] via-[#B8D8E6] to-[#FAFBFF]">
      <Container>
        <div className="flex flex-col items-center py-20 text-center lg:py-28">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[68px] lg:leading-[1.1]">
            Embrace the Future of AI Innovation
          </h2>
          <p className="mt-5 max-w-xl text-center font-[family-name:var(--font-manrope)] text-[15px] font-normal leading-8 tracking-[0.2px] text-black/60">
            Let us know what challenges you are trying to solve so we can help.
          </p>
          <Link
            href="#contact"
            aria-label="Get in touch"
            className="mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#999999]/50 transition-colors hover:bg-white/10"
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
              <path
                d="M0.799988 12.7998H23.0857M12.8 0.799805L24.8 12.7998L12.8 24.7998"
                stroke="#999999"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
