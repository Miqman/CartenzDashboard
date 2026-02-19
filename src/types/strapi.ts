export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** Media from Strapi (object with url or raw) */
export type StrapiMedia = { url: string; alternativeText?: string } | null;

/** Global (single type) - site settings */
export interface StrapiGlobalData {
  siteName?: string;
  favicon?: StrapiMedia;
  navbarLogo?: StrapiMedia;
  siteDescription?: string;
  defaultSeo?: unknown;
}

export interface StrapiArticleAttributes {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  cover?: StrapiMedia;
  category?: { name?: string };
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  attributes: StrapiArticleAttributes;
}

export type StrapiArticleList = StrapiArticle[];
export type StrapiArticleSingle = StrapiArticle;

// --- Homepage (single type) & beranda sections ---
export interface StrapiHeroSlide {
  title?: string;
  solutions?: string[];
  logo?: StrapiMedia;
}

export interface StrapiAboutSection {
  badge?: string;
  title?: string;
  paragraph?: string;
  ctaLabel?: string;
  employeeCount?: string;
}

export interface StrapiStatItem {
  value?: string;
  label?: string;
}

export interface StrapiSectionProduk {
  badge?: string;
  title?: string;
  viewMoreLabel?: string;
}

export interface StrapiSectionKlien {
  badge?: string;
  title?: string;
}

export interface StrapiSectionGaleri {
  badge?: string;
  title?: string;
}

export interface StrapiSectionArtikel {
  badge?: string;
  title?: string;
  viewMoreLabel?: string;
}

export interface StrapiHomepageData {
  documentId?: string;
  heroSlides?: StrapiHeroSlide[];
  about?: StrapiAboutSection;
  aboutStats?: StrapiStatItem[];
  produkSection?: StrapiSectionProduk;
  klienSection?: StrapiSectionKlien;
  klienStats?: StrapiStatItem[];
  galeriSection?: StrapiSectionGaleri;
  artikelSection?: StrapiSectionArtikel;
}

export interface StrapiProductData {
  documentId?: string;
  title?: string;
  category?: string;
  order?: number;
  image?: StrapiMedia;
}

export interface StrapiClientData {
  documentId?: string;
  name?: string;
  order?: number;
  logo?: StrapiMedia;
}

export interface StrapiGalleryData {
  documentId?: string;
  caption?: string;
  subtitle?: string;
  order?: number;
  image?: StrapiMedia;
}

// --- Product Page (collection) - halaman produk per slug ---
export interface StrapiProductPageParagraph {
  text?: string;
}

export interface StrapiProductPageHero {
  title?: string;
  paragraphs?: StrapiProductPageParagraph[];
  demoUrl?: string;
  logo?: StrapiMedia;
  heroImage?: StrapiMedia;
}

export interface StrapiProductPageData {
  documentId?: string;
  slug?: string;
  hero?: StrapiProductPageHero;
  detail?: { categories?: unknown[] };
}
