import Image from "next/image";
import { Container } from "@/components/ui/Container";

// "Our Collaboration and Partner" — real Azkashine client logos, 2-row grid.
const PARTNERS = [
  { src: "/partners/cloudit.png", alt: "CloudIT ME" },
  { src: "/partners/sasken.png", alt: "Sasken" },
  { src: "/partners/alpha-power.png", alt: "Alpha Power" },
  { src: "/partners/csg.png", alt: "CSG" },
  { src: "/partners/vi.png", alt: "Vi" },
];

export function Partners() {
  return (
    <section aria-labelledby="partners-heading">
      <Container>
        <div className="flex flex-col items-center gap-10 py-10 lg:flex-row lg:items-center lg:gap-16 lg:pt-32 lg:pb-12">
          <h2
            id="partners-heading"
            className="shrink-0 text-center text-2xl font-medium leading-snug text-ink lg:text-left lg:text-[32px]"
          >
            Our Collaboration
            <br />
            and Partner
          </h2>

          <ul className="grid w-full flex-1 grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-6">
            {PARTNERS.map((p) => (
              <li key={p.alt} className="flex items-center justify-center">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={250}
                  height={200}
                  className="h-auto w-32 lg:w-36"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
