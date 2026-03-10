import { notFound } from "next/navigation";
import {
  getProductDetailData,
  getProductSlugs,
  getFirstSubSlug,
} from "@/data/productDetailData";
import type { ProductDetailCategory } from "@/data/productDetailData";
import { getLocale } from "next-intl/server";
import { getProductPageData } from "@/lib/strapi/products";
import { getProductClients } from "@/data/productClientsData";
import { ProductDetailPageClient } from "@/components/produk/ProductDetailPageClient";
import { ProductNavBar } from "@/components/produk/ProductNavBar";

interface PageProps {
  params: Promise<{ productSlug: string }>;
}

/** Pre-compile known product slugs to reduce dev "Compiling..." on each visit. */
export function generateStaticParams() {
  return getProductSlugs().map((productSlug) => ({ productSlug }));
}

/** Selalu render di server per request agar getLocale() dan fetch Strapi aman di Vercel. */
export const dynamic = "force-dynamic";

/** Ada konten jika salah satu section punya data: Strapi (hero/detail), fallback detail, atau klien. */
function hasAnySectionContent(
  strapiCategories: ProductDetailCategory[],
  fallbackCategories: ProductDetailCategory[],
  hasClients: boolean
): boolean {
  if (strapiCategories.length > 0) return true;
  if (fallbackCategories.length > 0) return true;
  if (hasClients) return true;
  return false;
}

export default async function ProdukProductSlugPage({ params }: PageProps) {
  let locale: string;
  let productSlug: string;
  try {
    locale = await getLocale();
    const p = await params;
    productSlug = p.productSlug;
  } catch {
    notFound();
  }

  const validSlugs = getProductSlugs();
  if (!validSlugs.includes(productSlug)) notFound();

  let payload: Awaited<ReturnType<typeof getProductPageData>>;
  try {
    payload = await getProductPageData(productSlug);
  } catch {
    payload = {
      hero: null,
      detail: getProductDetailData(productSlug),
      clients: getProductClients(productSlug),
      strategicProjects: null,
      palapaKlien: null,
    };
  }
  const fallbackDetail = getProductDetailData(productSlug);
  const fallbackClients = getProductClients(productSlug);
  const data = payload.detail.categories.length > 0 ? payload.detail : fallbackDetail;
  const clients = payload.clients ?? fallbackClients;

  const hasContent =
    productSlug === "strategic-consulting" ||
    hasAnySectionContent(
      payload.detail.categories,
      fallbackDetail.categories,
      clients != null
    );

  if (!hasContent) {
    return (
      <div className="min-h-screen bg-white pt-[72px]">
        <ProductNavBar activeId={productSlug} locale={locale} />
        <div className="px-4 py-12 md:px-8 lg:px-12">
          <p className="text-[#62748E]">
            Belum ada konten untuk produk ini.
          </p>
        </div>
      </div>
    );
  }

  // Halaman /produk/{productSlug} (tanpa subSlug):
  // - smartgov: jangan pilih sub-menu otomatis (tampilkan daftar Lv1 dulu).
  // - produk lain: jika ada kategori & sub-menu, pilih sub pertama sebagai default (tanpa auto-scroll).
  const isSmartgov = productSlug === "smartgov";
  const firstSub =
    data.categories[0]?.subMenus?.[0]?.id ?? getFirstSubSlug(productSlug);
  const displaySubSlug = isSmartgov ? "" : (firstSub ?? "");
  const found = displaySubSlug
    ? data.categories.find((c) =>
        c.subMenus.some((s) => s.id === displaySubSlug)
      )
    : null;
  const initialExpandedCategoryIds = found
    ? [found.id]
    : data.categories.length > 0
      ? [data.categories[0].id]
      : [];

  return (
    <ProductDetailPageClient
      productSlug={productSlug}
      subSlug={displaySubSlug}
      locale={locale}
      categories={data.categories}
      initialExpandedCategoryIds={initialExpandedCategoryIds}
      initialTabIndex={0}
      initialHero={payload.hero}
      initialClients={clients}
      initialStrategicProjects={payload.strategicProjects}
      initialPalapaKlien={payload.palapaKlien}
      isDefaultSub={!isSmartgov && Boolean(displaySubSlug)}
    />
  );
}
