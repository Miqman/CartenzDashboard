/**
 * Helper navigasi halaman produk: path-based (bookmarkable).
 * Single source of truth untuk link dari MegaMenu / ProductNav ke halaman produk.
 */

/** Path: /[locale]/produk/[productSlug] atau /[locale]/produk/[productSlug]/[subSlug] */
export function getProductPageUrl(
  locale: string,
  productSlug: string,
  subSlug?: string
): string {
  const base = `/${locale}/produk/${productSlug}`;
  return subSlug ? `${base}/${subSlug}` : base;
}

/** Params dari route (untuk page server). productSlug/subSlug dari useParams atau params Promise. */
export interface ProductPageParams {
  productSlug: string;
  subSlug?: string;
}

/** Validasi: productSlug wajib; subSlug opsional. */
export function parseProductPageParams(
  params: Record<string, string | string[] | undefined>
): ProductPageParams | null {
  const productSlug = typeof params?.productSlug === "string" ? params.productSlug : null;
  if (!productSlug) return null;
  const subSlug = typeof params?.subSlug === "string" ? params.subSlug : undefined;
  return { productSlug, subSlug };
}
