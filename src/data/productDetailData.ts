/**
 * Struktur data untuk halaman detail produk: sidebar accordion (Level 1) + sub-menus (Level 2) + tabs dengan konten.
 * Dikunci per product id (solusi-pajak, monitoring-pajak, dll.).
 *
 * Konten setelah gambar bisa pakai blocks (dinamis) atau legacy description + details.
 */

/** Blok konten dinamis: format di frontend, isi dari data/CMS. */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 1 | 2 | 3 | 4 }
  | { type: "list"; title?: string; items: string[] };

export interface TabContent {
  description: string;
  image: string;
  details: string[];
  /** Konten dinamis setelah gambar. Jika ada, di-render sebagai blocks; jika tidak, pakai description + details. */
  blocks?: ContentBlock[];
}

export interface ProductTab {
  tabId: string;
  tabLabel: string;
  content: TabContent;
}

export interface ProductSubMenu {
  /** Harus unik dalam satu produk (digunakan di URL sebagai subSlug). */
  id: string;
  title: string;
  tabs: ProductTab[];
}

export interface ProductDetailCategory {
  id: string;
  label: string;
  /** Id dari MegaMenu Level 2 (children). Jika ada, link dari MegaMenu akan membuka kategori ini. */
  megaMenuChildId?: string;
  isExpanded?: boolean;
  subMenus: ProductSubMenu[];
}

export type ProductDetailData = {
  categories: ProductDetailCategory[];
};

const fallbackImage = "/assets/galeri5.jpg";

/** Data per product id. Tambahkan entri untuk monitoring-pajak, digitalisasi-layanan, strategic-consulting sesuai kebutuhan. */
export const productDetailByProductId: Record<string, ProductDetailData> = {
  smartgov: {
    categories: [
      {
        id: "cat-01",
        label: "Sistem Pengelolaan Pajak Daerah Kota/Kabupaten",
        megaMenuChildId: "sistem-kota-kab",
        isExpanded: true,
        subMenus: [
          {
            id: "pajak-bumi-bangunan",
            title:
              "Sistem Pengelolaan Pajak Bumi dan Bangunan Perdesaan dan Perkotaan",
            tabs: [
              {
                tabId: "tab-1",
                tabLabel: "Sistem Pengelolaan Objek Pajak Spasial",
                content: {
                  description:
                    "Solusi berbasis web untuk mendigitalisasikan proses pelayanan administrasi pajak daerah mulai dari pendataan, pelaporan, penetapan, penghitungan pajak, penerimaan dan laporan penerimaan pajak daerah sesuai dengan UU HKPD.",
                  image: fallbackImage,
                  details: [],
                  blocks: [
                    {
                      type: "paragraph",
                      text: "Solusi berbasis web untuk mendigitalisasikan proses pelayanan administrasi pajak daerah mulai dari pendataan, pelaporan, penetapan, penghitungan pajak, penerimaan dan laporan penerimaan pajak daerah sesuai dengan UU HKPD.",
                    },
                    {
                      type: "heading",
                      text: "Detail Solusi",
                      level: 4,
                    },
                    {
                      type: "list",
                      items: [
                        "Aplikasi ini telah digunakan oleh lebih dari 80 dinas",
                        "Aplikasi ini terdiri dari website (SmartGov Revenue) dalam pengelolaan pajak",
                        "Aplikasi ini mencakup seluruh proses bisnis pengelolaan perpajakan dari pendaftaran, pelaporan, penetapan, penerimaan, laporan, dan pelayanan",
                        "SmartGov Revenue mencakup seluruh kebutuhan operasional backoffice dari dinas",
                        "Aplikasi ini merupakan pengembangan berkelanjutan dari versi sebelumnya hingga penerapan UU HKPD sekarang",
                        "Aplikasi sudah lengkap untuk seluruh operasional pengelolaan pajak daerah, namun dapat dikustomisasi sesuai dengan peraturan daerah",
                        "Terdapat user manual ataupun dokumen integrasi apabila dibutuhkan",
                      ],
                    },
                  ],
                },
              },
              {
                tabId: "tab-2",
                tabLabel: "Sistem Pendataan Objek Pajak Digital Mobile",
                content: {
                  description:
                    "Aplikasi mobile untuk petugas lapangan guna melakukan pendataan objek pajak secara real-time dengan koordinat GPS.",
                  image: fallbackImage,
                  details: [],
                  blocks: [
                    {
                      type: "list",
                      items: [
                        "Solusi ini menyajikan hasil dari proses pemetaan pajak Dinas ataupun data dari BPN, sehingga dapat dengan mudah mengidentifikasi area atau batasan, melihat data wajib pajak dan objek pajak, dan membuat analisis lebih lanjut.",
                        "Peta ini bisa di layer dari Google Road, Google Satellite, Open Street Map, Bing Satellite, Waze",
                        "Dinas dapat dengan mudah memanajemen wajib pajak dan objek pajak serta melakukan verifikasi data tersebut",
                        "Dinas dapat melakukan analisa zonasi dari peta tematik yang tersedia",
                      ],
                    },
                    {
                      type: "heading",
                      text: "Solusi ini mencakup :",
                      level: 4,
                    },
                    {
                      type: "list",
                      items: [
                        "Aplikasi taxation dan tax survey",
                        "Instalasi ke server yang disepakati",
                        "User Manual",
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            id: "bphtb",
            title:
              "Sistem Pengelolaan Bea Perolehan Hak Atas Tanah dan Bangunan",
            tabs: [],
          },
          {
            id: "pajak-daerah-lainnya",
            title: "Sistem pengelolaan Pajak Daerah Lainnya",
            tabs: [
              {
                tabId: "tab-1",
                tabLabel: "Pajak Barang dan Jasa Tertentu",
                content: {
                  description: "",
                  image: "",
                  details: [],
                },
              },
              {
                tabId: "tab-2",
                tabLabel: "Pajak Reklame",
                content: {
                  description: "",
                  image: "",
                  details: [],
                },
              },
              {
                tabId: "tab-3",
                tabLabel: "Pajak Air Tanah",
                content: {
                  description: "",
                  image: "",
                  details: [],
                },
              },
            ],
          },
          {
            id: "layanan-pajak-daerah-lainnya",
            title: "Sistem pengelolaan Pajak Daerah Lainnya",
            tabs: [],
          },
        ],
      },
      {
        id: "cat-02",
        label: "Sistem Pengelolaan Retribusi Daerah",
        megaMenuChildId: "sistem-retribusi",
        subMenus: [
          {
            id: "retribusi-sampah-mobile",
            title: "Sistem pengelolaan retribusi sampah mobile",
            tabs: [
              {
                tabId: "tab-1",
                tabLabel: "Pajak Barang dan Jasa Tertentu",
                content: {
                  description:
                    "Solusi ini menyediakan aplikasi pendukung untuk dinas retribusi dalam kegiatan di lapangan",
                  image: fallbackImage,
                  details: [
                    "Solusi ini merupakan add on dari SmartGov Retribusi modul utama",
                    "Mobile ini juga diperkaya dengan adanya berbagai fitur Pengecekan data, Ketetapan, Penerimaan, Jadwal, Pengaduan, Pencatatan, Struk, Dashboard, dan Near me",
                  ],
                },
              },
              {
                tabId: "tab-2",
                tabLabel: "Sistem pengelolaan retribusi pasar mobile",
                content: {
                  description: "",
                  image: "",
                  details: [],
                },
              },
            ],
          },
          {
            id: "retribusi-jasa-usaha",
            title: "Sistem pengelolaan retribusi jasa usaha		",
            tabs: [
              {
                tabId: "tab-1",
                tabLabel: "Sistem pemesanan online aset daerah",
                content: {
                  description: "",
                  image: fallbackImage,
                  details: [],
                  blocks: [
                    {
                      type: "list",
                      items: [
                        "KIOSK dapat digunakan sebagai anjungan mandiri secara umum untuk mendapatkan informasi / pelayanan / pembayaran / antrian / konfirmasi kehadiran / etc",
                        "KIOSK dapat mengeluarkan receipt yang bisa digunakan untuk pembuktian seperti antrian / pembayaran",
                        "Sistem mengurangi kepadatan antrian yang terjadi pada lingkungan dinas",
                        "Sistem memberikan pelayanan yang efektif dan efisien waktu",
                        "Sistem mendorong wajib pajak lebih proaktif dan bisa menyelesaikan tagihan pajak secara mandiri",
                      ],
                    },
                    {
                      type: "heading",
                      text: "Kit Sistem",
                      level: 4,
                    },
                    {
                      type: "list",
                      items: [
                        "User Manual Mesin",
                        "User Manual Aplikasi",
                        "Instalasi pada server yang disepakati",
                        "Maintenance Alat dan Aplikasi",
                      ],
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        id: "cat-02b",
        label: "Sistem Monitoring Pajak Daerah",
        megaMenuChildId: "sistem-monitoring",
        subMenus: [],
      },
      {
        id: "cat-03",
        label: "Sistem Pelayanan",
        megaMenuChildId: "sistem-pelayanan",
        subMenus: [],
      },
      {
        id: "cat-04",
        label: "Layanan Pemutakhiran Pajak Daerah",
        megaMenuChildId: "layanan-pemutakhiran",
        subMenus: [],
      },
      {
        id: "cat-05",
        label: "Layanan Data Center",
        megaMenuChildId: "layanan-datacenter",
        subMenus: [],
      },
      {
        id: "cat-06",
        label: "Layanan Integrasi",
        megaMenuChildId: "layanan-integrasi",
        subMenus: [],
      },
      {
        id: "cat-07",
        label: "Layanan Pelatihan",
        megaMenuChildId: "layanan-pelatihan",
        subMenus: [],
      },
    ],
  },
  efd: { categories: [] },
  palapa: { categories: [] },
  "strategic-consulting": { categories: [] },
};

export function getProductDetailData(productId: string): ProductDetailData {
  return productDetailByProductId[productId] ?? { categories: [] };
}

/** Slug sub-menu pertama untuk product (untuk redirect /produk/[productSlug] → .../firstSub). */
export function getFirstSubSlug(productId: string): string | null {
  const data = getProductDetailData(productId);
  const firstCat = data.categories[0];
  const firstSub = firstCat?.subMenus?.[0];
  return firstSub?.id ?? null;
}

/** Daftar productId yang punya konten (untuk validasi slug). */
export function getProductSlugs(): string[] {
  return Object.keys(productDetailByProductId);
}

/**
 * Mencari category id yang punya megaMenuChildId atau yang berisi subMenu dengan id tersebut.
 * Dipakai saat halaman produk dibuka dari link MegaMenu (?sub=...).
 */
export function getCategoryIdForSubMenu(
  productId: string,
  subOrMegaMenuChildId: string,
): string | null {
  const data = getProductDetailData(productId);
  for (const cat of data.categories) {
    if (cat.megaMenuChildId === subOrMegaMenuChildId) return cat.id;
    const hasSub = cat.subMenus.some((s) => s.id === subOrMegaMenuChildId);
    if (hasSub) return cat.id;
  }
  return null;
}

/**
 * Dari URL ?product=...&sub=... (sub = megaMenu child id), dapatkan categoryId dan subMenuId untuk state.
 * subMenuId = sub jika ada subMenu dengan id itu, else subMenu pertama di category yang punya megaMenuChildId = sub.
 */
export function getProductDetailSelectionFromMegaMenu(
  productId: string,
  megaMenuChildId: string,
): { categoryId: string; subMenuId: string } | null {
  const data = getProductDetailData(productId);
  for (const cat of data.categories) {
    if (cat.megaMenuChildId === megaMenuChildId) {
      const firstSub = cat.subMenus[0];
      return {
        categoryId: cat.id,
        subMenuId: firstSub?.id ?? megaMenuChildId,
      };
    }
    const sub = cat.subMenus.find((s) => s.id === megaMenuChildId);
    if (sub) return { categoryId: cat.id, subMenuId: sub.id };
  }
  return null;
}
