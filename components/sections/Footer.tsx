import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  "Home",
  "About us",
  "Services",
  "Products",
  "Contact Us",
  "Careers",
];
const SOCIAL_LINKS = ["Facebook", "Instagram", "GitHub", "LinkedIn"];

export function Footer() {
  return (
    <footer className="bg-background">
      <Container>
        <div className="flex flex-col gap-12 py-16 lg:flex-row lg:justify-between lg:py-20">
          <Image
            src="/azkashine-logo.png"
            alt="Azkashine"
            width={133}
            height={37}
            className="h-9 w-auto"
          />

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16 lg:gap-24">
            <FooterColumn links={NAV_LINKS} />
            <FooterColumn links={SOCIAL_LINKS} />

            <div className="text-sm leading-relaxed text-muted">
              <address className="not-italic">
                No.73, 3rd floor, Fountain Head Building,
                <br />
                Varthur Road, Nagavarapalya, C V Raman Nagar (Post),
                <br />
                Bengaluru - 560093, Karnataka, India.
              </address>
              <p className="mt-3">080-25301553</p>
              <a
                href="mailto:contact@azkashine.com"
                className="mt-1 inline-block text-ink underline"
              >
                contact@azkashine.com
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6">
            <Link href="#" className="hover:text-ink">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-ink">
              About Cookies
            </Link>
          </div>
          <p className="text-xs">
            Copyright © 2026 Azkashine. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ links }: { links: string[] }) {
  return (
    <ul className="space-y-3 text-sm text-muted">
      {links.map((label) => (
        <li key={label}>
          <Link href="#" className="transition-colors hover:text-ink">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
