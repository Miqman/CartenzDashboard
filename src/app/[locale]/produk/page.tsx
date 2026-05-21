import { getDefaultVisibleProductSlug } from "@/config/productVisibility";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

/** Default: /produk → produk visible pertama (tanpa subSlug). */
export default async function ProdukRootPage() {
  const locale = await getLocale();
  const defaultSlug = getDefaultVisibleProductSlug();
  redirect({ href: `/produk/${defaultSlug}`, locale });
}
