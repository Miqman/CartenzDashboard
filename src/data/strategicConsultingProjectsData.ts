/**
 * Data proyek untuk section "Hasil Terbaik" di halaman strategic-consulting.
 * Setiap item: logo, nama, gambar preview, dan URL website produk.
 */

export interface StrategicConsultingProject {
  id: string;
  logoUrl: string;
  name: string;
  imageUrl: string;
  /** URL website produk; diklik dari gambar card. */
  productUrl: string;
}

export const STRATEGIC_CONSULTING_PROJECTS: StrategicConsultingProject[] = [
  {
    id: "bappenas",
    logoUrl: "/assets/logoBappenas.png",
    name: "BAPPENAS",
    imageUrl: "/assets/galeri5.jpg",
    productUrl: "#",
  },
  {
    id: "bappeda-dki",
    logoUrl: "/assets/logoBappedaDKI.png",
    name: "Bappeda DKI Jakarta",
    imageUrl: "/assets/galeri5.jpg",
    productUrl: "#",
  },
];
