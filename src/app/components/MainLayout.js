"use client";
import { Inter } from "next/font/google";
import { metadata } from "@/app/config/metadata";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

function MainLayout({ children }) {
  return (
    <html lang="tr" className="relative h-full">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="w-full relative bg-gray-200 h-full">
        <Header />
        <main className="flex-grow max-w-screen-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}

export default MainLayout;
