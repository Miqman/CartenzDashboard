import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

/** Default: /produk → /produk/smartgov (tetap di level productSlug, tanpa subSlug). */
export default async function ProdukRootPage() {
  const locale = await getLocale();
  redirect({ href: "/produk/smartgov", locale });
}
