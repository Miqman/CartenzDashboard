import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import {
  getFirstSubSlug,
  getProductSlugs,
} from "@/data/productDetailData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ productSlug: string }>;
}

export default async function ProdukProductSlugPage({ params }: PageProps) {
  const locale = await getLocale();
  const { productSlug } = await params;

  const validSlugs = getProductSlugs();
  if (!validSlugs.includes(productSlug)) notFound();

  const firstSub = getFirstSubSlug(productSlug);
  if (firstSub) {
    redirect({ href: `/produk/${productSlug}/${firstSub}`, locale });
  }

  return (
    <div className="min-h-screen bg-white pt-[72px] px-4 py-12">
      <p className="text-[#62748E]">Belum ada konten untuk produk ini.</p>
    </div>
  );
}
