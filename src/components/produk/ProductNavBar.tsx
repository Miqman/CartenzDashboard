"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getVisibleProductNavItems,
  PRODUCT_PAGE_ASSETS,
} from "@/data/productsPageData";
import { getProductPageUrl } from "@/lib/productNavigation";

const BORDER_COLOR = "#CAD5E2";
const TEXT_COLOR = "#62748E";
const ACCENT = "#408FB4";

type NavItem = ReturnType<typeof getVisibleProductNavItems>[number];

type Props = {
  activeId: string;
  locale?: string;
  onSelect?: (id: string) => void;
};

type NavLayout = {
  desktop: string;
  /** Kartu sedikit lebih ringkas saat banyak item (5+). */
  compact: boolean;
};

/**
 * Grid desktop terpusat per jumlah produk visible.
 * 2–4: satu baris (atau 2×2 di tablet untuk 4).
 * 5: 3+2 di tablet, satu baris di layar besar.
 * 6+: 2 → 3 → 4 → 6 kolom progresif.
 */
function getNavLayout(count: number): NavLayout {
  if (count <= 1) {
    return {
      desktop: "mx-auto w-full max-w-sm grid grid-cols-1 gap-3",
      compact: false,
    };
  }
  if (count === 2) {
    return {
      desktop:
        "mx-auto w-full max-w-3xl grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4",
      compact: false,
    };
  }
  if (count === 3) {
    return {
      desktop:
        "mx-auto w-full max-w-4xl grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3 md:gap-4",
      compact: false,
    };
  }
  if (count === 4) {
    return {
      desktop:
        "mx-auto w-full max-w-5xl grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4",
      compact: false,
    };
  }
  if (count === 5) {
    return {
      desktop:
        "mx-auto w-full max-w-6xl grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3",
      compact: true,
    };
  }
  return {
    desktop:
      "mx-auto w-full max-w-6xl grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-3",
    compact: true,
  };
}

function ProductNavCard({
  item,
  isActive,
  href,
  onSelect,
  compact,
}: {
  item: NavItem;
  isActive: boolean;
  href?: string;
  onSelect?: () => void;
  compact?: boolean;
}) {
  const isStrategicConsulting = item.id === "strategic-consulting";
  const cardClass = [
    "group flex w-full flex-col text-left transition-all duration-200",
    compact
      ? "gap-1.5 rounded-lg border px-3 py-2.5 md:gap-2 md:px-3.5 md:py-3"
      : "gap-2 rounded-xl border px-4 py-3 md:gap-2.5 md:px-5 md:py-4",
    isActive
      ? "border-[#408FB4] bg-[#F0F9FF] shadow-sm ring-1 ring-[#408FB4]/20"
      : "border-[#E2E8F0] bg-[#FAFBFC] hover:border-[#94A3B8] hover:bg-white hover:shadow-sm",
  ].join(" ");

  const logoHeight = compact ? "h-4 md:h-5" : "h-5 md:h-6";
  const logoWidth = isStrategicConsulting
    ? compact
      ? "w-[64px] md:w-[120px]"
      : "w-[72px] md:w-[140px]"
    : compact
      ? "w-10 md:w-[88px]"
      : "w-12 md:w-[100px]";

  const content = (
    <>
      <span
        className={`relative block shrink-0 ${logoHeight} ${logoWidth} ${
          isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"
        }`}
      >
        <Image
          src={item.logo}
          alt=""
          fill
          className="object-contain object-left"
          sizes={
            isStrategicConsulting
              ? compact
                ? "(min-width: 768px) 120px, 64px"
                : "(min-width: 768px) 140px, 72px"
              : compact
                ? "(min-width: 768px) 88px, 40px"
                : "(min-width: 768px) 100px, 48px"
          }
        />
      </span>
      <span
        className={`leading-snug ${
          compact ? "text-[11px] md:text-xs" : "text-xs md:text-sm"
        } ${
          isActive
            ? "font-medium text-[#1E1E1E]"
            : "text-[#62748E] group-hover:text-[#334155]"
        }`}
      >
        {item.label}
      </span>
      {isActive && (
        <span
          className="mt-auto hidden h-0.5 w-8 rounded-full sm:block"
          style={{ backgroundColor: ACCENT }}
          aria-hidden
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cardClass}
        style={{ color: TEXT_COLOR }}
        aria-current={isActive ? "true" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cardClass}
      style={{ color: TEXT_COLOR }}
      aria-current={isActive ? "true" : undefined}
    >
      {content}
    </button>
  );
}

export function ProductNavBar({ activeId, locale, onSelect }: Props) {
  const router = useRouter();
  const useLinks = typeof locale === "string";
  const navItems = getVisibleProductNavItems();
  const layout = getNavLayout(navItems.length);

  return (
    <nav
      className="w-full border-y bg-white py-4 md:py-5"
      style={{ borderColor: BORDER_COLOR }}
      aria-label="Kategori produk"
    >
      <div className="px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Desktop & tablet: kartu grid terpusat */}
        <div className={`hidden sm:grid ${layout.desktop}`}>
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            const href =
              useLinks && locale
                ? getProductPageUrl(locale, item.id)
                : undefined;
            return (
              <ProductNavCard
                key={item.id}
                item={item}
                isActive={isActive}
                href={href}
                onSelect={
                  href ? undefined : () => onSelect?.(item.id)
                }
                compact={layout.compact}
              />
            );
          })}
        </div>

        {/* Mobile: dropdown seperti sebelumnya */}
        <div className="sm:hidden">
          <select
            value={activeId}
            onChange={(e) => {
              const id = e.target.value;
              if (useLinks && locale) {
                router.push(getProductPageUrl(locale, id));
              } else {
                onSelect?.(id);
              }
            }}
            className="w-full cursor-pointer appearance-none rounded-lg border border-[#CAD5E2] bg-white px-4 py-3 text-sm text-[#1E1E1E] focus:border-[#408FB4] focus:outline-none focus:ring-2 focus:ring-[#408FB4]/20"
            style={{ color: TEXT_COLOR }}
            aria-label="Pilih kategori produk"
          >
            {navItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.brand} – {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}
