import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  compiler: {
    removeConsole: isProduction ? { exclude: ["error"] } : false,
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "swiper"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      { protocol: "https", hostname: "cms.cartenz.co.id", pathname: "/**" },
      { protocol: "https", hostname: "**.strapiapp.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "**.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cos.ap-jakarta.myqcloud.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "dummyimage.com", pathname: "/**" },
    ],
    // Hanya aktif di dev (Strapi di localhost / 127.0.0.1). Di production tidak ada IP privat.
    dangerouslyAllowLocalIP: !isProduction,
  },
};

export default withNextIntl(nextConfig);
