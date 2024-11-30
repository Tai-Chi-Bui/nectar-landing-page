import React, { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nectar - AI Companions",
  description: "Built by Tai Bui",
};

// Lazy-load components to use with Suspense
const LazySidebar = React.lazy(() => import("./_components/sidebar"));
const LazyNavbar = React.lazy(() => import("./_components/navbar"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background overflow-x-hidden`}
      >
        <div className="flex w-[100vw]">
          {/* Sidebar Sticky */}
          <Suspense fallback={<div className="h-screen w-16 bg-gray-200">Loading Sidebar...</div>}>
            <LazySidebar className="hidden md:block sticky top-0 h-screen z-20" />
          </Suspense>
          <main className="w-[calc(100vw-64px)] flex-1 p-1 md:pl-[183px] md:pr-[209px] pb-96 relative">
            {/* Navbar Sticky */}
            <Suspense fallback={<div className="w-full h-12 bg-gray-200">Loading Navbar...</div>}>
              <LazyNavbar className="sticky top-0 left-0 w-full z-30 bg-background" />
            </Suspense>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
