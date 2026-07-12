import type { MegaMenuItem } from "@/data/megaMenuData";
import { PRODUCT_NAV_ITEMS } from "@/data/productsPageData";

/**
 * Produk yang disembunyikan dari UI (nav, mega menu, redirect /produk).
 * Hapus slug dari array ini untuk menampilkan kembali.
 */
// export const HIDDEN_PRODUCT_IDS = ["smartgov", "efd"] as const;
export const HIDDEN_PRODUCT_IDS = [] as const;

export type HiddenProductId = (typeof HIDDEN_PRODUCT_IDS)[number];

export function isProductVisible(productId: string): boolean {
  return !(HIDDEN_PRODUCT_IDS as readonly string[]).includes(productId);
}

/** Produk default saat membuka /produk (produk visible pertama di PRODUCT_NAV_ITEMS). */
export function getDefaultVisibleProductSlug(): string {
  const visible = PRODUCT_NAV_ITEMS.find((item) => isProductVisible(item.id));
  return visible?.id ?? "palapa";
}

export function filterVisibleMegaMenuItems(
  items: MegaMenuItem[],
): MegaMenuItem[] {
  return items.filter((item) => isProductVisible(item.id));
}
