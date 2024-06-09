"use client";
import { Inter } from "next/font/google";
import { metadata } from "@/app/config/metadata";
import Header from "@/components/Header";
import { appWithTranslation } from "next-i18next";
import nextI18nextConfig from "../../../next-i18next.config";

const inter = Inter({ subsets: ["latin"] });

function MainLayout({ children }) {
  return (
    <html lang="en" className="relative h-full">
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

export default appWithTranslation(MainLayout, nextI18nextConfig);
