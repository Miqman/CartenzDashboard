import type { StrapiResponse } from "@/types/strapi";

export function getStrapiUrl(): string {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

export async function fetchApi<T>(path: string): Promise<T> {
  const baseUrl = getStrapiUrl();
  const url = path.startsWith("http") ? path : `${baseUrl}/api/${path}`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getArticles(): Promise<
  StrapiResponse<Array<{ id: number; documentId: string; attributes: Record<string, unknown> }>>
> {
  try {
    return await fetchApi("articles?populate=*");
  } catch {
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
