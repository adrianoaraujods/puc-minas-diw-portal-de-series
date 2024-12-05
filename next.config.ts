import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/original/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/ogw/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/detalhes",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
