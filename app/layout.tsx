import { ReactNode } from 'react';
import { Lato } from "next/font/google";
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Toaster } from 'sonner';
import { getBootData } from '@/services/webService';
import React from "react";
import { BootProvider } from "@/context/BootContext";

// ✅ Updated Metadata with proper favicon handling
export async function generateMetadata() {
  try {
    const res = await getBootData();

    if (res && res.success) {
      const favicon = res.data.bs?.favicon;

      return {
        icons: {
          icon: [
            {
              url: favicon && favicon.startsWith("http")
                ? favicon
                : favicon
                  ? `${favicon}`
                  : "/favicon.png",
            },
          ],
        },
      };
    }
  } catch (error) {
    console.error("Layout metadata fetch error:", error);
  }

  return {
    icons: {
      icon: [{ url: "/favicon.png" }],
    },
  };
}

// Configure Lato
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  let breadcrumbImage = "/about/about-banner.png";

  try {
    const res = await getBootData();
    if (res?.success && res?.data?.bs?.breadcrumb) {
      breadcrumbImage = res.data.bs.breadcrumb;
    }
  } catch (error) {
    console.error("Boot data fetch error:", error);
  }

  return (
    <html lang="en">
      <head>
        {/* ✅ Fallback favicon (VERY IMPORTANT for Vercel + cache issues) */}
        <link rel="icon" href="/favicon-v2.png" />

        {/* Optional: Apple devices */}
        <link rel="apple-touch-icon" href="/favicon-v2.png" />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>

      <body className={`${lato.variable} font-sans antialiased`}>
        <Toaster position="top-right" richColors />
        <Header />

        <BootProvider breadcrumbImage={breadcrumbImage}>
          <main>{children}</main>
        </BootProvider>

        <Footer />
      </body>
    </html>
  );
}