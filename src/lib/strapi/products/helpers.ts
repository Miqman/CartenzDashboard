/**
 * Helper mapping response Strapi (product-page hero, detail-categories) ke format frontend.
 * Dipakai oleh modul efd, palapa, smartgov.
 */

import type { StrapiMedia } from "@/types/strapi";
import type { StrapiProductPageBlock } from "@/types/strapi";
import type { ProductHeroData } from "@/data/productsPageData";
import type {
  ProductDetailData,
  ProductDetailCategory,
  ProductSubMenu,
  ProductTab,
  TabContent,
  ContentBlock,
} from "@/data/productDetailData";
import { DEFAULT_HERO_IMAGE, DEFAULT_LOGO } from "@/data/productsPageData";

/** Normalize Strapi 5 response: data can be object with attributes or flattened */
export function normalizeDoc<T extends object>(raw: unknown): T | null {
  if (raw === null || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  if (obj.attributes && typeof obj.attributes === "object") {
    return { ...(obj as object), ...(obj.attributes as object) } as T;
  }
  return obj as T;
}

/** Map block dari Strapi dynamic zone ke ContentBlock */
function mapStrapiBlockToContentBlock(block: StrapiProductPageBlock): ContentBlock | null {
  if (!block || typeof block !== "object") return null;
  const comp = (block as { __component?: string }).__component;
  if (comp === "product-page.block-paragraph") {
    const b = block as { text?: string };
    return { type: "paragraph", text: b.text ?? "" };
  }
  if (comp === "product-page.block-heading") {
    const b = block as { text?: string; level?: 1 | 2 | 3 | 4 | string };
    const level = b.level != null ? (typeof b.level === "string" ? parseInt(b.level, 10) : b.level) : 4;
    const levelNum = (level >= 1 && level <= 4 ? level : 4) as 1 | 2 | 3 | 4;
    return { type: "heading", text: b.text ?? "", level: levelNum };
  }
  if (comp === "product-page.block-list") {
    const b = block as { title?: string; items?: string[] };
    return { type: "list", title: b.title, items: Array.isArray(b.items) ? b.items : [] };
  }
  return null;
}

/** Strapi category/subMenu/tab shape (dari detail-categories collection). Dipakai oleh efd, palapa, smartgov. */
export interface StrapiCategoryRaw {
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
        image?: StrapiMedia | { url?: string };
        details?: string[];
        blocks?: unknown[];
      };
    }>;
  }>;
}

/** Map categories dari Strapi (detail-categories) ke ProductDetailData */
export function mapStrapiCategoriesToDetailData(
  categories: StrapiCategoryRaw[] | undefined,
  getMediaUrl: (m: StrapiMedia | undefined) => string
): ProductDetailData {
  if (!Array.isArray(categories) || categories.length === 0) {
    return { categories: [] };
  }
  const out: ProductDetailCategory[] = categories.map((cat, catIdx) => {
    const subMenus: ProductSubMenu[] = (cat.subMenus ?? []).map((sub, subIdx) => {
      const tabs: ProductTab[] = (sub.tabs ?? []).map((tab, tabIdx) => {
        const c = tab.content;
        const description = c?.description ?? "";
        const image = c?.image ? getMediaUrl(c.image as StrapiMedia) : "";
        const details = Array.isArray(c?.details) ? c.details : [];
        const blocks: ContentBlock[] = (c?.blocks ?? [])
          .map((b) => mapStrapiBlockToContentBlock(b as StrapiProductPageBlock))
          .filter((x): x is ContentBlock => x != null);
        const content: TabContent = {
          description,
          image: image || DEFAULT_HERO_IMAGE,
          details,
          blocks: blocks.length > 0 ? blocks : undefined,
        };
        return {
          tabId: `tab-${tabIdx + 1}`,
          tabLabel: tab.tabLabel ?? "",
          content,
        };
      });
      return {
        id: sub.subSlug ?? `sub-${subIdx}`,
        title: sub.title ?? "",
        tabs,
      };
    });
    return {
      id: cat.categoryId ?? `cat-${catIdx}`,
      label: cat.label ?? "",
      megaMenuChildId: cat.megaMenuChildId,
      sidebarAsFlat: cat.sidebarAsFlat ?? false,
      subMenus,
    };
  });
  return { categories: out };
}

/** Isi image kosong di tab content dengan default */
export function fillDefaultDetailImages(detail: ProductDetailData): ProductDetailData {
  const categories = detail.categories.map((cat) => ({
    ...cat,
    subMenus: cat.subMenus.map((sub) => ({
      ...sub,
      tabs: sub.tabs.map((tab) => ({
        ...tab,
        content: {
          ...tab.content,
          image: tab.content.image?.trim() ? tab.content.image : DEFAULT_HERO_IMAGE,
        },
      })),
    })),
  }));
  return { categories };
}

/** Map Hero component Strapi (product-page.hero) ke ProductHeroData */
export function mapStrapiHeroToProductHero(
  hero: { title?: string; paragraphs?: Array<{ text?: string }>; demoUrl?: string; logo?: StrapiMedia; heroImage?: StrapiMedia } | undefined,
  getMediaUrl: (m: StrapiMedia | undefined) => string
): ProductHeroData | null {
  if (!hero) return null;
  const paragraphs: string[] = Array.isArray(hero.paragraphs)
    ? hero.paragraphs
        .map((p) => (p && typeof p === "object" && "text" in p ? (p as { text?: string }).text : undefined))
        .filter((t): t is string => typeof t === "string" && t.length > 0)
    : [];
  return {
    title: hero.title?.trim() ?? "",
    paragraphs: paragraphs.length > 0 ? paragraphs : [""],
    demoUrl: hero.demoUrl?.trim() || undefined,
    logoUrl: getMediaUrl(hero.logo) || DEFAULT_LOGO,
    heroImageUrl: getMediaUrl(hero.heroImage) || DEFAULT_HERO_IMAGE,
  };
}
