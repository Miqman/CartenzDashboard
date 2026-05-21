import type { MetadataRoute } from "next";
import { getArticles, getProducts } from "@/lib/strapi";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cartenz.co.id";

const STATIC_PATHS = [
  "",
  "/tentang-kami",
  "/produk",
  "/artikel",
  "/karir",
  "/hubungi-kami",
] as const;

function buildAlternates(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const loc of routing.locales) {
    out[loc] = `${SITE_URL}/${loc}${path}`;
  }
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((loc) =>
    STATIC_PATHS.map((path) => ({
      url: `${SITE_URL}/${loc}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: buildAlternates(path) },
    })),
  );

  // Artikel dari Strapi (best-effort: bila gagal, sitemap tetap valid dengan static entries saja).
  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const res = await getArticles();
    const list = Array.isArray(res?.data) ? res.data : [];
    articleEntries = list.flatMap((raw) => {
      const a = (raw ?? {}) as Record<string, unknown>;
      const attrs = (a?.attributes ?? a) as Record<string, unknown>;
      const slug = String(attrs?.slug ?? "");
      const updatedAt = attrs?.updatedAt ?? attrs?.publishedAt;
      if (!slug) return [];
      const date = updatedAt ? new Date(String(updatedAt)) : now;
      return routing.locales.map((loc) => ({
        url: `${SITE_URL}/${loc}/artikel/${slug}`,
        lastModified: date,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: buildAlternates(`/artikel/${slug}`) },
      }));
    });
  } catch {
    articleEntries = [];
  }

  // Produk dari Strapi (urlProduk bisa berupa "/produk/<slug>")
  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productEntries = products.flatMap((p) => {
      const urlProduk = (p?.urlProduk ?? "").toString();
      if (!urlProduk) return [];
      const path = urlProduk.startsWith("/") ? urlProduk : `/${urlProduk}`;
      return routing.locales.map((loc) => ({
        url: `${SITE_URL}/${loc}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: buildAlternates(path) },
      }));
    });
  } catch {
    productEntries = [];
  }

  return [...staticEntries, ...articleEntries, ...productEntries];
}
