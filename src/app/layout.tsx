import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { SITE_URL } from "@/lib/sitemap";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Best Eye Doctor in Mumbai | iSight Eye Care – Dr. Nikhil Nasta",
    template: "%s | iSight Eye Care Mumbai",
  },
  description:
    "Expert eye care in Mumbai. LASIK, cataract surgery, dry eye treatment, retinal care & more. Award-winning ophthalmologist Dr. Nikhil Nasta. Book consultation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Eye Doctor in Mumbai | iSight Eye Care – Dr. Nikhil Nasta",
    description:
      "Expert eye care in Mumbai. LASIK, cataract surgery, dry eye treatment, retinal care & more. Award-winning ophthalmologist Dr. Nikhil Nasta.",
    url: SITE_URL,
    siteName: "iSight Eye Care",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "iSight Eye Care Mumbai – Dr. Nikhil Nasta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Eye Doctor in Mumbai | iSight Eye Care – Dr. Nikhil Nasta",
    description:
      "Expert eye care in Mumbai. LASIK, cataract, dry eye, retina & more. Award-winning ophthalmologist Dr. Nikhil Nasta.",
    images: ["/og-image.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon/favicon-16x16.webp", sizes: "16x16", type: "image/webp" },
      { url: "/favicon/favicon-32x32.webp", sizes: "32x32", type: "image/webp" },
    ],
    apple: { url: "/favicon/apple-touch-icon.webp", type: "image/webp" },
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.webp" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.webp" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col cursor-none ${plusJakarta.variable}`}>
        <CustomCursor />
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
