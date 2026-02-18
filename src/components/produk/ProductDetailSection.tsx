"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";
import type {
  ContentBlock,
  ProductDetailCategory,
} from "@/data/productDetailData";
import { getProductPageUrl } from "@/lib/productNavigation";

const BG_SECTION = "#F1F5F9";
const BG_SIDEBAR = "#F8FAFC";

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

  const { activeSubMenu, activeTab } = useMemo(() => {
    for (const cat of categories) {
      const sub = cat.subMenus.find((s) => s.id === activeSubMenuId);
      if (sub) {
        const tab = sub.tabs[activeTabIndex] ?? sub.tabs[0] ?? null;
        return { activeSubMenu: sub, activeTab: tab };
      }
    }
    const firstSub = categories[0]?.subMenus?.[0] ?? null;
    const firstTab = firstSub?.tabs?.[0] ?? null;
    return { activeSubMenu: firstSub, activeTab: firstTab };
  }, [categories, activeSubMenuId, activeTabIndex]);

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

      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Kolom kiri ~30%: Sidebar navigasi accordion */}
        <aside className="w-full shrink-0 rounded-lg lg:w-[30%] lg:max-w-[320px]">
          <nav className="p-1 md:p-2" aria-label="Daftar solusi">
            {categories.length === 0 ? (
              <p className="px-2 py-4 text-sm text-[#62748E]">
                Belum ada sub-solusi untuk kategori ini.
              </p>
            ) : (
              <ul className="space-y-0.5">
                {categories.map((cat) => {
                  const isExpanded = expandedCategoryIds.includes(cat.id);
                  const hasSubMenus = cat.subMenus.length > 0;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => onToggleCategory(cat.id)}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition hover:bg-white/60"
                        aria-expanded={isExpanded}
                      >
                        <span className="line-clamp-2">{cat.label}</span>
                        {hasSubMenus &&
                          (isExpanded ? (
                            <ChevronUp
                              className="size-4 shrink-0 text-[#62748E]"
                              aria-hidden
                            />
                          ) : (
                            <ChevronDown
                              className="size-4 shrink-0 text-[#62748E]"
                              aria-hidden
                            />
                          ))}
                      </button>
                      {hasSubMenus && isExpanded && (
                        <ul className="ml-2 mt-0.5 space-y-0.5 border-l border-[#E2E8F0] pl-3">
                          {cat.subMenus.map((sub) => {
                            const isActive = sub.id === activeSubMenuId;
                            const subHref =
                              useLinks && productSlug
                                ? getProductPageUrl(locale, productSlug, sub.id)
                                : undefined;
                            const subContent = (
                              <>
                                <span
                                  className={`size-1.5 shrink-0 rounded-full ${
                                    isActive
                                      ? "bg-white"
                                      : "bg-(--color-cartenz-blue)"
                                  }`}
                                  aria-hidden
                                />
                                <span className="line-clamp-2">
                                  {sub.title}
                                </span>
                              </>
                            );
                            return (
                              <li key={sub.id}>
                                {subHref ? (
                                  <Link
                                    href={subHref}
                                    scroll={false}
                                    className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                                      isActive
                                        ? "bg-(--color-cartenz-blue) font-medium text-white"
                                        : "hover:bg-white/80"
                                    }`}
                                    aria-current={isActive ? "true" : undefined}
                                  >
                                    {subContent}
                                  </Link>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onSelectSubMenu(sub.id);
                                      onSelectTabIndex(0);
                                    }}
                                    className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                                      isActive
                                        ? "bg-(--color-cartenz-blue) font-medium text-white"
                                        : "hover:bg-white/80"
                                    }`}
                                    aria-current={isActive ? "true" : undefined}
                                  >
                                    {subContent}
                                  </button>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        </aside>

        {/* Kolom kanan ~70%: Kartu konten dinamis */}
        <div className="min-w-0 flex-1 lg:flex-[0_1_70%]">
          {activeSubMenu && (
            <div className="rounded-xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] md:p-8">
              {/* Breadcrumb / Category header */}
              <h3 className="mb-5 text-lg font-bold leading-snug md:text-xl">
                {activeSubMenu.title}
              </h3>

              {/* Horizontal tabs (Level 3) */}
              {activeSubMenu.tabs.length > 0 && (
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

              {/* Sub-judul (label tab aktif) + deskripsi */}
              {activeTab && (
                <>
                  <h4 className="mb-2 text-sm font-bold ">
                    {activeTab.tabLabel}
                  </h4>
                  <p className="mb-6 text-sm leading-relaxed ">
                    {activeTab.content.description}
                  </p>
                </>
              )}

              {/* Hero image */}
              {activeTab?.content?.image && (
                <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg bg-[#E2E8F0]">
                  <Image
                    src={activeTab.content.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    unoptimized={activeTab.content.image.startsWith("http")}
                  />
                </div>
              )}

              {/* Konten dinamis (blocks) atau fallback Detail Solusi (legacy) */}
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
          )}
          {!activeSubMenu && categories.length === 0 && (
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <p className="text-[#62748E]">
                Pilih kategori di atas yang memiliki solusi untuk melihat
                detail.
              </p>
            </div>
          )}
        </div>
      </div>
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
      const className = "mb-2 text-sm font-bold uppercase tracking-wide ";
      if (level === 1) return <h1 className={className}>{block.text}</h1>;
      if (level === 2) return <h2 className={className}>{block.text}</h2>;
      if (level === 3) return <h3 className={className}>{block.text}</h3>;
      return <h4 className={className}>{block.text}</h4>;
    }
    case "list":
      return (
        <div>
          {block.title && (
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide ">
              {block.title}
            </h4>
          )}
          <ul className="space-y-2">
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
