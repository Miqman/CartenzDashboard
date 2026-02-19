"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { getProductHero } from "@/data/productsPageData";
import { getProductClients } from "@/data/productClientsData";
import { ProductNavBar } from "@/components/produk/ProductNavBar";
import { ProductHeroSection } from "@/components/produk/ProductHeroSection";
import { ProductDetailSection } from "@/components/produk/ProductDetailSection";
import { ProductKlienSection } from "@/components/produk/ProductKlienSection";
import type { ProductDetailCategory } from "@/data/productDetailData";
import type { ProductHeroData } from "@/data/productsPageData";
import { PRODUCT_PAGE_ASSETS } from "@/data/productsPageData";

type Props = {
  productSlug: string;
  subSlug: string;
  locale: string;
  categories: ProductDetailCategory[];
  initialExpandedCategoryIds: string[];
  initialTabIndex?: number;
  /** Jika dari Strapi, hero bisa di-pass dari server. */
  initialHero?: ProductHeroData | null;
};

export function ProductDetailPageClient({
  productSlug,
  subSlug,
  locale,
  categories,
  initialExpandedCategoryIds,
  initialTabIndex = 0,
  initialHero,
}: Props) {
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>(
    initialExpandedCategoryIds,
  );
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);

  const hero = initialHero ?? getProductHero(productSlug);
  const productClients = getProductClients(productSlug);

  const handleToggleCategory = useCallback((categoryId: string) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((x) => x !== categoryId)
        : [...prev, categoryId],
    );
  }, []);

  const isInitialMount = useRef(true);

  const scrollToDetailSection = useCallback(() => {
    const el = document.getElementById("product-detail-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Scroll ke Section 2 hanya saat sub-menu diklik (navigasi), bukan saat pertama buka halaman
  useEffect(() => {
    if (!subSlug) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToDetailSection();
  }, [subSlug, scrollToDetailSection]);

  const handleSelectTabIndex = useCallback(
    (index: number) => {
      setActiveTabIndex(index);
      scrollToDetailSection();
    },
    [scrollToDetailSection],
  );

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <ProductNavBar activeId={productSlug} locale={locale} />
      <ProductHeroSection
        title={hero.title}
        paragraphs={hero.paragraphs}
        demoUrl={hero.demoUrl}
        logoUrl={hero.logoUrl ?? PRODUCT_PAGE_ASSETS.logo}
        heroImageUrl={hero.heroImageUrl ?? PRODUCT_PAGE_ASSETS.heroImage}
      />
      <ProductDetailSection
        categories={categories}
        expandedCategoryIds={expandedCategoryIds}
        onToggleCategory={handleToggleCategory}
        activeSubMenuId={subSlug}
        onSelectSubMenu={() => {}}
        activeTabIndex={activeTabIndex}
        onSelectTabIndex={handleSelectTabIndex}
        productSlug={productSlug}
      />

      {productClients && (
        <section className="px-4 py-10 md:px-8 md:py-14 lg:px-12">
          <ProductKlienSection
            badge={productClients.badge ?? "Klien"}
            title={productClients.title ?? "Klien"}
            clientList={productClients.clients}
            stats={productClients.stats}
          />
        </section>
      )}
    </div>
  );
}
