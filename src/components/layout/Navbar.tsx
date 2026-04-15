"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileProductMenu } from "@/components/layout/MobileProductMenu";
import type { MegaMenuItem } from "@/data/megaMenuData";

const navItems = [
  { path: "/", key: "home" },
  { path: "/tentang-kami", key: "about" },
  { path: "/produk", key: "products" },
  { path: "/hubungi-kami", key: "contact" },
] as const;

function isActivePath(pathname: string, locale: string, path: string): boolean {
  const prefix = `/${locale}`;
  if (path === "/") return pathname === prefix || pathname === `${prefix}/`;
  return (
    pathname === `${prefix}${path}` || pathname.startsWith(`${prefix}${path}/`)
  );
}

const DEFAULT_NAVBAR_LOGO = "/assets/logoCartenzBlack.svg";

export function Navbar({ logoUrl, megaMenuItems }: { logoUrl?: string; megaMenuItems?: MegaMenuItem[] }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const produkTriggerRef = useRef<HTMLButtonElement>(null);
  const logoSrc = logoUrl || DEFAULT_NAVBAR_LOGO;

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileProductOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 backdrop-blur md:px-16 lg:px-24 xl:px-32"
        style={{ "--navbar-height": "72px" } as React.CSSProperties}
      >
        <Link
          href={`/${locale}`}
          prefetch
          className="flex shrink-0 items-center"
          onClick={closeMobile}
        >
          <div className="relative h-8 w-40 md:h-[34px] md:w-44">
            <ImageWithFallback
              src={logoSrc}
              alt="Cartenz Technology"
              fill
              className="object-contain object-left"
              sizes="176px"
              priority
              fallbackSrc={DEFAULT_NAVBAR_LOGO}
            />
          </div>
        </Link>

        <div className="hidden items-center text-sm gap-8 md:flex">
          {navItems.map(({ path, key }) => {
            const active = isActivePath(pathname, locale, path);
            if (key === "products") {
              return (
                <div key={key} className="relative flex items-center">
                  <button
                    ref={produkTriggerRef}
                    type="button"
                    onClick={() => setMegaMenuOpen((o) => !o)}
                    className={`flex items-center gap-1 text-[#1E1E1E] transition hover:text-[#408FB4] ${megaMenuOpen ? "font-bold text-[#408FB4]" : ""} ${active ? "font-bold" : ""}`}
                    aria-expanded={megaMenuOpen}
                    aria-haspopup="true"
                  >
                    {t(key)}
                    <ChevronDown
                      className={`size-4 shrink-0 transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <MegaMenu
                        key="mega-menu"
                        open={megaMenuOpen}
                        onClose={() => setMegaMenuOpen(false)}
                        anchorRef={produkTriggerRef}
                        items={megaMenuItems}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={key}
                href={`/${locale}${path}`}
                prefetch
                className={`text-[#1E1E1E] transition hover:text-[#408FB4] ${active ? "font-bold" : ""}`}
              >
                {t(key)}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitch
            containerClassName="border-[#1E1E1E]/50"
            iconClassName="text-[#1E1E1E]"
            badgeClassName="border-[#408FB4] text-[#408FB4]"
          />
        </div>

        <button
          type="button"
          id="open-menu"
          onClick={() => setMobileOpen(true)}
          className="active:scale-90 transition md:hidden"
          aria-label="Buka menu"
        >
          <Menu className="size-[26px] text-[#1E1E1E]" />
        </button>
      </nav>

      {/* Mobile nav overlay */}
      <div
        id="mobile-navlinks"
        className={`fixed inset-0 z-100 flex flex-col items-center gap-6 overflow-y-auto bg-black/40 px-6 pb-10 pt-24 text-lg backdrop-blur transition-transform duration-400 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navItems.map(({ path, key }) => {
          const active = isActivePath(pathname, locale, path);

          if (key === "products") {
            return (
              <div key={key} className="flex w-full max-w-xs flex-col items-center">
                <button
                  type="button"
                  onClick={() => setMobileProductOpen((o) => !o)}
                  className={`flex items-center gap-1.5 text-white transition hover:text-[#408FB4] ${active ? "font-bold" : ""}`}
                >
                  {t(key)}
                  <ChevronDown
                    className={`size-4 shrink-0 transition-transform duration-200 ${mobileProductOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileProductOpen && (
                  <div className="mt-3 w-full">
                    <MobileProductMenu
                      items={megaMenuItems}
                      locale={locale}
                      onNavigate={closeMobile}
                    />
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={key}
              href={`/${locale}${path}`}
              prefetch
              onClick={closeMobile}
              className={`text-white transition hover:text-[#408FB4] ${active ? "font-bold" : ""}`}
            >
              {t(key)}
            </Link>
          );
        })}
        <div className="mt-4 flex items-center gap-3">
          <LanguageSwitch
            containerClassName="border-white/40"
            iconClassName="text-white"
            badgeClassName="border-white text-white"
          />
        </div>
        <button
          type="button"
          id="close-menu"
          onClick={closeMobile}
          className="active:ring-3 active:ring-white flex aspect-square size-10 items-center justify-center rounded-md bg-[#408FB4] p-1 text-white transition hover:opacity-90"
          aria-label="Tutup menu"
        >
          <X className="size-6" />
        </button>
      </div>
    </>
  );
}
