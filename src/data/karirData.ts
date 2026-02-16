export interface KarirItem {
  slug: string;
  judul: string;
  daysAgo: number;
  tipePekerjaan: string;
  lokasiKerja: string;
  lokasi: string;
  pengalaman: string;
  klasifikasi: string;
  role?: string;
  tanggungJawab?: string[];
  kualifikasi?: string[];
  keuntungan?: string[];
}

const TANGGUNG_JAWAB_SOFTWARE = [
  "Melakukan pengujian & QA aplikasi",
  "Melakukan training pada user",
  "Melakukan input data pada aplikasi",
];

const KUALIFIKASI_SOFTWARE = [
  "Min. D3 Computer, Engineering, dan lulusan yang setara",
  "Min. 2 tahun pengalaman kerja",
  "Dapat mengoperasikan Microsoft Office (Word, Excel, Power Point)",
  "Terbiasa menggunakan SQL Server, MySQL, Oracle dan Postgres",
  "Proaktif dan cepat belajar",
  "Memiliki kemampuan komunikasi yang baik",
  "Siap untuk perjalanan dinas",
  "Bisa bekerja dalam tim dan mandiri",
  "Menguasai server dan infrastruktur jaringan (mikrotik, cisco)",
  "Terbiasa dengan Windows Server OS, Linux Centos version 7",
];

const KEUNTUNGAN_UMUM = [
  "Gaji pokok",
  "Tunjangan",
  "Bonus kinerja",
  "BPJS TK, JK, JHT",
  "Asuransi",
  "Jenjang karir terbuka",
];

export const karirData: KarirItem[] = [
  {
    slug: "software-implementor",
    judul: "Software Implementor",
    daysAgo: 2,
    tipePekerjaan: "Kontrak",
    lokasiKerja: "Hybrid",
    lokasi: "Jakarta Raya",
    pengalaman: "2 tahun pengalaman kerja",
    klasifikasi: "Teknologi",
    role: "Software Developer",
    tanggungJawab: TANGGUNG_JAWAB_SOFTWARE,
    kualifikasi: KUALIFIKASI_SOFTWARE,
    keuntungan: KEUNTUNGAN_UMUM,
  },
  {
    slug: "technical-operation-klungkung-nusapenida",
    judul: "Technical Operation Local Klungkung & Nusapenida",
    daysAgo: 2,
    tipePekerjaan: "Kontrak",
    lokasiKerja: "On Site",
    lokasi: "Klungkung",
    pengalaman: "1-3 tahun pengalaman",
    klasifikasi: "Operasional",
    keuntungan: KEUNTUNGAN_UMUM,
  },
  {
    slug: "technical-operation-palangkaraya",
    judul: "Technical Operation Local Palangkaraya",
    daysAgo: 2,
    tipePekerjaan: "Kontrak",
    lokasiKerja: "On Site",
    lokasi: "Palangkaraya",
    pengalaman: "1-3 tahun pengalaman",
    klasifikasi: "Operasional",
    keuntungan: KEUNTUNGAN_UMUM,
  },
];

export function getKarirBySlug(slug: string): KarirItem | undefined {
  return karirData.find((k) => k.slug === slug);
}

export function getKlasifikasiList(): string[] {
  const set = new Set(karirData.map((k) => k.klasifikasi));
  return ["Semua Klasifikasi", ...Array.from(set).sort()];
}
