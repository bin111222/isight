import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
};

export const metadata: Metadata = {
  title: "Best Eye Doctor in Mumbai | iSight Eye Care – Dr. Nikhil Nasta",
  description:
    "Expert eye care in Mumbai. LASIK, cataract surgery, dry eye treatment, retinal care & more. Award-winning ophthalmologist Dr. Nikhil Nasta. Book consultation.",
  openGraph: {
    title: "Best Eye Doctor in Mumbai | iSight Eye Care",
    description: "Expert eye care for a clearer tomorrow. Dr. Nikhil Nasta.",
  },
  icons: {
    icon: [{ url: "/favicon/favicon.ico", sizes: "any" }],
    apple: "/favicon/apple-touch-icon.png",
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
