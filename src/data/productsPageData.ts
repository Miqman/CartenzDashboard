/**
 * Data untuk navigasi global halaman produk (Level 1) dan deskripsi Section 1.
 * Id harus match dengan megaMenuData agar Sidebar & Content ikut berubah.
 */

/** Default aset untuk fallback saat dari Strapi kosong atau pakai data default. */
export const DEFAULT_HERO_IMAGE = "/assets/galeri5.jpg";
export const DEFAULT_LOGO = "/assets/smartgov_logo.png";

export const PRODUCT_NAV_ITEMS = [
  {
    id: "smartgov",
    brand: "SMARTGOV",
    label: "Solusi Pengelolaan Pajak Daerah",
    logo: "/assets/smartgov_logo.png",
  },
  {
    id: "efd",
    brand: "EFD",
    label: "Solusi Monitoring Pajak Daerah",
    logo: "/assets/efd_logo.png",
  },
  {
    id: "palapa",
    brand: "PALAPA",
    label: "Sistem enabler kebijakan pemerintah",
    logo: "/assets/palapa_logo.png",
  },
  {
    id: "strategic-consulting",
    brand: "STRATEGIC CONSULTING",
    label: "Layanan Konsultasi dan Project",
    logo: "/assets/consulting_logo.png",
  },
] as const;

const DEFAULT_DESCRIPTION =
  "Solusi terintegrasi untuk mendukung pengelolaan dan pemantauan pajak daerah serta digitalisasi layanan pemerintah.";

export const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  smartgov:
    "SMARTGOV menyediakan solusi pengelolaan pajak daerah yang terintegrasi untuk Kota dan Kabupaten, mencakup Pajak Bumi dan Bangunan, Bea Perolehan Hak atas Tanah dan Bangunan, retribusi daerah, serta dashboard realisasi penerimaan.",
  efd: "Solusi monitoring pajak daerah untuk pengawasan objek pajak dan realisasi penerimaan secara real-time.",
  palapa:
    "Platform sistem enabler kebijakan pemerintah (PALAPA) untuk meningkatkan kualitas layanan publik.",
  "strategic-consulting":
    "Layanan konsultasi dan project strategic untuk mendampingi pemerintah dalam transformasi digital.",
};

export function getProductDescription(categoryId: string): string {
  return PRODUCT_DESCRIPTIONS[categoryId] ?? DEFAULT_DESCRIPTION;
}

/** Data hero Section 1 per produk: judul, paragraf (bisa lebih dari satu), link demo. */
export interface ProductHeroData {
  title: string;
  paragraphs: string[];
  demoUrl?: string;
  /** URL logo (dari Strapi atau default). */
  logoUrl?: string;
  /** URL gambar hero (dari Strapi atau default). */
  heroImageUrl?: string;
}

export const PRODUCT_HERO: Record<string, ProductHeroData> = {
  smartgov: {
    title: "Solusi Pengelolaan Pajak Daerah Kota/Kabupaten",
    paragraphs: [
      "SmartGov merupakan satu portal aplikasi yang terdiri berbagai jenis pajak seperti PBB-P2, BPHTB, Pajak Hotel, Pajak Restoran, Pajak Parkir, Pajak Hiburan, Pajak Mineral, Pajak Walet, Pajak Air Tanah, Pajak Reklame, HKPD, PBJT, serta Retribusi menjadi satu kesatuan.",
      "SmartGov bertujuan untuk mempermudah pemerintah daerah yang ada di Indonesia dalam pengelolaan berbagai jenis pajak tersebut seperti pelaporan, pendataan, pemetaan, penetapan, penerimaan, maupun pemberkasaan. Sistem ini juga membantu pemerintah daerah dalam mendapatkan data secara real atau actual baik target pencapaian maupun realisasi penerimaan yang dapat diintegrasikan dengan pihak bank daerah setempat. Lalu sistem ini juga memberikan validitas data terkait layanan yang sudah terintegrasi dengan BPN maupun BSRE. Untuk capaian SmartGov sampai saat ini berjumlah 80+ pemerintah daerah kabupaten maupun kota, dengan beragam jenis pajak beragam fitur yang digunakan.",
    ],
    demoUrl: "https://smartgov.cartenz.com",
    logoUrl: "/assets/smartgov_logo.png",
    heroImageUrl: "/assets/galeri5.jpg",
  },
  efd: {
    title: "Solusi Monitoring Pajak Daerah",
    paragraphs: [
      "EFD diciptakan sebagai solusi komprehensif bagi pemerintah daerah dalam meningkatkan penerimaan pajak daerah.",
      "EFD (Electronic Fiscal Device) adalah sistem yang digunakan oleh pemerintah daerah untuk memantau pendapatan para wajib pajak. Tujuan utama dari penggunaan EFD adalah memastikan bahwa setiap transaksi terekam secara akurat untuk mengurangi kemungkinan terjadinya ketidaksesuaian antara pendapatan yang dilaporkan oleh wajib pajak dan penerimaan pajak daerah yang sebenarnya. EFD dapat diterapkan pada berbagai jenis usaha yang termasuk dalam kategori wajib pajak, seperti restoran, tempat hiburan, hotel, dan parkir.  EFD dapat digunakan untuk lebih dari 100 jenis POS, lebih dari 100 jenis tipe database, dan dapat digunakan untuk monitoring online platform  Saat ini, terdapat sekitar 13.000 wajib pajak dari lebih dari 80 kota/kabupaten yang telah memasang sistem di Cartenz, dengan total 23 juta transaksi per bulan dan pendapatan wajib pajak mencapai 4,1 triliun rupiah.",
    ],
    demoUrl: "https://smartgov.cartenz.com",
    logoUrl: "/assets/efd_logo.png",
    heroImageUrl: "/assets/galeri5.jpg",
  },
  palapa: {
    title: "Sistem enabler kebijakan pemerintah",
    paragraphs: [
      "Palapa bertujuan untuk membuat proses layanan instansi pemerintah menjadi lebih efektif, efisien, praktis serta mendekatkan layanan pemerintah ke masyarakat dalam satu sistem.",
      "Palapa adalah platform tumbuh mandiri terintegrasi yang memungkinkan pemerintah membuat layanan digital dengan mudah tanpa memerlukan keahlian pemrograman. Dirancang untuk mempermudah digitalisasi di berbagai instansi pemerintahan, Palapa mendukung berbagai kebutuhan SKPD, seperti informasi, pelayanan, dan antrian, serta dapat diintegrasikan dengan sistem yang sudah ada. Dengan Palapa, pemerintah diharapkan dapat bekerja lebih cepat, efisien, dan efektif dalam melayani masyarakat dan berkoordinasi antar dinas.",
      "Platform ini juga mudah diakses oleh semua lapisan masyarakat, baik yang paham teknologi maupun yang tidak, sehingga inklusivitas layanan tetap terjaga. Dengan menyediakan semua layanan dalam satu platform, Citigov menyederhanakan akses dan interaksi antara masyarakat dan pemerintah, menciptakan pengalaman layanan publik yang lebih terintegrasi dan efisien.",
    ],
    demoUrl: "https://smartgov.cartenz.com",
    logoUrl: "/assets/palapa_logo.png",
    heroImageUrl: "/assets/galeri5.jpg",
  },
  "strategic-consulting": {
    title: "Layanan Konsultasi dan Project",
    paragraphs: [
      "Cartenz mulai secara aktif mengikuti kegiatan project sebagai salah satu layanan utama pada tahun 2022.",
      "Project Consultant bertujuan untuk memberikan layanan konsultasi dan rekomendasi, khususnya di bidang teknologi informasi, kepada seluruh tingkat instansi pemerintahan.",
    ],
    demoUrl: "https://smartgov.cartenz.com",
    logoUrl: "/assets/consulting_logo.png",
    heroImageUrl: "/assets/galeri5.jpg",
  },
};

export function getProductHero(productSlug: string): ProductHeroData {
  const hero = PRODUCT_HERO[productSlug];
  if (hero) return hero;
  const item = PRODUCT_NAV_ITEMS.find((i) => i.id === productSlug);
  return {
    title: item?.label ?? "Produk",
    paragraphs: [getProductDescription(productSlug)],
  };
}

export const PRODUCT_PAGE_ASSETS = {
  logo: DEFAULT_LOGO,
  heroImage: DEFAULT_HERO_IMAGE,
} as const;
