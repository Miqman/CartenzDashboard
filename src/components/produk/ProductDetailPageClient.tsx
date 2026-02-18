"use client";

import { useState, useCallback, useEffect } from "react";
import { getProductDescription } from "@/data/productsPageData";
import { ProductNavBar } from "@/components/produk/ProductNavBar";
import { ProductHeroSection } from "@/components/produk/ProductHeroSection";
import { ProductDetailSection } from "@/components/produk/ProductDetailSection";
import type { ProductDetailCategory } from "@/data/productDetailData";

type Props = {
  productSlug: string;
  subSlug: string;
  locale: string;
  categories: ProductDetailCategory[];
  initialExpandedCategoryIds: string[];
  initialTabIndex?: number;
};

export function ProductDetailPageClient({
  productSlug,
  subSlug,
  locale,
  categories,
  initialExpandedCategoryIds,
  initialTabIndex = 0,
}: Props) {
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>(
    initialExpandedCategoryIds
  );
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);

  const description = getProductDescription(productSlug);

  const handleToggleCategory = useCallback((categoryId: string) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((x) => x !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  // Setelah navigasi sub-menu, scroll ke Section 2 agar konten tetap terlihat (tidak loncat ke atas)
  useEffect(() => {
    if (!subSlug) return;
    const el = document.getElementById("product-detail-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [subSlug]);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <ProductNavBar activeId={productSlug} locale={locale} />
      <ProductHeroSection description={description} />
      <ProductDetailSection
        categories={categories}
        expandedCategoryIds={expandedCategoryIds}
        onToggleCategory={handleToggleCategory}
        activeSubMenuId={subSlug}
        onSelectSubMenu={() => {}}
        activeTabIndex={activeTabIndex}
        onSelectTabIndex={setActiveTabIndex}
        productSlug={productSlug}
      />
    </div>
  );
}
