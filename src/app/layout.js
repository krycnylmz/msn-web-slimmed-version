"use client"
import MainLayout from "@/components/MainLayout";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <MainLayout>{children}</MainLayout>
    </SessionProvider>
  );
}