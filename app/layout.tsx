import type { Metadata } from "next";
import { Figtree, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SITE } from "@/lib/content/site";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Used in spots the design specifies Manrope (e.g. CTA subcopy).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Azkashine — AI products, platforms, and engineering services",
    template: "%s | Azkashine",
  },
  description:
    "Azkashine builds AI products, digital platforms, and cloud engineering services for telecom, public sector, manufacturing, and energy organisations.",
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: "Azkashine — AI products, platforms, and engineering services",
    description:
      "Nine products across AI & automation, digital platforms, and cloud services & testing — built, run, and independently validated.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${manrope.variable} antialiased`}
    >
      <body>
        {/* `relative` anchors the home page's absolutely-positioned HeroBackdrop,
            which must sit behind the navbar at the very top of the page. */}
        <div className="relative">
          <Navbar />
          {/* NOTE: cross-route View Transitions are not wired up. React 19.2 does not
              export `unstable_ViewTransition` (it ships only on React's experimental
              channel), and Next's `experimental.viewTransition` flag enables that
              component rather than wrapping navigations by itself. Revisit when the API
              lands in a stable React release. */}
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
