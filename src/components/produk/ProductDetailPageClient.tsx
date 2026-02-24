"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { getProductHero } from "@/data/productsPageData";
import { getProductClients } from "@/data/productClientsData";
import { ProductNavBar } from "@/components/produk/ProductNavBar";
import { ProductHeroSection } from "@/components/produk/ProductHeroSection";
import { ProductDetailSection } from "@/components/produk/ProductDetailSection";
import { ProductKlienSection } from "@/components/produk/ProductKlienSection";
import { ProductStrategicProjectsSection } from "@/components/produk/ProductStrategicProjectsSection";
import { ProductKlienCardSection } from "@/components/produk/ProductKlienCardSection";
import type { ProductDetailCategory } from "@/data/productDetailData";
import type { ProductClientsData } from "@/data/productClientsData";
import type { StrategicConsultingProject } from "@/data/strategicConsultingProjectsData";
import type { PalapaKlienSectionPayload } from "@/lib/strapi/products";
import { STRATEGIC_CONSULTING_PROJECTS } from "@/data/strategicConsultingProjectsData";
import {
  PALAPA_KLIEN_CARDS,
  PALAPA_KLIEN_SECTION,
} from "@/data/palapaKlienCardData";
import type { ProductHeroData } from "@/data/productsPageData";
import { PRODUCT_PAGE_ASSETS } from "@/data/productsPageData";

type Props = {
  productSlug: string;
  subSlug: string;
  locale: string;
  categories: ProductDetailCategory[];
  initialExpandedCategoryIds: string[];
  initialTabIndex?: number;
  /** Hero dari Strapi (per-product API) atau fallback lokal. */
  initialHero?: ProductHeroData | null;
  /** Klien dari Strapi atau fallback lokal (untuk smartgov, efd, strategic-consulting). */
  initialClients?: ProductClientsData | null;
  /** Project cards dari Strapi (strategic-consulting). */
  initialStrategicProjects?: StrategicConsultingProject[] | null;
  /** Section klien Palapa dari Strapi (badge, title, rating, cards). */
  initialPalapaKlien?: PalapaKlienSectionPayload | null;
};

export function ProductDetailPageClient({
  productSlug,
  subSlug,
  locale,
  categories,
  initialExpandedCategoryIds,
  initialTabIndex = 0,
  initialHero,
  initialClients,
  initialStrategicProjects,
  initialPalapaKlien,
}: Props) {
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>(
    initialExpandedCategoryIds,
  );
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);

  const hero = initialHero ?? getProductHero(productSlug);
  const productClients = initialClients ?? getProductClients(productSlug);
  const strategicProjects = initialStrategicProjects ?? STRATEGIC_CONSULTING_PROJECTS;
  const palapaKlienSection = initialPalapaKlien ?? {
    badge: PALAPA_KLIEN_SECTION.badge,
    title: PALAPA_KLIEN_SECTION.title,
    rating: PALAPA_KLIEN_SECTION.rating,
    cards: PALAPA_KLIEN_CARDS,
  };

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
      {productSlug !== "strategic-consulting" && (
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
      )}

      {productSlug === "strategic-consulting" && (
        <ProductStrategicProjectsSection
          projects={strategicProjects}
        />
      )}

      {/* section klien: tampilan card hanya untuk palapa */}
      {productSlug === "palapa" && (
        <ProductKlienCardSection
          badge={palapaKlienSection.badge ?? PALAPA_KLIEN_SECTION.badge}
          title={palapaKlienSection.title ?? PALAPA_KLIEN_SECTION.title}
          rating={palapaKlienSection.rating ?? PALAPA_KLIEN_SECTION.rating}
          items={palapaKlienSection.cards}
        />
      )}

      {/* section klien: tampilan logo grid untuk produk lain */}
      {productClients && productSlug !== "palapa" && (
        <section className="px-4 py-10 md:px-8 md:py-14 lg:px-12">
          <ProductKlienSection
            badge={productClients.badge ?? "Klien"}
            title={productClients.title ?? "Klien"}
            clientList={productClients.clients}
          />
        </section>
      )}
    </div>
  );
}
