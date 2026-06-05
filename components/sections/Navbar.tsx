"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

// Menu labels per the Figma "Landing Page 1" design.
// TODO: reconcile hrefs with real section anchors during the content pass.
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Azkashine home">
            <Image
              src="/azkashine-logo.png"
              alt="Azkashine"
              width={133}
              height={37}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[17px] font-medium text-ink transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="#contact"
            className="hidden h-9 items-center rounded-md bg-brand-light px-5 text-[15px] font-semibold text-ink transition-opacity hover:opacity-90 md:inline-flex"
          >
            Contact US
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Hamburger open={open} />
          </button>
        </nav>
      </Container>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/70 bg-background md:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <Container>
          <ul className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink/80 hover:bg-surface hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand-light px-6 text-[15px] font-semibold text-ink"
              >
                Contact US
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={open ? "M6 6l12 12M18 6L6 18" : "M3 6h18M3 12h18M3 18h18"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
