import { notFound } from "next/navigation";
import {
  getProductDetailData,
  getProductSlugs,
} from "@/data/productDetailData";
import { getLocale } from "next-intl/server";
import { ProductDetailPageClient } from "@/components/produk/ProductDetailPageClient";

interface PageProps {
  params: Promise<{ productSlug: string; subSlug: string }>;
  searchParams: Promise<{ tab?: string }>;
}

function findSubInCategories(
  productId: string,
  subSlug: string
): { categoryId: string } | null {
  const data = getProductDetailData(productId);
  for (const cat of data.categories) {
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

  const data = getProductDetailData(productSlug);
  const found = findSubInCategories(productSlug, subSlug);
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
    />
  );
}
