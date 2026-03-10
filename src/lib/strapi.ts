import type {
  StrapiResponse,
  StrapiHomepageData,
  StrapiGlobalData,
  StrapiProductData,
  StrapiClientData,
  StrapiGalleryData,
  StrapiMedia,
} from "@/types/strapi";
import type { MegaMenuItem } from "@/data/megaMenuData";

export function getStrapiUrl(): string {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

/** Resolve full URL for Strapi media (object with url or path string) */
export function getStrapiMediaUrl(media: StrapiMedia | undefined): string {
  if (!media) return "";
  const url =
    typeof media === "object" && media !== null && "url" in media
      ? media.url
      : "";
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${getStrapiUrl()}${url.startsWith("/") ? "" : "/"}${url}`;
}

export type FetchApiOptions = {
  /** ISR: revalidate in seconds. Menu/nav jarang berubah bisa 300; konten halaman 60. */
  revalidate?: number;
  /** AbortSignal mis. AbortSignal.timeout(ms) agar tidak hang di Vercel. */
  signal?: AbortSignal;
};

export async function fetchApi<T>(
  path: string,
  options?: FetchApiOptions,
): Promise<T> {
  const baseUrl = getStrapiUrl();
  const url = path.startsWith("http") ? path : `${baseUrl}/api/${path}`;
  const revalidate = options?.revalidate ?? 60;
  const res = await fetch(url, {
    next: { revalidate },
    signal: options?.signal,
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
    const res = await fetchApi<{ data: unknown }>(
      "global?populate[0]=navbarLogo&populate[1]=favicon",
      { revalidate: 600 },
    );
    const data = res?.data;
    return normalizeDoc<StrapiGlobalData>(data) ?? null;
  } catch {
    return null;
  }
}

export async function getHomepage(): Promise<StrapiHomepageData | null> {
  try {
    const res = await fetchApi<{ data: unknown }>(
      "homepage?populate[0]=heroSlides&populate[1]=heroSlides.logo&populate[2]=about&populate[3]=aboutStats&populate[4]=produkSection&populate[5]=klienSection&populate[6]=klienStats&populate[7]=galeriSection&populate[8]=artikelSection&populate[9]=featuredProducts&populate[10]=featuredClients&populate[11]=featuredGallery&populate[12]=featuredArticles",
      { revalidate: 300 },
    );
    const data = res?.data;
    const out = normalizeDoc<StrapiHomepageData>(data) ?? null;
    if (process.env.NODE_ENV === "development") {
      if (out) {
        console.log("[getHomepage] OK");
      } else {
        console.warn(
          "[getHomepage] Response kosong atau format tidak dikenali. res?.data:",
          data === null ? "null" : typeof data,
        );
      }
    }
    return out;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[getHomepage] Gagal fetch:",
        err instanceof Error ? err.message : err,
      );
    }
    return null;
  }
}

export async function getProducts(): Promise<StrapiProductData[]> {
  try {
    const res = await fetchApi<{ data: unknown }>(
      "products?sort[0]=order&pagination[pageSize]=12&populate=image",
      { revalidate: 300 },
    );
    const data = res?.data;
    if (!Array.isArray(data)) return [];
    return data
      .map(
        (item) =>
          normalizeDoc<StrapiProductData>(item) ?? ({} as StrapiProductData),
      )
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function getClients(): Promise<StrapiClientData[]> {
  try {
    const res = await fetchApi<{ data: unknown }>(
      "clients?sort[0]=order&pagination[pageSize]=20&populate=logo",
      { revalidate: 300 },
    );
    const data = res?.data;
    if (!Array.isArray(data)) return [];
    return data
      .map(
        (item) =>
          normalizeDoc<StrapiClientData>(item) ?? ({} as StrapiClientData),
      )
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function getGallery(): Promise<StrapiGalleryData[]> {
  try {
    const res = await fetchApi<{ data: unknown }>(
      "galleries?sort[0]=order&pagination[pageSize]=20&populate=image",
      { revalidate: 300 },
    );
    const data = res?.data;
    if (!Array.isArray(data)) return [];
    return data
      .map(
        (item) =>
          normalizeDoc<StrapiGalleryData>(item) ?? ({} as StrapiGalleryData),
      )
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function getArticles(): Promise<
  StrapiResponse<
    Array<{
      id: number;
      documentId: string;
      attributes: Record<string, unknown>;
    }>
  >
> {
  try {
    const res = await fetchApi<
      StrapiResponse<
        Array<{
          id: number;
          documentId: string;
          attributes: Record<string, unknown>;
        }>
      >
    >("articles?populate=*&pagination[pageSize]=4&sort[0]=publishedAt:desc", {
      revalidate: 300,
    });
    const list = Array.isArray(res?.data) ? res.data : [];
    if (process.env.NODE_ENV === "development") {
      console.log("[getArticles] OK, count:", list.length, "items");
    }
    return res ?? { data: [] };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[getArticles] Gagal fetch:",
        err instanceof Error ? err.message : err,
      );
    }
    return { data: [] };
  }
}

export async function getArticleBySlug(
  slug: string,
): Promise<
  StrapiResponse<{
    id: number;
    documentId: string;
    attributes: Record<string, unknown>;
  } | null>
> {
  try {
    const encodedSlug = encodeURIComponent(slug);
    return await fetchApi(
      `articles?filters[slug][$eq]=${encodedSlug}&populate=*`,
    );
  } catch {
    return { data: null };
  }
}

type StrapiMegaMenuDetail = { title?: unknown; itemsText?: unknown };
type StrapiMegaMenuChild = {
  childId?: unknown;
  label?: unknown;
  contentTitle?: unknown;
  contentSubtitle?: unknown;
  details?: unknown;
};
type StrapiMegaMenuItem = {
  itemId?: unknown;
  label?: unknown;
  menuType?: unknown;
  children?: unknown;
};
type StrapiMegaMenuDoc = { items?: unknown };

function splitItemsText(value: unknown): string[] {
  if (typeof value !== "string") return [];
  return value
    .split(/\r?\n/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function getMegaMenuItems(): Promise<MegaMenuItem[]> {
  try {
    const res = await fetchApi<{ data: unknown }>(
      "mega-menu?populate[items][populate][children][populate]=details",
      { revalidate: 300 },
    );
    const doc = normalizeDoc<StrapiMegaMenuDoc>(res?.data) ?? null;
    const rawItems = doc?.items;
    if (!Array.isArray(rawItems)) return [];

    return rawItems
      .map((raw): MegaMenuItem | null => {
        const item = raw as StrapiMegaMenuItem;
        const id = typeof item.itemId === "string" ? item.itemId : null;
        const label = typeof item.label === "string" ? item.label : null;
        const menuType =
          item.menuType === "nested" ||
          item.menuType === "flat" ||
          item.menuType === "single"
            ? item.menuType
            : undefined;

        const rawChildren = item.children;
        const children = Array.isArray(rawChildren)
          ? rawChildren
              .map((rc) => {
                const c = rc as StrapiMegaMenuChild;
                const childId = typeof c.childId === "string" ? c.childId : "";
                const childLabel = typeof c.label === "string" ? c.label : "";
                const detailsRaw = c.details;
                const details = Array.isArray(detailsRaw)
                  ? detailsRaw.map((d) => {
                      const det = d as StrapiMegaMenuDetail;
                      const title =
                        typeof det.title === "string" ? det.title : "";
                      const items = Array.isArray(det.itemsText)
                        ? det.itemsText.filter((x) => typeof x === "string")
                        : splitItemsText(det.itemsText);
                      return { title, items };
                    })
                  : [];
                return {
                  id: childId,
                  label: childLabel,
                  contentTitle:
                    typeof c.contentTitle === "string"
                      ? c.contentTitle
                      : undefined,
                  contentSubtitle:
                    typeof c.contentSubtitle === "string"
                      ? c.contentSubtitle
                      : undefined,
                  details,
                };
              })
              .filter((c) => c.id && c.label)
          : [];

        if (!id || !label) return null;
        return { id, label, menuType, children };
      })
      .filter((x): x is MegaMenuItem => Boolean(x));
  } catch {
    return [];
  }
}
