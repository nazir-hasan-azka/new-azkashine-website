import type { Metadata } from "next";
import { Figtree, Manrope } from "next/font/google";
import "./globals.css";

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
    default: "Azkashine — AI-Powered Intelligence for Business Transformation",
    template: "%s | Azkashine",
  },
  description:
    "Azkashine builds intelligent AI, automation, and enterprise technology solutions that help organizations innovate faster, cut costs, and scale with confidence.",
  metadataBase: new URL("https://www.azkashine.com"),
  openGraph: {
    title: "Azkashine — AI-Powered Intelligence for Business Transformation",
    description:
      "Intelligent AI, automation, and enterprise technology solutions that drive measurable business transformation.",
    url: "https://www.azkashine.com",
    siteName: "Azkashine",
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
      <body>{children}</body>
    </html>
  );
}
