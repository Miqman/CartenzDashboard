/**
 * API Strapi untuk halaman produk Strategic Consulting.
 * Endpoint: strategic-consulting-page (single). Tidak ada detail-categories.
 */

import { fetchApi, getStrapiMediaUrl } from "@/lib/strapi";
import type { StrapiStrategicConsultingPageData } from "./types";
import type { ProductHeroData } from "@/data/productsPageData";
import type { ProductClientsData } from "@/data/productClientsData";
import type { StrategicConsultingProject } from "@/data/strategicConsultingProjectsData";
import { normalizeDoc, mapStrapiHeroToProductHero } from "./helpers";

const POPULATE_PAGE =
  "populate[0]=Hero&populate[1]=Hero.paragraphs&populate[2]=Hero.logo&populate[3]=Hero.heroImage&populate[4]=ProjectCard&populate[5]=ProjectCard.logo&populate[6]=ProjectCard.image&populate[7]=clients&populate[8]=clients.logo";

export type GetStrategicConsultingPageOptions = {
  revalidate?: number;
  timeoutMs?: number;
  retries?: number;
};

/** Fetch Strategic Consulting page (single type): Hero + ProjectCard[] + clients */
export async function getStrategicConsultingPage(options?: GetStrategicConsultingPageOptions): Promise<{
  hero: ProductHeroData | null;
  clients: ProductClientsData | null;
  strategicProjects: StrategicConsultingProject[] | null;
}> {
  try {
    const requestOptions = {
      revalidate: options?.revalidate ?? 0,
      timeoutMs: options?.timeoutMs ?? 30000,
      retries: options?.retries ?? 4,
    };
    const res = await fetchApi<{ data: unknown }>(
      `strategic-consulting-page?${POPULATE_PAGE}`,
      requestOptions
    );
    const doc = normalizeDoc<StrapiStrategicConsultingPageData>(res?.data);
    if (!doc) return { hero: null, clients: null, strategicProjects: null };

    const hero = mapStrapiHeroToProductHero(doc.Hero, getStrapiMediaUrl);

    const clientsList = Array.isArray(doc.clients) ? doc.clients : [];
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

    const projectCards = Array.isArray(doc.ProjectCard) ? doc.ProjectCard : [];
    const strategicProjects: StrategicConsultingProject[] | null =
      projectCards.length > 0
        ? projectCards.map((p, i) => ({
            id: `strapi-${i}-${p.name ?? "project"}`,
            logoUrl: getStrapiMediaUrl(p.logo) || "",
            name: p.name ?? "",
            imageUrl: getStrapiMediaUrl(p.image) || "",
            productUrl: p.product_url ?? "#",
          }))
        : null;

    return { hero, clients, strategicProjects };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getStrategicConsultingPage] Gagal:", err instanceof Error ? err.message : err);
    }
    return { hero: null, clients: null, strategicProjects: null };
  }
}
