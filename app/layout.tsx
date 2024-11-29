import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

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
          <Sidebar className="sticky top-0 h-screen z-20" />
          <main className="w-[calc(100vw-64px)] flex-1 pl-[183px] pr-[209px] pb-96 relative">
            {/* Navbar Sticky */}
            <Navbar className="sticky top-0 left-0 w-full z-30 bg-background" />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
