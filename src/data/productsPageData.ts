/**
 * Data untuk navigasi global halaman produk (Level 1) dan deskripsi Section 1.
 * Id harus match dengan megaMenuData agar Sidebar & Content ikut berubah.
 */
export const PRODUCT_NAV_ITEMS = [
  {
    id: "smartgov",
    brand: "SMARTGOV",
    label: "Solusi Pengelolaan Pajak Daerah",
  },
  { id: "efd", brand: "EFD", label: "Solusi Monitoring Pajak Daerah" },
  {
    id: "palapa",
    brand: "PALAPA",
    label: "Digitalisasi Layanan Pemerintah Terintegrasi",
  },
  {
    id: "strategic-consulting",
    brand: "STRATEGIC CONSULTING",
    label: "Layanan Konsultasi dan Project",
  },
] as const;

const DEFAULT_DESCRIPTION =
  "Solusi terintegrasi untuk mendukung pengelolaan dan pemantauan pajak daerah serta digitalisasi layanan pemerintah.";

export const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  smartgov:
    "SMARTGOV menyediakan solusi pengelolaan pajak daerah yang terintegrasi untuk Kota dan Kabupaten, mencakup Pajak Bumi dan Bangunan, Bea Perolehan Hak atas Tanah dan Bangunan, retribusi daerah, serta dashboard realisasi penerimaan.",
  efd: "Solusi monitoring pajak daerah untuk pengawasan objek pajak dan realisasi penerimaan secara real-time.",
  palapa:
    "Platform digitalisasi layanan pemerintah terintegrasi (PALAPA) untuk meningkatkan kualitas layanan publik.",
  "strategic-consulting":
    "Layanan konsultasi dan project strategic untuk mendampingi pemerintah dalam transformasi digital.",
};

export function getProductDescription(categoryId: string): string {
  return PRODUCT_DESCRIPTIONS[categoryId] ?? DEFAULT_DESCRIPTION;
}

export const PRODUCT_PAGE_ASSETS = {
  logo: "/assets/smartgov_logo.png",
  heroImage: "/assets/galeri5.jpg",
} as const;
