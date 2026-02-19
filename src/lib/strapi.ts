import type {
  StrapiResponse,
  StrapiHomepageData,
  StrapiGlobalData,
  StrapiProductData,
  StrapiClientData,
  StrapiGalleryData,
  StrapiMedia,
  StrapiProductPageData,
  StrapiProductPageCategory,
  StrapiProductPageBlock,
} from "@/types/strapi";
import type { ProductHeroData } from "@/data/productsPageData";
import type {
  ProductDetailData,
  ProductDetailCategory,
  ProductSubMenu,
  ProductTab,
  TabContent,
  ContentBlock,
} from "@/data/productDetailData";
import {
  DEFAULT_HERO_IMAGE,
  DEFAULT_LOGO,
} from "@/data/productsPageData";

export function getStrapiUrl(): string {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

/** Resolve full URL for Strapi media (object with url or path string) */
export function getStrapiMediaUrl(media: StrapiMedia | undefined): string {
  if (!media) return "";
  const url = typeof media === "object" && media !== null && "url" in media ? media.url : "";
  if (!url) return "";
  return url.startsWith("http") ? url : `${getStrapiUrl()}${url.startsWith("/") ? "" : "/"}${url}`;
}

export type FetchApiOptions = {
  /** ISR: revalidate in seconds. Menu/nav jarang berubah bisa 300; konten halaman 60. */
  revalidate?: number;
};

export async function fetchApi<T>(path: string, options?: FetchApiOptions): Promise<T> {
  const baseUrl = getStrapiUrl();
  const url = path.startsWith("http") ? path : `${baseUrl}/api/${path}`;
  const revalidate = options?.revalidate ?? 60;
  const res = await fetch(url, {
    next: { revalidate },
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

/** Normalize Strapi 5 response: data can be object with attributes or flattened */
function normalizeDoc<T extends object>(raw: unknown): T | null {
  if (raw === null || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  if (obj.attributes && typeof obj.attributes === "object") {
    return { ...(obj as object), ...(obj.attributes as object) } as T;
  }
  return obj as T;
}

export async function getGlobal(): Promise<StrapiGlobalData | null> {
  try {
    const res = await fetchApi<{ data: unknown }>("global?populate[0]=navbarLogo&populate[1]=favicon");
    const data = res?.data;
    return normalizeDoc<StrapiGlobalData>(data) ?? null;
  } catch {
    return null;
  }
}

export async function getHomepage(): Promise<StrapiHomepageData | null> {
  try {
    const res = await fetchApi<{ data: unknown }>(
      "homepage?populate[0]=heroSlides&populate[1]=heroSlides.logo&populate[2]=about&populate[3]=aboutStats&populate[4]=produkSection&populate[5]=klienSection&populate[6]=klienStats&populate[7]=galeriSection&populate[8]=artikelSection&populate[9]=featuredProducts&populate[10]=featuredClients&populate[11]=featuredGallery&populate[12]=featuredArticles"
    );
    const data = res?.data;
    const out = normalizeDoc<StrapiHomepageData>(data) ?? null;
    if (process.env.NODE_ENV === "development") {
      if (out) {
        console.log("[getHomepage] OK");
      } else {
        console.warn("[getHomepage] Response kosong atau format tidak dikenali. res?.data:", data === null ? "null" : typeof data);
      }
    }
    return out;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getHomepage] Gagal fetch:", err instanceof Error ? err.message : err);
    }
    return null;
  }
}

export async function getProducts(): Promise<StrapiProductData[]> {
  try {
    const res = await fetchApi<{ data: unknown }>("products?sort[0]=order&pagination[pageSize]=12&populate=image");
    const data = res?.data;
    if (!Array.isArray(data)) return [];
    return data.map((item) => normalizeDoc<StrapiProductData>(item) ?? ({} as StrapiProductData)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getClients(): Promise<StrapiClientData[]> {
  try {
    const res = await fetchApi<{ data: unknown }>("clients?sort[0]=order&pagination[pageSize]=20&populate=logo");
    const data = res?.data;
    if (!Array.isArray(data)) return [];
    return data.map((item) => normalizeDoc<StrapiClientData>(item) ?? ({} as StrapiClientData)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getGallery(): Promise<StrapiGalleryData[]> {
  try {
    const res = await fetchApi<{ data: unknown }>("galleries?sort[0]=order&pagination[pageSize]=20&populate=image");
    const data = res?.data;
    if (!Array.isArray(data)) return [];
    return data.map((item) => normalizeDoc<StrapiGalleryData>(item) ?? ({} as StrapiGalleryData)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getArticles(): Promise<
  StrapiResponse<Array<{ id: number; documentId: string; attributes: Record<string, unknown> }>>
> {
  try {
    const res = await fetchApi<StrapiResponse<Array<{ id: number; documentId: string; attributes: Record<string, unknown> }>>>(
      "articles?populate=*&pagination[pageSize]=4&sort[0]=publishedAt:desc"
    );
    const list = Array.isArray(res?.data) ? res.data : [];
    if (process.env.NODE_ENV === "development") {
      console.log("[getArticles] OK, count:", list.length, "items");
    }
    return res ?? { data: [] };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getArticles] Gagal fetch:", err instanceof Error ? err.message : err);
    }
    return { data: [] };
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<StrapiResponse<{ id: number; documentId: string; attributes: Record<string, unknown> } | null>> {
  try {
    const encodedSlug = encodeURIComponent(slug);
    return await fetchApi(
      `articles?filters[slug][$eq]=${encodedSlug}&populate=*`
    );
  } catch {
    return { data: null };
  }
}

const DEFAULT_TAB_IMAGE = DEFAULT_HERO_IMAGE;

/** Map block dari Strapi dynamic zone ke ContentBlock. */
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

/** Map categories dari Strapi (struktur baru) ke ProductDetailData. */
function mapStrapiCategoriesToDetailData(
  categories: StrapiProductPageCategory[] | undefined,
  getMediaUrl: (m: StrapiMedia | undefined) => string
): ProductDetailData {
  if (!Array.isArray(categories) || categories.length === 0) {
    return { categories: [] };
  }
  const out: ProductDetailCategory[] = categories.map((cat) => {
    const subMenus: ProductSubMenu[] = (cat.subMenus ?? []).map((sub, subIdx) => {
      const tabs: ProductTab[] = (sub.tabs ?? []).map((tab, tabIdx) => {
        const c = tab.content;
        const description = c?.description ?? "";
        const image = c?.image ? getMediaUrl(c.image) : "";
        const details = Array.isArray(c?.details) ? c.details : [];
        const blocks: ContentBlock[] = (c?.blocks ?? [])
          .map((b) => mapStrapiBlockToContentBlock(b))
          .filter((x): x is ContentBlock => x != null);
        const content: TabContent = {
          description,
          image: image || DEFAULT_TAB_IMAGE,
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
      id: cat.categoryId ?? `cat-${cat.label ?? "unknown"}`,
      label: cat.label ?? "",
      megaMenuChildId: cat.megaMenuChildId,
      sidebarAsFlat: cat.sidebarAsFlat ?? false,
      subMenus,
    };
  });
  return { categories: out };
}

/** Isi image kosong di tab content dengan default. */
function fillDefaultDetailImages(detail: ProductDetailData): ProductDetailData {
  const categories = detail.categories.map((cat) => ({
    ...cat,
    subMenus: cat.subMenus.map((sub) => ({
      ...sub,
      tabs: sub.tabs.map((tab) => ({
        ...tab,
        content: {
          ...tab.content,
          image: tab.content.image?.trim() ? tab.content.image : DEFAULT_TAB_IMAGE,
        },
      })),
    })),
  }));
  return { categories };
}

export type GetProductPageBySlugOptions = { revalidate?: number };

/**
 * Fetch product page dari Strapi by slug. Map ke { hero, detail }.
 * Prefer struktur baru (categories); fallback ke detail JSON (legacy).
 * Return null jika tidak ada data atau hero tidak ada.
 */
/** Di production (Vercel) jangan fetch ke localhost; pakai fallback. */
function isStrapiReachable(): boolean {
  const url = getStrapiUrl();
  if (url.startsWith("http://localhost") || url.startsWith("http://127.0.0.1")) {
    return process.env.NODE_ENV === "development";
  }
  return true;
}

export async function getProductPageBySlug(
  slug: string,
  options?: GetProductPageBySlugOptions
): Promise<{ hero: ProductHeroData; detail: ProductDetailData } | null> {
  if (!isStrapiReachable()) return null;
  try {
    const encodedSlug = encodeURIComponent(slug);
    const revalidate = options?.revalidate ?? 60;
    const populate =
      "populate[0]=hero&populate[1]=hero.paragraphs&populate[2]=hero.logo&populate[3]=hero.heroImage" +
      "&populate[4]=categories&populate[5]=categories.subMenus&populate[6]=categories.subMenus.tabs" +
      "&populate[7]=categories.subMenus.tabs.content&populate[8]=categories.subMenus.tabs.content.image" +
      "&populate[9]=categories.subMenus.tabs.content.blocks";
    const res = await fetchApi<{ data: unknown }>(
      `product-pages?filters[slug][$eq]=${encodedSlug}&${populate}`,
      { revalidate }
    );
    const data = res?.data;
    const list = Array.isArray(data) ? data : [];
    const raw = list[0];
    if (!raw) return null;
    const doc = normalizeDoc<StrapiProductPageData>(raw);
    if (!doc?.slug) return null;

    const heroAttr = doc.hero;
    const paragraphs: string[] = Array.isArray(heroAttr?.paragraphs)
      ? heroAttr.paragraphs
          .map((p) => (p && typeof p === "object" && "text" in p ? (p as { text?: string }).text : undefined))
          .filter((t): t is string => typeof t === "string" && t.length > 0)
      : [];
    const hero: ProductHeroData = {
      title: heroAttr?.title?.trim() ?? "",
      paragraphs: paragraphs.length > 0 ? paragraphs : [""],
      demoUrl: heroAttr?.demoUrl?.trim() || undefined,
      logoUrl: getStrapiMediaUrl(heroAttr?.logo) || DEFAULT_LOGO,
      heroImageUrl: getStrapiMediaUrl(heroAttr?.heroImage) || DEFAULT_HERO_IMAGE,
    };

    let detail: ProductDetailData;
    if (Array.isArray(doc.categories) && doc.categories.length > 0) {
      detail = fillDefaultDetailImages(
        mapStrapiCategoriesToDetailData(doc.categories, getStrapiMediaUrl)
      );
    } else if (doc.detail && typeof doc.detail === "object" && Array.isArray((doc.detail as { categories?: unknown[] }).categories)) {
      const legacyCategories = (doc.detail as { categories: unknown[] }).categories;
      detail = fillDefaultDetailImages({
        categories: (legacyCategories.length > 0 ? legacyCategories : []) as ProductDetailData["categories"],
      });
    } else {
      detail = { categories: [] };
    }

    return { hero, detail };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getProductPageBySlug] Gagal:", err instanceof Error ? err.message : err);
    }
    return null;
  }
}
