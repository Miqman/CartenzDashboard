/**
 * Data klien per produk besar (smartgov, efd, palapa, strategic-consulting).
 * Dipakai di section klien halaman detail produk. Nanti Fase 2 Strapi bisa override dari CMS.
 */

export interface ClientItem {
  name: string;
  logoUrl: string;
}

export interface ProductClientsData {
  badge?: string;
  title?: string;
  clients: ClientItem[];
  stats?: { value: string; label: string }[];
}

const sharedLogoAssets: ClientItem[] = [
  { name: "DKI Jakarta", logoUrl: "/assets/dkiJakarta.png" },
  { name: "Kab. Klungkung", logoUrl: "/assets/kabKlungkung.png" },
  { name: "Kab. Badung", logoUrl: "/assets/kabBadung.png" },
  { name: "Kab. Bantul", logoUrl: "/assets/kabBantul.png" },
  { name: "Kota Denpasar", logoUrl: "/assets/kotaDenpasar.png" },
  { name: "Kota Bogor", logoUrl: "/assets/kotaBogor.png" },
  { name: "Kab. Bandung", logoUrl: "/assets/kabBandung.png" },
  { name: "Kab. Aceh Tamiang", logoUrl: "/assets/kabAcehTamiang.png" },
  { name: "Kab. Bogor", logoUrl: "/assets/kabBogor.png" },
  { name: "Kota Banjarmasin", logoUrl: "/assets/kotaBanjarmasin.png" },
];

export const productClientsBySlug: Record<string, ProductClientsData> = {
  smartgov: {
    badge: "Klien",
    title: "pemerintah daerah",
    clients: sharedLogoAssets,
    stats: [
      { value: "80+", label: "Pemerintah Daerah" },
      { value: "15+", label: "Jenis Pajak" },
    ],
  },
  efd: {
    badge: "Klien",
    title: "pemerintah daerah",
    clients: [
      { name: "DKI Jakarta", logoUrl: "/assets/dkiJakarta.png" },
      { name: "Kab. Klungkung", logoUrl: "/assets/kabKlungkung.png" },
      { name: "Kab. Badung", logoUrl: "/assets/kabBadung.png" },
      { name: "Kota Denpasar", logoUrl: "/assets/kotaDenpasar.png" },
      { name: "Kab. Aceh Tamiang", logoUrl: "/assets/kabAcehTamiang.png" },
    ],
    stats: [{ value: "50+", label: "Instansi" }],
  },
  palapa: {
    badge: "Klien",
    title: "pemerintah daerah",
    clients: [
      { name: "Kab. Bantul", logoUrl: "/assets/kabBantul.png" },
      { name: "Kota Bogor", logoUrl: "/assets/kotaBogor.png" },
      { name: "Kab. Bandung", logoUrl: "/assets/kabBandung.png" },
      { name: "Kota Banjarmasin", logoUrl: "/assets/kotaBanjarmasin.png" },
    ],
    stats: [{ value: "20+", label: "Layanan Terintegrasi" }],
  },
  "strategic-consulting": {
    badge: "Klien",
    title: "pemerintah daerah",
    clients: [
      { name: "Kab. Klungkung", logoUrl: "/assets/kabKlungkung.png" },
      { name: "Kota Denpasar", logoUrl: "/assets/kotaDenpasar.png" },
    ],
  },
};

/**
 * Mengambil data klien untuk halaman produk. Return null jika slug tidak dikenal atau clients kosong.
 */
export function getProductClients(
  productSlug: string,
): ProductClientsData | null {
  const data = productClientsBySlug[productSlug];
  if (!data || !data.clients?.length) return null;
  return data;
}
