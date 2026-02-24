/**
 * Tipe response & payload untuk API halaman produk per produk (efd, palapa, smartgov, strategic-consulting).
 * Shared types untuk mapping ke format frontend.
 */

import type { StrapiMedia } from "@/types/strapi";
import type { ProductHeroData } from "@/data/productsPageData";
import type { ProductDetailData } from "@/data/productDetailData";
import type { ProductClientsData } from "@/data/productClientsData";
import type { StrategicConsultingProject } from "@/data/strategicConsultingProjectsData";
import type { PalapaKlienCardItem } from "@/data/palapaKlienCardData";

/** Section klien Palapa: badge, title, rating + daftar cards. */
export interface PalapaKlienSectionPayload {
  badge?: string;
  title?: string;
  rating?: string;
  cards: PalapaKlienCardItem[];
}

/** Hasil gabungan dari getProductPageData(productSlug) untuk dipakai di halaman produk. */
export interface ProductPagePayload {
  hero: ProductHeroData | null;
  detail: ProductDetailData;
  clients: ProductClientsData | null;
  strategicProjects: StrategicConsultingProject[] | null;
  palapaKlien: PalapaKlienSectionPayload | null;
}

/** Response Strapi: single type dengan Hero (product-page.hero). */
export interface StrapiProductHeroComponent {
  title?: string;
  paragraphs?: Array<{ text?: string }>;
  demoUrl?: string;
  logo?: StrapiMedia;
  heroImage?: StrapiMedia;
}

/** EFD / Smartgov page: Hero + featuredClients (relation). */
export interface StrapiEfdPageData {
  Hero?: StrapiProductHeroComponent;
  featuredClients?: Array<{ documentId?: string; name?: string; logo?: StrapiMedia }>;
}

/** Palapa page: Hero + Klien (component palapa-klien-section). */
export interface StrapiPalapaKlienCard {
  image?: StrapiMedia;
  logo?: StrapiMedia;
  title?: string;
  nama_daerah?: string;
  produk_url?: string;
}

export interface StrapiPalapaKlienSection {
  badge?: string;
  title?: string;
  rating?: string;
  cards?: StrapiPalapaKlienCard[];
}

export interface StrapiPalapaPageData {
  Hero?: StrapiProductHeroComponent;
  Klien?: StrapiPalapaKlienSection;
}

/** Strategic consulting page: Hero + ProjectCard[] + clients. */
export interface StrapiStrategicProjectComponent {
  logo?: StrapiMedia;
  image?: StrapiMedia;
  name?: string;
  product_url?: string;
}

export interface StrapiStrategicConsultingPageData {
  Hero?: StrapiProductHeroComponent;
  ProjectCard?: StrapiStrategicProjectComponent[];
  clients?: Array<{ documentId?: string; name?: string; logo?: StrapiMedia }>;
}
