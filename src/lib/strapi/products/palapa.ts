/**
 * API Strapi untuk halaman produk Palapa.
 * Endpoint: palapa-page (single), palapa-detail-categories (collection).
 */

import { fetchApi, getStrapiMediaUrl } from "@/lib/strapi";
import type { StrapiPalapaPageData, StrapiPalapaKlienCard } from "./types";
import type { ProductHeroData } from "@/data/productsPageData";
import type { ProductDetailData } from "@/data/productDetailData";
import type { PalapaKlienCardItem } from "@/data/palapaKlienCardData";
import type { PalapaKlienSectionPayload } from "./types";
import {
  normalizeDoc,
  mapStrapiHeroToProductHero,
  mapStrapiCategoriesToDetailData,
  fillDefaultDetailImages,
} from "./helpers";

const POPULATE_PAGE =
  "populate[0]=Hero&populate[1]=Hero.paragraphs&populate[2]=Hero.logo&populate[3]=Hero.heroImage&populate[4]=Klien&populate[5]=Klien.cards&populate[6]=Klien.cards.image&populate[7]=Klien.cards.logo";

const POPULATE_CATEGORIES =
  "populate[0]=subMenus&populate[1]=subMenus.tabs&populate[2]=subMenus.tabs.content&populate[3]=subMenus.tabs.content.image&populate[4]=subMenus.tabs.content.blocks&sort[0]=order";

export type GetPalapaPageOptions = {
  revalidate?: number;
  timeoutMs?: number;
  retries?: number;
};

function mapPalapaCard(card: StrapiPalapaKlienCard): PalapaKlienCardItem {
  return {
    gambar: getStrapiMediaUrl(card.image) || "",
    logo: getStrapiMediaUrl(card.logo) || "",
    title: card.title ?? "",
    nama_daerah: card.nama_daerah ?? "",
  };
}

/** Fetch Palapa page (single type): Hero + Klien section */
export async function getPalapaPage(options?: GetPalapaPageOptions): Promise<{
  hero: ProductHeroData | null;
  palapaKlien: PalapaKlienSectionPayload | null;
}> {
  try {
    const requestOptions = {
      revalidate: options?.revalidate ?? 0,
      timeoutMs: options?.timeoutMs ?? 30000,
      retries: options?.retries ?? 4,
    };
    const res = await fetchApi<{ data: unknown }>(
      `palapa-page?${POPULATE_PAGE}`,
      requestOptions,
    );
    // console.log("res", res);
    const doc = normalizeDoc<StrapiPalapaPageData>(res?.data);
    if (!doc) return { hero: null, palapaKlien: null };

    const hero = mapStrapiHeroToProductHero(doc.Hero, getStrapiMediaUrl);
    const klien = doc.Klien;
    const palapaKlien: PalapaKlienSectionPayload | null =
      klien && Array.isArray(klien.cards) && klien.cards.length > 0
        ? {
            badge: klien.badge,
            title: klien.title,
            rating: klien.rating,
            cards: klien.cards.map(mapPalapaCard),
          }
        : null;

    return { hero, palapaKlien };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[getPalapaPage] Gagal:",
        err instanceof Error ? err.message : err,
      );
    }
    return { hero: null, palapaKlien: null };
  }
}

interface PalapaDetailCategoryItem {
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

/** Fetch Palapa detail categories */
export async function getPalapaDetailCategories(
  options?: GetPalapaPageOptions,
): Promise<ProductDetailData> {
  try {
    const requestOptions = {
      revalidate: options?.revalidate ?? 0,
      timeoutMs: options?.timeoutMs ?? 30000,
      retries: options?.retries ?? 4,
    };
    const res = await fetchApi<{ data: unknown }>(
      `palapa-detail-categories?${POPULATE_CATEGORIES}`,
      requestOptions,
    );
    const data = res?.data;
    const list = Array.isArray(data) ? data : [];
    const rawCategories: PalapaDetailCategoryItem[] = list
      .map((item) => normalizeDoc<PalapaDetailCategoryItem>(item))
      .filter((c): c is PalapaDetailCategoryItem => c != null);
    return fillDefaultDetailImages(
      mapStrapiCategoriesToDetailData(rawCategories, getStrapiMediaUrl),
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[getPalapaDetailCategories] Gagal:",
        err instanceof Error ? err.message : err,
      );
    }
    return { categories: [] };
  }
}
