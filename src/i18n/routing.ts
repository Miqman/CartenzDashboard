import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  localePrefix: "always",
  /** Supaya pertama buka situs dapat ID, bukan ikut Accept-Language (en). */
  localeDetection: false,
});
