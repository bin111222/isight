import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { SITE_URL } from "@/lib/sitemap";
import { clampTitleTag } from "@/lib/seoTitle";

const FAVICON_ICO_URL =
  "https://ik.imagekit.io/jaishreeskinfinitii/isighteyecare/public/favicon.ico?updatedAt=1772183807221";

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
    default: "Eye Doctor in Mumbai for LASIK & Cataract | iSight Eye Care",
    template: "%s",
  },
  description:
    "Leading eye care in Mumbai for LASIK, cataract, retina and dry eye treatment. Trusted ophthalmologist Dr. Nikhil Nasta. Book your consultation today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: clampTitleTag("Eye Doctor in Mumbai for LASIK & Cataract | iSight Eye Care"),
    description:
      "Leading eye care in Mumbai for LASIK, cataract, retina and dry eye treatment. Trusted ophthalmologist Dr. Nikhil Nasta.",
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
    title: clampTitleTag("Eye Doctor in Mumbai for LASIK & Cataract | iSight Eye Care"),
    description:
      "Leading eye care in Mumbai for LASIK, cataract, retina and dry eye treatment. Trusted ophthalmologist Dr. Nikhil Nasta.",
    images: ["/og-image.webp"],
  },
  icons: {
    icon: [{ url: FAVICON_ICO_URL, type: "image/x-icon" }],
    shortcut: [{ url: FAVICON_ICO_URL, type: "image/x-icon" }],
    apple: [{ url: FAVICON_ICO_URL, type: "image/x-icon" }],
  },
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
