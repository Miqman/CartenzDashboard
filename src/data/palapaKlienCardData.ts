/**
 * Data klien tampilan card untuk halaman produk Palapa.
 * Setiap item: gambar, logo, title, nama_daerah.
 */

export interface PalapaKlienCardItem {
  gambar: string;
  logo: string;
  title: string;
  nama_daerah: string;
}

export const PALAPA_KLIEN_CARDS: PalapaKlienCardItem[] = [
  {
    gambar: "/assets/timKamiFrame.png",
    logo: "/assets/logoKlienDefault.png",
    title: "Bedas Digital Service",
    nama_daerah: "Kabupaten Bandung",
  },
  {
    gambar: "/assets/timKamiFrame.png",
    logo: "/assets/logoKlienDefault.png",
    title: "Serba Digi",
    nama_daerah: "Kabupaten Serang",
  },
  {
    gambar: "/assets/timKamiFrame.png",
    logo: "/assets/logoKlienDefault.png",
    title: "Kesatu",
    nama_daerah: "Kabupaten Kediri",
  },
  {
    gambar: "/assets/timKamiFrame.png",
    logo: "/assets/logoKlienDefault.png",
    title: "DidingKlik",
    nama_daerah: "Kabupaten Pandeglang",
  },
  {
    gambar: "/assets/timKamiFrame.png",
    logo: "/assets/logoKlienDefault.png",
    title: "Asinan Bogor",
    nama_daerah: "Kota Bogor",
  },
  {
    gambar: "/assets/timKamiFrame.png",
    logo: "/assets/logoKlienDefault.png",
    title: "Diasaja",
    nama_daerah: "Kabupaten Morowali Utara",
  },
];

export const PALAPA_KLIEN_SECTION = {
  badge: "Klien",
  title: "PEMERINTAH DAERAH",
  rating: "★ 4.5/5 Kepuasan Pelanggan",
} as const;
