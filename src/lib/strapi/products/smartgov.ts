/**
 * API Strapi untuk halaman produk Smartgov.
 * Endpoint: smartgov-page (single), smartgov-detail-categories (collection).
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

export type GetSmartgovPageOptions = {
  revalidate?: number;
  timeoutMs?: number;
  retries?: number;
};

/** Fetch Smartgov page (single type): Hero + featuredClients */
export async function getSmartgovPage(options?: GetSmartgovPageOptions): Promise<{
  hero: ProductHeroData | null;
  clients: ProductClientsData | null;
}> {
  try {
    const requestOptions = {
      revalidate: options?.revalidate ?? 0,
      timeoutMs: options?.timeoutMs ?? 30000,
      retries: options?.retries ?? 4,
    };
    const res = await fetchApi<{ data: unknown }>(
      `smartgov-page?${POPULATE_PAGE}`,
      requestOptions
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
      console.warn("[getSmartgovPage] Gagal:", err instanceof Error ? err.message : err);
    }
    return { hero: null, clients: null };
  }
}

interface SmartgovDetailCategoryItem {
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

/** Fetch Smartgov detail categories */
export async function getSmartgovDetailCategories(options?: GetSmartgovPageOptions): Promise<ProductDetailData> {
  try {
    const requestOptions = {
      revalidate: options?.revalidate ?? 0,
      timeoutMs: options?.timeoutMs ?? 30000,
      retries: options?.retries ?? 4,
    };
    const res = await fetchApi<{ data: unknown }>(
      `smartgov-detail-categories?${POPULATE_CATEGORIES}`,
      requestOptions
    );
    const data = res?.data;
    const list = Array.isArray(data) ? data : [];
    const rawCategories: SmartgovDetailCategoryItem[] = list
      .map((item) => normalizeDoc<SmartgovDetailCategoryItem>(item))
      .filter((c): c is SmartgovDetailCategoryItem => c != null);
    return fillDefaultDetailImages(
      mapStrapiCategoriesToDetailData(rawCategories, getStrapiMediaUrl)
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getSmartgovDetailCategories] Gagal:", err instanceof Error ? err.message : err);
    }
    return { categories: [] };
  }
}
