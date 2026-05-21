import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { filterVisibleMegaMenuItems } from "@/config/productVisibility";
import { getGlobal, getMegaMenuItems, getStrapiMediaUrl } from "@/lib/strapi";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [global, megaMenuItemsRaw] = await Promise.all([
    getGlobal(),
    getMegaMenuItems(),
  ]);
  const megaMenuItems = filterVisibleMegaMenuItems(megaMenuItemsRaw);
  const navbarLogoUrl = global?.navbarLogo ? getStrapiMediaUrl(global.navbarLogo) : undefined;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar logoUrl={navbarLogoUrl} megaMenuItems={megaMenuItems} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
