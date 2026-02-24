/**
 * API Strapi untuk halaman produk EFD.
 * Endpoint: efd-page (single), efd-detail-categories (collection).
 */

import { fetchApi, getStrapiMediaUrl } from "@/lib/strapi";
import type { StrapiEfdPageData } from "./types";
import type { ProductHeroData } from "@/data/productsPageData";
import type { ProductDetailData } from "@/data/productDetailData";
import type { ProductClientsData } from "@/data/productClientsData";
import {
  normalizeDoc,
  mapStrapiHeroToProductHero,
  mapStrapiCategoriesToDetailData,
  fillDefaultDetailImages,
} from "./helpers";

const POPULATE_PAGE =
  "populate[0]=Hero&populate[1]=Hero.paragraphs&populate[2]=Hero.logo&populate[3]=Hero.heroImage&populate[4]=featuredClients&populate[5]=featuredClients.logo";

const POPULATE_CATEGORIES =
  "populate[0]=subMenus&populate[1]=subMenus.tabs&populate[2]=subMenus.tabs.content&populate[3]=subMenus.tabs.content.image&populate[4]=subMenus.tabs.content.blocks&sort[0]=order";

export type GetEfdPageOptions = { revalidate?: number };

/** Fetch EFD page (single type): Hero + featuredClients */
export async function getEfdPage(options?: GetEfdPageOptions): Promise<{
  hero: ProductHeroData | null;
  clients: ProductClientsData | null;
}> {
  try {
    const res = await fetchApi<{ data: unknown }>(
      `efd-page?${POPULATE_PAGE}`,
      { revalidate: options?.revalidate ?? 60 }
    );
    const doc = normalizeDoc<StrapiEfdPageData>(res?.data);
    if (!doc) return { hero: null, clients: null };

    const hero = mapStrapiHeroToProductHero(doc.Hero, getStrapiMediaUrl);
    const clientsList = Array.isArray(doc.featuredClients) ? doc.featuredClients : [];
    const clients: ProductClientsData | null =
      clientsList.length > 0
        ? {
            badge: "Klien",
            title: "pemerintah daerah",
            clients: clientsList.map((c) => ({
              name: c.name ?? "",
              logoUrl: getStrapiMediaUrl(c.logo) || "",
            })),
          }
        : null;

    return { hero, clients };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getEfdPage] Gagal:", err instanceof Error ? err.message : err);
    }
    return { hero: null, clients: null };
  }
}

/** Shape satu item dari efd-detail-categories (setelah normalizeDoc) */
interface EfdDetailCategoryItem {
  categoryId?: string;
  label?: string;
  megaMenuChildId?: string;
  sidebarAsFlat?: boolean;
  subMenus?: Array<{
    subSlug?: string;
    title?: string;
    tabs?: Array<{
      tabLabel?: string;
      content?: {
        description?: string;
        image?: { url?: string };
        details?: string[];
        blocks?: unknown[];
      };
    }>;
  }>;
}

/** Fetch EFD detail categories (sidebar + konten) */
export async function getEfdDetailCategories(options?: GetEfdPageOptions): Promise<ProductDetailData> {
  try {
    const res = await fetchApi<{ data: unknown }>(
      `efd-detail-categories?${POPULATE_CATEGORIES}`,
      { revalidate: options?.revalidate ?? 60 }
    );
    const data = res?.data;
    const list = Array.isArray(data) ? data : [];
    const rawCategories: EfdDetailCategoryItem[] = list
      .map((item) => normalizeDoc<EfdDetailCategoryItem>(item))
      .filter((c): c is EfdDetailCategoryItem => c != null);
    const detail = fillDefaultDetailImages(
      mapStrapiCategoriesToDetailData(rawCategories, getStrapiMediaUrl)
    );
    return detail;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getEfdDetailCategories] Gagal:", err instanceof Error ? err.message : err);
    }
    return { categories: [] };
  }
}
