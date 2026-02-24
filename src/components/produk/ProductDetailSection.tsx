"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useLocale } from "next-intl";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type {
  ContentBlock,
  ProductDetailCategory,
} from "@/data/productDetailData";
import { getProductPageUrl } from "@/lib/productNavigation";

const BG_SECTION = "#F1F5F9";
const BG_SIDEBAR = "#F8FAFC";
const EMPTY_FOLDER_IMAGE = "/assets/folder_is_empty.png";

function EmptyStateFull({
  imageSrc,
  message,
}: {
  imageSrc: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-[0_1px_3px_rgba(0,0,0,0.08)] md:py-24">
      <div className="relative mb-4 h-40 w-40 md:h-48 md:w-48">
        <ImageWithFallback
          src={imageSrc}
          alt=""
          fill
          className="object-contain"
          sizes="192px"
          fallbackSrc="/assets/galeri5.jpg"
        />
      </div>
      <p className="text-center text-sm text-[#62748E] md:text-base">
        {message}
      </p>
    </div>
  );
}

function EmptyStateRight({
  imageSrc,
  message,
}: {
  imageSrc: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white py-12 shadow-[0_1px_3px_rgba(0,0,0,0.08)] md:py-16">
      <div className="relative mb-4 h-32 w-32 md:h-40 md:w-40">
        <ImageWithFallback
          src={imageSrc}
          alt=""
          fill
          className="object-contain"
          sizes="160px"
          fallbackSrc="/assets/galeri5.jpg"
        />
      </div>
      <p className="text-center text-sm text-[#62748E] md:text-base">
        {message}
      </p>
    </div>
  );
}

type Props = {
  categories: ProductDetailCategory[];
  expandedCategoryIds: string[];
  onToggleCategory: (categoryId: string) => void;
  activeSubMenuId: string | null;
  onSelectSubMenu: (subMenuId: string | null) => void;
  activeTabIndex: number;
  onSelectTabIndex: (index: number) => void;
  /** Jika ada, item sidebar pakai Link (path-based, bookmarkable). */
  productSlug?: string;
};

export function ProductDetailSection({
  categories,
  expandedCategoryIds,
  onToggleCategory,
  activeSubMenuId,
  onSelectSubMenu,
  activeTabIndex,
  onSelectTabIndex,
  productSlug,
}: Props) {
  const locale = useLocale();
  const useLinks = Boolean(productSlug);
  const isSmartgov = productSlug === "smartgov";

  /** Untuk Smartgov: kategori Lv1 yang dipilih (dari URL atau dari klik). */
  const [selectedCategoryIdState, setSelectedCategoryIdState] = useState<
    string | null
  >(null);

  const categoryFromActiveSub = useMemo(
    () =>
      activeSubMenuId
        ? (categories.find((c) =>
            c.subMenus.some((s) => s.id === activeSubMenuId),
          )?.id ?? null)
        : null,
    [categories, activeSubMenuId],
  );
  const effectiveSelectedCategoryId =
    categoryFromActiveSub ?? selectedCategoryIdState;
  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === effectiveSelectedCategoryId) ?? null,
    [categories, effectiveSelectedCategoryId],
  );

  const isFlatSidebar =
    categories.length === 1 && Boolean(categories[0].sidebarAsFlat);

  const { activeSubMenu, activeTab } = useMemo(() => {
    if (activeSubMenuId == null || activeSubMenuId === "") {
      return { activeSubMenu: null, activeTab: null };
    }
    for (const cat of categories) {
      const sub = cat.subMenus.find((s) => s.id === activeSubMenuId);
      if (sub) {
        const tab = sub.tabs[activeTabIndex] ?? sub.tabs[0] ?? null;
        return { activeSubMenu: sub, activeTab: tab };
      }
    }
    return { activeSubMenu: null, activeTab: null };
  }, [categories, activeSubMenuId, activeTabIndex]);

  /** Smartgov: tampilkan daftar Lv1 (belum pilih Lv1) */
  const showSmartgovLv1List =
    isSmartgov && categories.length > 1 && !effectiveSelectedCategoryId;
  /** Smartgov: tampilkan Back + nama Lv1 + daftar Lv2 */
  const showSmartgovLv2List =
    isSmartgov && categories.length > 1 && selectedCategory != null;

  const handleSmartgovBack = () => {
    setSelectedCategoryIdState(null);
  };

  return (
    <section
      id="product-detail-section"
      className="px-4 py-10 md:px-8 md:py-14 lg:px-12"
      style={{ backgroundColor: BG_SECTION }}
    >
      <div className="mx-auto mb-8 max-w-7xl">
        <p className="text-[16px] font-normal text-[#6B7280]">solusi</p>
        <h2 className="mt-2 text-2xl font-normal uppercase leading-tight text-[#1E1E1E] md:text-3xl">
          Solusi yang kami tawarkan
        </h2>
      </div>

      {/* Belum ada produk sama sekali: tampilan default putih + logo + teks */}
      {categories.length === 0 ? (
        <div className="mx-auto max-w-7xl">
          <EmptyStateFull
            imageSrc={EMPTY_FOLDER_IMAGE}
            message="Silakan isi jenis solusi pada produk ini"
          />
        </div>
      ) : (
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Kolom kiri ~30%: Sidebar (tanpa accordion) */}
          <aside className="w-full shrink-0 rounded-lg lg:w-[30%] lg:max-w-[320px]">
            <nav className="" aria-label="Daftar solusi">
              {showSmartgovLv1List ? (
                <ul className="space-y-6">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedCategoryIdState(cat.id)}
                        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition hover:bg-white/80"
                      >
                        <span className="line-clamp-2">{cat.label}</span>
                        <ChevronRight
                          className="size-4 shrink-0 text-[#62748E]"
                          aria-hidden
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : showSmartgovLv2List && selectedCategory ? (
                <>
                  <Link
                    href={
                      productSlug && locale
                        ? `/${locale}/produk/${productSlug}`
                        : "#"
                    }
                    onClick={handleSmartgovBack}
                    className="mb-2 flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-[#62748E] transition hover:bg-white/80 hover:text-cartenz-black"
                  >
                    <ArrowLeft className="size-4 shrink-0" aria-hidden />
                    <span className="">{selectedCategory.label}</span>
                  </Link>
                  <hr className="my-2 border-[#E2E8F0]" />
                  <ul className="space-y-2">
                    {selectedCategory.subMenus.map((sub) => {
                      const isActive = sub.id === activeSubMenuId;
                      const subHref =
                        useLinks && productSlug
                          ? getProductPageUrl(locale, productSlug, sub.id)
                          : undefined;
                      return (
                        <li key={sub.id}>
                          {subHref ? (
                            <Link
                              href={subHref}
                              scroll={false}
                              className={`flex w-full cursor-pointer items-center rounded-lg p-4 text-left text-sm transition ${
                                isActive
                                  ? "bg-(--color-cartenz-blue) font-medium text-white"
                                  : "hover:bg-white/80"
                              }`}
                              aria-current={isActive ? "true" : undefined}
                            >
                              <span className="line-clamp-2">{sub.title}</span>
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectSubMenu(sub.id);
                                onSelectTabIndex(0);
                              }}
                              className={`flex w-full cursor-pointer items-center rounded-lg px-2.5 py-2 text-left text-sm transition ${
                                isActive
                                  ? "bg-(--color-cartenz-blue) font-medium text-white"
                                  : "hover:bg-white/80"
                              }`}
                              aria-current={isActive ? "true" : undefined}
                            >
                              <span className="line-clamp-2">{sub.title}</span>
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <ul className="space-y-2">
                  {categories.flatMap((cat) =>
                    cat.subMenus.map((sub) => {
                      const isActive = sub.id === activeSubMenuId;
                      const subHref =
                        useLinks && productSlug
                          ? getProductPageUrl(locale, productSlug, sub.id)
                          : undefined;
                      return (
                        <li key={sub.id}>
                          {subHref ? (
                            <Link
                              href={subHref}
                              scroll={false}
                              className={`flex w-full cursor-pointer items-center rounded-lg p-4 text-left text-sm transition ${
                                isActive
                                  ? "bg-(--color-cartenz-blue) font-medium text-white"
                                  : "hover:bg-white/80"
                              }`}
                              aria-current={isActive ? "true" : undefined}
                            >
                              <span className="line-clamp-2">{sub.title}</span>
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectSubMenu(sub.id);
                                onSelectTabIndex(0);
                              }}
                              className={`flex w-full cursor-pointer items-center rounded-lg px-2.5 py-2 text-left text-sm transition ${
                                isActive
                                  ? "bg-(--color-cartenz-blue) font-medium text-white"
                                  : "hover:bg-white/80"
                              }`}
                              aria-current={isActive ? "true" : undefined}
                            >
                              <span className="line-clamp-2">{sub.title}</span>
                            </button>
                          )}
                        </li>
                      );
                    }),
                  )}
                </ul>
              )}
            </nav>
          </aside>

          {/* Kolom kanan ~70%: Kartu konten dinamis */}
          <div className="min-w-0 flex-1 lg:flex-[0_1_70%]">
            {isSmartgov && !activeSubMenu ? (
              <EmptyStateRight
                imageSrc={EMPTY_FOLDER_IMAGE}
                message="Silakan pilih jenis solusi pada daftar produk di samping kiri"
              />
            ) : activeSubMenu ? (
              <div className="rounded-xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] md:p-8">
                <h3 className="mb-5 text-lg font-bold leading-snug md:text-xl">
                  {activeSubMenu.title}
                </h3>

                {!isFlatSidebar && activeSubMenu.tabs.length > 1 && (
                  <div className="mb-5 border-b border-[#E2E8F0]">
                    <ul className="flex flex-wrap gap-1" role="tablist">
                      {activeSubMenu.tabs.map((tab, idx) => {
                        const isTabActive = activeTabIndex === idx;
                        return (
                          <li key={tab.tabId} role="presentation">
                            <button
                              type="button"
                              role="tab"
                              aria-selected={isTabActive}
                              onClick={() => onSelectTabIndex(idx)}
                              className={`cursor-pointer border-b-2 px-3 py-2 text-sm font-medium transition ${
                                isTabActive
                                  ? "border-(--color-cartenz-blue) text-(--color-cartenz-blue)"
                                  : "border-transparent text-[#62748E] hover:text-cartenz-black"
                              }`}
                            >
                              {tab.tabLabel}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {activeTab && (
                  <>
                    {!isFlatSidebar && (
                      <h4 className="mb-2 text-sm font-bold ">
                        {activeTab.tabLabel}
                      </h4>
                    )}
                    {activeTab.content.description ? (
                      <p className="mb-6 text-sm leading-relaxed ">
                        {activeTab.content.description}
                      </p>
                    ) : null}
                  </>
                )}

                {activeTab?.content?.image && (
                  <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg bg-[#E2E8F0]">
                    <ImageWithFallback
                      src={activeTab.content.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      fallbackSrc="/assets/galeri5.jpg"
                    />
                  </div>
                )}

                {activeTab?.content?.blocks &&
                activeTab.content.blocks.length > 0 ? (
                  <div className="space-y-4">
                    {activeTab.content.blocks.map((block, i) => (
                      <ContentBlockRenderer key={i} block={block} />
                    ))}
                  </div>
                ) : (
                  activeTab?.content?.details &&
                  activeTab.content.details.length > 0 && (
                    <div>
                      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide ">
                        Detail Solusi
                      </h4>
                      <ul className="space-y-2">
                        {activeTab.content.details.map((item, j) => (
                          <SolutionListItem key={j} text={item} />
                        ))}
                      </ul>
                    </div>
                  )
                )}

                {activeSubMenu.tabs.length === 0 && (
                  <p className="text-sm text-[#62748E]">
                    Tidak ada detail untuk sub-menu ini.
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-8 shadow-sm">
                <p className="text-[#62748E]">
                  Pilih kategori di atas yang memiliki solusi untuk melihat
                  detail.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function SolutionListItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm ">
      <span
        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-(--color-cartenz-blue)"
        aria-hidden
      />
      <span>{text}</span>
    </li>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-sm leading-relaxed ">{block.text}</p>;
    case "heading": {
      const level = block.level ?? 4;
      const className = "mb-2 text-sm font-bold tracking-wide ";
      if (level === 1) return <h1 className={className}>{block.text}</h1>;
      if (level === 2) return <h2 className={className}>{block.text}</h2>;
      if (level === 3) return <h3 className={className}>{block.text}</h3>;
      return <h4 className={className}>{block.text}</h4>;
    }
    case "list":
      return (
        <div>
          {block.title && (
            <h4 className="mb-3 text-sm font-bold capitalize tracking-wide ">
              {block.title}
            </h4>
          )}
          <ul className="space-y-1">
            {block.items.map((item, i) => (
              <SolutionListItem key={i} text={item} />
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}
