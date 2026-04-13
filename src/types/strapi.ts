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
  linkProdukHero?: string;
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

export interface StrapiSectionTestimoni {
  text?: string;
  name?: string;
  posisi?: string;
  foto?: StrapiMedia;
}

export interface StrapiHomepageData {
  documentId?: string;
  heroSlides?: StrapiHeroSlide[];
  about?: StrapiAboutSection;
  aboutStats?: StrapiStatItem[];
  produkSection?: StrapiSectionProduk;
  klienSection?: StrapiSectionKlien;
  klienStats?: StrapiStatItem[];
  testimoniSection?: StrapiSectionTestimoni[];
  galeriSection?: StrapiSectionGaleri;
  artikelSection?: StrapiSectionArtikel;
}

export interface StrapiProductData {
  documentId?: string;
  title?: string;
  category?: string;
  order?: number;
  image?: StrapiMedia;
  urlProduk?: string;
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

/** Block dalam dynamic zone: __component + fields */
export interface StrapiProductPageBlockParagraph {
  __component?: "product-page.block-paragraph";
  text?: string;
}
export interface StrapiProductPageBlockHeading {
  __component?: "product-page.block-heading";
  text?: string;
  /** Di Strapi disimpan sebagai string "1"|"2"|"3"|"4"; di frontend dipetakan ke number. */
  level?: 1 | 2 | 3 | 4 | string;
}
export interface StrapiProductPageBlockList {
  __component?: "product-page.block-list";
  title?: string;
  items?: string[];
}

export type StrapiProductPageBlock =
  | StrapiProductPageBlockParagraph
  | StrapiProductPageBlockHeading
  | StrapiProductPageBlockList;

export interface StrapiProductPageTabContent {
  description?: string;
  image?: StrapiMedia;
  details?: string[];
  blocks?: StrapiProductPageBlock[];
}

export interface StrapiProductPageTab {
  tabLabel?: string;
  content?: StrapiProductPageTabContent;
}

export interface StrapiProductPageSubMenu {
  /** Nama field di Strapi: subSlug (id reserved). Dipetakan ke id di frontend. */
  subSlug?: string;
  title?: string;
  tabs?: StrapiProductPageTab[];
}

export interface StrapiProductPageCategory {
  /** Nama field di Strapi: categoryId (id reserved). Dipetakan ke id di frontend. */
  categoryId?: string;
  label?: string;
  megaMenuChildId?: string;
  sidebarAsFlat?: boolean;
  subMenus?: StrapiProductPageSubMenu[];
}

export interface StrapiProductPageData {
  documentId?: string;
  slug?: string;
  hero?: StrapiProductPageHero;
  /** Baru: struktur berjenjang dari CMS */
  categories?: StrapiProductPageCategory[];
  /** Legacy: JSON fallback */
  detail?: { categories?: unknown[] };
}
