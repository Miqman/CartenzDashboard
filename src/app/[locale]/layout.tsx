import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { getGlobal, getStrapiMediaUrl } from "@/lib/strapi";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getGlobal();
  const navbarLogoUrl = global?.navbarLogo ? getStrapiMediaUrl(global.navbarLogo) : undefined;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar logoUrl={navbarLogoUrl} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
