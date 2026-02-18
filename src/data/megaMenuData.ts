export interface MegaMenuDetail {
  title: string;
  items: string[];
}

export interface MegaMenuChild {
  id: string;
  label: string;
  contentTitle?: string;
  contentSubtitle?: string;
  details: MegaMenuDetail[];
}

export interface MegaMenuItem {
  id: string;
  label: string;
  children: MegaMenuChild[];
}

export const megaMenuData: MegaMenuItem[] = [
  {
    id: "smartgov",
    label: "Solusi Pengelolaan Pajak Daerah",
    children: [
      {
        id: "sistem-kota-kab",
        label: "Sistem Pengelolaan Pajak Daerah Kota/ Kabupaten",
        contentTitle: "SMARTGOV",
        contentSubtitle: "Solusi Pengelolaan Pajak Daerah",
        details: [
          {
            title:
              "Sistem pengelolaan pajak bumi dan bangunan perdesaan dan perkotaan",
            items: [
              "Sistem pengelolaan objek pajak spasial",
              "Sistem pendataan objek pajak digital mobile",
            ],
          },
          {
            title:
              "Sistem pengelolaan Bea Perolehan Hak atas Tanah dan Bangunan",
            items: [],
          },
          {
            title: "Sistem pengelolaan Pajak Daerah Lainnya",
            items: [
              "Pajak Barang dan Jasa Tertentu",
              "Pajak Reklame (Sistem monitoring reklame mobile)",
              "Pajak Air Tanah",
              "Pajak Sarang Burung Walet",
              "Pajak Mineral Bukan Logam dan Batuan",
              "Opsen PKB",
              "Opsen BBNKB",
              "Opsen Mineral Bukan Logam dan Batuan",
            ],
          },
          {
            title:
              "Dashboard realisasi penerimaan Pajak Daerah dan Retribusi Daerah",
            items: [],
          },
        ],
      },
      {
        id: "sistem-retribusi",
        contentTitle: "SMARTGOV",
        contentSubtitle: "Solusi Pengelolaan Pajak Daerah",
        label: "Sistem pengelolaan retribusi daerah",
        details: [
          {
            title: "Sistem pengelolaan retribusi jasa umum",
            items: [
              "Sistem pengelolaan retribusi sampah mobile",
              "Sistem pengelolaan retribusi pasar mobile",
            ],
          },
          {
            title: "Sistem pengelolaan retribusi jasa usaha",
            items: ["Sistem pemesanan online aset daerah"],
          },
          {
            title: "Sistem pengelolaan retribusi jasa perizinan tertentu",
            items: [],
          },
          {
            title: "Sistem pengelolaan pembayaran retribusi",
            items: [],
          },
        ],
      },
      {
        id: "sistem-monitoring",
        contentTitle: "SMARTGOV",
        contentSubtitle: "Solusi Pengelolaan Pajak Daerah",
        label: "Sistem monitoring pajak daerah",
        details: [
          {
            title: "Sistem pengawasan Objek Pajak Barang dan Jasa Tertentu",
            items: [],
          },
          {
            title:
              "Sistem pengawasan Objek Pajak Mineral Bukan Logam dan Batuan",
            items: [],
          },
          {
            title: "Sistem pengawasan Objek Pajak Air Tanah dan permukaan",
            items: [],
          },
        ],
      },
      {
        id: "sistem-pelayanan",
        contentTitle: "SMARTGOV",
        contentSubtitle: "Solusi Pengelolaan Pajak Daerah",
        label: "Sistem pelayanan",
        details: [
          {
            title:
              "Sistem Pelayanan Online Objek Pajak bumi dan bangunan perdesaan dan perkotaan",
            items: [],
          },
          { title: "Sistem Pelayanan Online PPAT", items: [] },
          {
            title: "Sistem Pelayanan Online Pajak Daerah lainnya",
            items: [],
          },
          { title: "E- KiosK pelayanan", items: [] },
        ],
      },
      {
        id: "layanan-pemutakhiran",
        contentTitle: "SMARTGOV",
        contentSubtitle: "Solusi Pengelolaan Pajak Daerah",
        label: "Layanan Pemutakhiran pajak daerah",
        details: [
          { title: "Pemutakhiran peta objek pajak daerah", items: [] },
          { title: "Pendataan objek pajak daerah", items: [] },
          { title: "Penilaian zona Tanah", items: [] },
          { title: "Penilaian Individu", items: [] },
        ],
      },
      {
        id: "layanan-datacenter",
        contentTitle: "SMARTGOV",
        contentSubtitle: "Solusi Pengelolaan Pajak Daerah",
        label: "Layanan Data Center",
        details: [{ title: "Cloud", items: [] }],
      },
      {
        id: "layanan-integrasi",
        contentTitle: "SMARTGOV",
        contentSubtitle: "Solusi Pengelolaan Pajak Daerah",
        label: "Layanan Integrasi",
        details: [
          { title: "Integrasi data dengan BPN", items: [] },
          { title: "Integrasi pembayaran Bank", items: [] },
        ],
      },
      {
        id: "layanan-pelatihan",
        contentTitle: "SMARTGOV",
        contentSubtitle: "Solusi Pengelolaan Pajak Daerah",
        label: "Layanan Pelatihan",
        details: [
          { title: "Pelatihan Online", items: [] },
          { title: "Pelatihan Onsite", items: [] },
        ],
      },
    ],
  },
  {
    id: "efd",
    label: "Solusi Monitoring Pajak Daerah",
    children: [],
  },
  {
    id: "palapa",
    label: "Digitalisasi Layanan Pemerintah Terintegrasi",
    children: [],
  },
  {
    id: "strategic-consulting",
    label: "Strategic Consulting",
    children: [],
  },
];
