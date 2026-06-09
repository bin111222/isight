import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
    default: "Eye Surgeon Mumbai | Dr. Nikhil Nasta | iSight Eye Care & Surgery",
    template: "%s",
  },
  description:
    "Mumbai eye surgeon Dr. Nikhil Nasta at iSight Eye Care & Surgery—LASIK, cataract surgery, retina and dry eye care. Book your free consultation today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: clampTitleTag("Eye Surgeon Mumbai | Dr. Nikhil Nasta | iSight Eye Care & Surgery"),
    description:
      "Mumbai eye surgeon Dr. Nikhil Nasta at iSight Eye Care & Surgery—LASIK, cataract surgery, retina and dry eye care. Book your free consultation today.",
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
    title: clampTitleTag("Eye Surgeon Mumbai | Dr. Nikhil Nasta | iSight Eye Care & Surgery"),
    description:
      "Mumbai eye surgeon Dr. Nikhil Nasta at iSight Eye Care & Surgery—LASIK, cataract surgery, retina and dry eye care. Book your free consultation today.",
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
        <GoogleAnalytics />
        <CustomCursor />
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
