import { notFound } from "next/navigation";
import {
  getProductDetailData,
  getProductSlugs,
} from "@/data/productDetailData";
import type { ProductDetailCategory } from "@/data/productDetailData";
import { getLocale } from "next-intl/server";
import { getProductPageData } from "@/lib/strapi/products";
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

/** Selalu render di server per request agar getLocale() dan fetch Strapi aman di Vercel. */
export const dynamic = "force-dynamic";

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
  let locale: string;
  let productSlug: string;
  let subSlug: string;
  let tabParam: string | undefined;
  try {
    locale = await getLocale();
    const p = await params;
    const sp = await searchParams;
    productSlug = p.productSlug;
    subSlug = p.subSlug;
    tabParam = sp.tab;
  } catch {
    notFound();
  }

  const validProducts = getProductSlugs();
  if (!validProducts.includes(productSlug)) notFound();

  let payload: Awaited<ReturnType<typeof getProductPageData>>;
  try {
    payload = await getProductPageData(productSlug);
  } catch {
    payload = {
      hero: null,
      detail: getProductDetailData(productSlug),
      clients: null,
      strategicProjects: null,
      palapaKlien: null,
    };
  }
  const data =
    payload.detail.categories.length > 0
      ? payload.detail
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
      initialHero={payload.hero}
      initialClients={payload.clients ?? null}
      initialStrategicProjects={payload.strategicProjects}
      initialPalapaKlien={payload.palapaKlien}
      isDefaultSub={false}
    />
  );
}
