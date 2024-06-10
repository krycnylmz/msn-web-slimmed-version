"use client";
import MainLayout from "@/components/MainLayout";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import nextI18nextConfig from "../../next-i18next.config";



const AppWithTranslation = appWithTranslation(MainLayout, nextI18nextConfig);

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <AppWithTranslation>{children}</AppWithTranslation>
    </SessionProvider>
  );
}
