import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://formial.in/cdn/shop/files/new-footer-logo.png?v=1760515295&width=240'),
      new URL('https://formial.in/cdn/shop/files/dr.jeet-colored.png?v=1760612748&width=800'),
      new URL('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face'),
      new URL('https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'),
      new URL('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'),
      new URL('https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'),
    ],
  },
};

export default nextConfig;
