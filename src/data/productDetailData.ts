/**
 * Struktur data untuk halaman detail produk: sidebar accordion (Level 1) + sub-menus (Level 2) + tabs dengan konten.
 * Dikunci per product id (solusi-pajak, monitoring-pajak, dll.).
 *
 * Konten setelah gambar bisa pakai blocks (dinamis) atau legacy description + details.
 */

import { isProductVisible } from "@/config/productVisibility";

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
  /** Jika true, sidebar hanya menampilkan daftar subMenus sebagai menu level 1 (tanpa accordion kategori). Untuk EFD/Palapa. */
  sidebarAsFlat?: boolean;
}

export type ProductDetailData = {
  categories: ProductDetailCategory[];
};

/** Input untuk produk flat (EFD/Palapa): satu topik = satu label + content. */
export interface FlatTopicContent {
  description?: string;
  descricption?: string; // typo support
  image?: string;
  details?: string[];
  blocks?: ContentBlock[];
}

export interface FlatTopic {
  id?: string;
  label: string;
  content: FlatTopicContent;
}

const fallbackImage = "/assets/galeri5.jpg";

/** Slug dari string (untuk sub id unik). */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Normalisasi array topik flat jadi ProductDetailData: 1 kategori, N subMenus, masing-masing 1 tab.
 * Dipakai untuk EFD/Palapa yang tidak punya hierarchy kategori.
 */
export function normalizeFlatTopicsToDetailData(
  topics: FlatTopic[],
  sectionLabel: string,
  productId: string,
  defaultImage: string = fallbackImage,
): ProductDetailData {
  const categoryId = "detail";
  const subMenus: ProductSubMenu[] = topics.map((topic, index) => {
    const id = topic.id ?? `${productId}-${slugify(topic.label)}`;
    const desc = topic.content.description ?? topic.content.descricption ?? "";
    const content: TabContent = {
      description: desc,
      image: topic.content.image?.trim() ? topic.content.image : defaultImage,
      details: topic.content.details ?? [],
      blocks: topic.content.blocks,
    };
    return {
      id,
      title: topic.label,
      tabs: [
        {
          tabId: "tab-1",
          tabLabel: topic.label,
          content,
        },
      ],
    };
  });
  return {
    categories: [
      {
        id: categoryId,
        label: sectionLabel,
        isExpanded: true,
        sidebarAsFlat: true,
        subMenus,
      },
    ],
  };
}

// Contoh data EFD (flat topics) → dinormalisasi ke ProductDetailData
const efdData: FlatTopic[] = [
  {
    id: "efd-pajak-bjtt",
    label: "Sistem pengawasan Objek Pajak Barang dan Jasa Tertentu",
    content: {
      description:
        "Solusi ini Merekam dan memonitor transaksi wajib pajak hotel, restoran, kafe, hiburan, parkir, dan lainnya",
      image: "",
      details: [],
      blocks: [
        {
          type: "list",
          items: [
            "Jenis solusi perekaman yang dipasang dapat disesuaikan dengan kondisi wajib pajak",
            "POS Online (Android based) untuk WP yang belum menggunakan sistem penjualan online",
            "Web Service/Software untuk WP yang telah menggunakan POS berbasis cloud",
            "Interceptor Box/Software EFD untuk WP yang menggunakan sistem basis data",
            "Perekaman dapat bersifat real-time dan/atau tergantung dengan kondisi dan availabilitas data wajib pajak",
            "POS Online mencakup aplikasi rekam transaksi khusus seperti sistem rekam transaksi kafe, restoran, retribusi, pariwisata, parkir, dan hotel, atau simple kalkulator online, sesuai kebutuhan operasional bisnis dan dapat digunakan secara hybrid offline/online",
            "POS Online dapat melakukan pembayaran dengan QRIS, Debit/Credit, dan E Money, selain itu dapat membayar PPOB",
            "Interceptor Box dan Software EFD dapat mengakomodir 100+ jenis basis data, 100+ jenis online pos, serta merekam transaksi platform order online seperti - - GrabFood, GoFood, Shopee Food.",
            "Software EFD juga menyediakan perekaman transaksi melalui API atau File Sharing seperti FTP/SFTP, Google Drive dan lainnya.",
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
  {
    id: "efd-mineral-mblb",
    label: "Sistem pengawasan Objek Pajak Mineral Bukan Logam dan Batuan",
    content: {
      description:
        "Solusi ini memberikan platform untuk mempermudah wajib pajak dan pemerintah untuk melakukan pelaporan pajak dan monitoring pajak MBLB untuk mengoptimasi penerimaan MBLB",
      image: "",
      details: [],
      blocks: [
        {
          type: "heading",
          text: "Standard Process",
          level: 4,
        },
        {
          type: "paragraph",
          text: "Seluruh transaksi mineral tercatat dalam perekaman digital melalui sistem POS online dan mencetak faktur penjualan.",
        },
        {
          type: "heading",
          text: "Field Surveillance",
          level: 4,
        },
        {
          type: "paragraph",
          text: "Kamera yang dipasang merekam plat nomor & menghitung setiap kendaraan jenis truk yang lewat di jalan tambang.",
        },
        {
          type: "heading",
          text: "Analytics",
          level: 4,
        },
        {
          type: "paragraph",
          text: "Seluruh data yang didapat dari sistem POS online, kamera CCTV dan pelaporan pajak bulanan, di tampilkan secara langsung melalui dashboard analisis",
        },
        {
          type: "heading",
          text: "Field Monitoring",
          level: 4,
        },
        {
          type: "paragraph",
          text: "Aplikasi mobile untuk petugas melakukan pemeriksaan truk di jalan/pos penjagaan",
        },
      ],
    },
  },
  {
    id: "efd-air-tanah",
    label: "Sistem pengawasan Objek Pajak Air Tanah dan permukaan",
    content: {
      description:
        "Smart Water Meter adalah solusi untuk mendapatkan data riil konsumsi air tanah / air permukaan pada WP dengan bisnis yang berpotensi menggunakan air dalam jumlah besar (seperti hotel, mall, kantor, dan sebagainya) sebagai dasar perhitungan pajak air dan memonitor penggunaan air tanah melalui dashboard, selain itu juga.",
      image: "",
      details: [],
      blocks: [
        {
          type: "heading",
          text: "Terdapat 3 jenis solusi smart water meter yang dapat diimplementasikan, yaitu:",
          level: 4,
        },
        {
          type: "list",
          items: [
            "EFD Pulse Water Meter Reader, pemasangan pada alat water meter yang sudah compatible dengan alat pengiriman data.",
            "EFD Water Meter Smart Tap, pemasangan pada pipa besar yang sulit untuk di tap oleh meteran",
            "EFD Smart Water Meter Device, pemasangan water meter terhadap wp yang belum menggunakan atau menggunakan water meter yang compatible dengan alat pengiriman data.",
          ],
        },
        {
          type: "heading",
          text: "Detail Solusi",
          level: 4,
        },
        {
          type: "list",
          items: [
            "Selain dari solusi yang ditawarkan, Cartenz menyediakan opsi untuk menggunakan GSM, NB-IOT maupun LoRaWAN  untuk menjangkau berbagai area tergantung dengan kondisi lokasi pipa",
            "Dashboard kami berisikan berbagai informasi dari data Air maupun data Alat, seperti Overview dan Details terkait seperti jumlah, berapa yang aktif dan tidak aktif, berapa yang mengirim data dan tidak, serta kondisi operasional bila terjadi isu di lapangan, apakah tim sedang/sudah menyelesaikan.",
            "Dashboard juga berisikan informasi secara geospatial bila dibutuhkan.",
            "Dashboard berisikan informasi terkait penggunaan air dan  perpajakannya seperti berapa banyak air yang digunakan pada area tersebut dan  potensi pendapatan pajaknya.",
            "Informasi di Dashboard dapat dilihat atau filter per area atau per wajib pajak, sehingga bisa dilakukan analisa lebih spesifik bila dibutuhkan",
          ],
        },
      ],
    },
  },
];

const palapaData: FlatTopic[] = [
  {
    id: "palapa-kendali-kinerja",
    label: "Kendali Kinerja dan Pelayanan Pemerintah",
    content: {
      description:
        "Memastikan kinerja pelayanan pemerintah berjalan sesuai prosedur tanpa khawatir keterlambatan kendala serta OPD bergerak sendiri-sendiri. PALAPA membantu pimpinan melihat progres program prioritas secara ringkas dan real, lintas OPD, sehingga hambatan cepat terdeteksi dan koreksi bisa dilakukan sebelum masalah membesar.",
      image: "",
      details: [],
      blocks: [
        {
          type: "heading",
          text: "Detail Solusi:",
          level: 4,
        },
        {
          type: "list",
          items: [
            "Ringkasan progres lintas OPD dalam satu tampilan",
            "Catatan hambatan dan tindak lanjut yang bisa ditelusuri",
            "Pantau kinerja berdasarkan aktivitas nyata, bukan sekadar laporan",
            "Sistem kepuasan dan umpan balik masyarakat",
            "Tanda peringatan dini untuk program yang mulai terlambat",
          ],
        },
      ],
    },
  },
  {
    id: "palapa-perizinan-investasi",
    label: "Perizinan & Investasi Lebih Terserap",
    content: {
      description:
        "Perizinan adalah wajah ekonomi daerah. Ketika izin lambat dan proses tidak jelas, investor mundur, pelaku usaha mengeluh, dan ekonomi ikut melambat. PALAPA membantu perizinan daerah lebih tertib, mudah dipantau, dan lebih cepat diselesaikan. Ini bukan hanya soal aplikasi, tapi soal menciptakan iklim usaha yang lebih percaya dan lebih nyaman.",
      image: "",
      details: [],
      blocks: [
        {
          type: "heading",
          text: "Detail Solusi:",
          level: 4,
        },
        {
          type: "list",
          items: [
            "Perizinan non-OSS berjalan lebih terukur",
            "Monitoring proses perizinan dari awal sampai selesai",
            "Antrean MPP lebih rapi (online dan offline)",
            "Kiosk pelayanan untuk membantu warga yang butuh pendampingan",
            "Pendataan potensi investasi daerah",
          ],
        },
      ],
    },
  },
];

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
            title: "Sistem pengelolaan retribusi jasa usaha",
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
  efd: normalizeFlatTopicsToDetailData(
    efdData,
    "Solusi yang kami tawarkan",
    "efd",
  ),
  palapa: normalizeFlatTopicsToDetailData(
    palapaData,
    "Solusi yang kami tawarkan",
    "palapa",
  ),
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

/** Semua productId yang punya data (termasuk yang disembunyikan). */
export function getAllProductSlugs(): string[] {
  return Object.keys(productDetailByProductId);
}

/** Daftar productId yang boleh diakses publik (validasi slug halaman /produk). */
export function getProductSlugs(): string[] {
  return getAllProductSlugs().filter(isProductVisible);
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
