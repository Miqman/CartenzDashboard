import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cartenz.co.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cartenz - Company Profile",
    template: "%s | Cartenz",
  },
  description:
    "Cartenz Technology — solusi digital pemerintah daerah: pengelolaan pajak (SmartGov), monitoring (EFD), Palapa, Citigov, dan strategic consulting.",
  applicationName: "Cartenz",
  keywords: [
    "Cartenz",
    "SmartGov",
    "EFD",
    "Palapa",
    "Citigov",
    "pajak daerah",
    "digitalisasi pemerintah",
    "pemerintah daerah Indonesia",
  ],
  authors: [{ name: "PT Cartenz Technology" }],
  creator: "PT Cartenz Technology",
  publisher: "PT Cartenz Technology",
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "/",
    languages: {
      id: "/id",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "Cartenz",
    title: "Cartenz - Company Profile",
    description:
      "Solusi digital terintegrasi untuk pemerintah daerah Indonesia. Pengelolaan pajak, monitoring real-time, dan platform layanan publik.",
    images: [
      {
        url: "/assets/logoCartenz2.png",
        width: 1200,
        height: 630,
        alt: "Cartenz Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartenz - Company Profile",
    description:
      "Solusi digital terintegrasi untuk pemerintah daerah Indonesia.",
    images: ["/assets/logoCartenz2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Cartenz Technology",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logoCartenz2.png`,
    sameAs: ["https://www.linkedin.com/company/cartenz"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      areaServed: "ID",
      availableLanguage: ["Indonesian", "English"],
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
