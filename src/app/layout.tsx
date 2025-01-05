import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',  // Add display swap for better font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',  // Add display swap for better font loading
});

export const metadata: Metadata = {
  title: "Shopino",
  description: "Shopino - Your one-stop shop for all your fashion needs, this is an ecommerce website built with Next.js and Tailwind CSS",
  icons: {
    icon: "/shopino-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}