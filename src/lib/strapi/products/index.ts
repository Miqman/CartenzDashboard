/**
 * Entry point API halaman produk. Satu panggilan getProductPageData(productSlug)
 * yang mengarah ke API per produk (efd, palapa, smartgov, strategic-consulting).
 * Fallback ke data lokal jika Strapi kosong/error.
 */

import { getProductDetailData } from "@/data/productDetailData";
import { getProductClients } from "@/data/productClientsData";
import { getProductHero } from "@/data/productsPageData";
import { STRATEGIC_CONSULTING_PROJECTS } from "@/data/strategicConsultingProjectsData";
import {
  PALAPA_KLIEN_CARDS,
  PALAPA_KLIEN_SECTION,
} from "@/data/palapaKlienCardData";
import type { ProductPagePayload } from "./types";
import { getEfdPage, getEfdDetailCategories } from "./efd";
import { getPalapaPage, getPalapaDetailCategories } from "./palapa";
import { getSmartgovPage, getSmartgovDetailCategories } from "./smartgov";
import { getStrategicConsultingPage } from "./strategic-consulting";

export type GetProductPageDataOptions = { revalidate?: number };

/**
 * Mengambil data halaman produk dari Strapi (API per produk).
 * Return hero, detail (categories), clients, strategicProjects, palapaKlien.
 * Jika Strapi kosong/error, fallback ke data lokal (productDetailData, productClientsData, dll).
 */
export async function getProductPageData(
  productSlug: string,
  options?: GetProductPageDataOptions
): Promise<ProductPagePayload> {
  const fallbackDetail = getProductDetailData(productSlug);
  const fallbackClients = getProductClients(productSlug);
  const fallbackHero = getProductHero(productSlug);

  const revalidate = options?.revalidate ?? 60;

  switch (productSlug) {
    case "efd": {
      const [page, detail] = await Promise.all([
        getEfdPage({ revalidate }),
        getEfdDetailCategories({ revalidate }),
      ]);
      return {
        hero: page.hero ?? fallbackHero,
        detail: detail.categories.length > 0 ? detail : fallbackDetail,
        clients: page.clients ?? fallbackClients ?? null,
        strategicProjects: null,
        palapaKlien: null,
      };
    }
    case "palapa": {
      const [page, detail] = await Promise.all([
        getPalapaPage({ revalidate }),
        getPalapaDetailCategories({ revalidate }),
      ]);
      return {
        hero: page.hero ?? fallbackHero,
        detail: detail.categories.length > 0 ? detail : fallbackDetail,
        clients: null,
        strategicProjects: null,
        palapaKlien:
          page.palapaKlien ??
          {
            badge: PALAPA_KLIEN_SECTION.badge,
            title: PALAPA_KLIEN_SECTION.title,
            rating: PALAPA_KLIEN_SECTION.rating,
            cards: PALAPA_KLIEN_CARDS,
          },
      };
    }
    case "smartgov": {
      const [page, detail] = await Promise.all([
        getSmartgovPage({ revalidate }),
        getSmartgovDetailCategories({ revalidate }),
      ]);
      return {
        hero: page.hero ?? fallbackHero,
        detail: detail.categories.length > 0 ? detail : fallbackDetail,
        clients: page.clients ?? fallbackClients ?? null,
        strategicProjects: null,
        palapaKlien: null,
      };
    }
    case "strategic-consulting": {
      const page = await getStrategicConsultingPage({ revalidate });
      return {
        hero: page.hero ?? fallbackHero,
        detail: { categories: [] },
        clients: page.clients ?? fallbackClients ?? null,
        strategicProjects: page.strategicProjects ?? STRATEGIC_CONSULTING_PROJECTS,
        palapaKlien: null,
      };
    }
    default:
      return {
        hero: fallbackHero,
        detail: fallbackDetail,
        clients: fallbackClients ?? null,
        strategicProjects: null,
        palapaKlien: null,
      };
  }
}

export { getEfdPage, getEfdDetailCategories } from "./efd";
export { getPalapaPage, getPalapaDetailCategories } from "./palapa";
export { getSmartgovPage, getSmartgovDetailCategories } from "./smartgov";
export { getStrategicConsultingPage } from "./strategic-consulting";
export type { ProductPagePayload, PalapaKlienSectionPayload } from "./types";
