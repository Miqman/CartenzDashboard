import { notFound } from "next/navigation";
import {
  getProductDetailData,
  getProductSlugs,
} from "@/data/productDetailData";
import type { ProductDetailCategory } from "@/data/productDetailData";
import { getLocale } from "next-intl/server";
import { getProductPageBySlug } from "@/lib/strapi";
import { ProductDetailPageClient } from "@/components/produk/ProductDetailPageClient";

interface PageProps {
  params: Promise<{ productSlug: string; subSlug: string }>;
  searchParams: Promise<{ tab?: string }>;
}

/** Pre-compile known product+sub paths to reduce dev "Compiling..." on each visit. */
export function generateStaticParams() {
  const productSlugs = getProductSlugs();
  const params: { productSlug: string; subSlug: string }[] = [];
  for (const productSlug of productSlugs) {
    const data = getProductDetailData(productSlug);
    for (const cat of data.categories) {
      for (const sub of cat.subMenus) {
        params.push({ productSlug, subSlug: sub.id });
      }
    }
  }
  return params;
}

function findSubInCategories(
  categories: ProductDetailCategory[],
  subSlug: string
): { categoryId: string } | null {
  for (const cat of categories) {
    if (cat.subMenus.some((s) => s.id === subSlug)) {
      return { categoryId: cat.id };
    }
  }
  return null;
}

export default async function ProdukSubPage({ params, searchParams }: PageProps) {
  const locale = await getLocale();
  const { productSlug, subSlug } = await params;
  const { tab: tabParam } = await searchParams;

  const validProducts = getProductSlugs();
  if (!validProducts.includes(productSlug)) notFound();

  const strapiPage = await getProductPageBySlug(productSlug);
  const useStrapi =
    strapiPage &&
    strapiPage.detail.categories.length > 0;

  const data = useStrapi
    ? strapiPage.detail
    : getProductDetailData(productSlug);
  const found = findSubInCategories(data.categories, subSlug);
  if (!found) notFound();

  const cat = data.categories.find((c) => c.id === found.categoryId);
  const subMenu = cat?.subMenus.find((s) => s.id === subSlug);
  const maxTab = Math.max(0, (subMenu?.tabs.length ?? 1) - 1);
  const tabNum =
    tabParam != null && /^\d+$/.test(tabParam)
      ? Math.min(Math.max(0, parseInt(tabParam, 10)), maxTab)
      : 0;

  const initialExpandedCategoryIds = [found.categoryId];

  return (
    <ProductDetailPageClient
      productSlug={productSlug}
      subSlug={subSlug}
      locale={locale}
      categories={data.categories}
      initialExpandedCategoryIds={initialExpandedCategoryIds}
      initialTabIndex={tabNum}
      initialHero={useStrapi ? strapiPage.hero : null}
    />
  );
}
