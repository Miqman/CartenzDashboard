import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { getProductSlugs, getFirstSubSlug } from "@/data/productDetailData";

export default async function ProdukRootPage() {
  const locale = await getLocale();
  const slugs = getProductSlugs();
  const firstProductSlug = slugs[0] ?? "solusi-pajak";
  const firstSub = getFirstSubSlug(firstProductSlug);
  const path = firstSub
    ? `/produk/${firstProductSlug}/${firstSub}`
    : `/produk/${firstProductSlug}`;
  redirect({ href: path, locale });
}
