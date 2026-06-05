import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build the whole site as plain HTML/CSS/JS files into an `out/` folder,
  // so it can be served by simple static hosting (Hostinger) — no Node server.
  output: "export",
  // Hostinger can't run Next.js's on-the-fly image optimizer, so ship images as-is.
  images: { unoptimized: true },
  // Emit each route as a folder with index.html (e.g. /out/index.html) — friendlier
  // for static hosts and avoids 404s on refresh.
  trailingSlash: true,
};

export default nextConfig;
