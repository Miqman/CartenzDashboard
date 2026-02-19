import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      { protocol: "https", hostname: "cms.cartenz.co.id", pathname: "/**" },
      { protocol: "https", hostname: "**.strapiapp.com", pathname: "/**" },
      { protocol: "https", hostname: "**.media.strapiapp.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
    // Diperlukan saat Strapi jalan di localhost (127.0.0.1); Next.js memblokir fetch ke IP pribadi secara default.
    dangerouslyAllowLocalIP: true,
  },
};

export default withNextIntl(nextConfig);
