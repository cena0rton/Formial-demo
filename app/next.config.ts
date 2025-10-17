import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240'),
      new URL('https://formial.in/cdn/shop/files/dr.jeet-colored.png?v=1760612748&width=800'),
    ],
  },
};

export default nextConfig;
