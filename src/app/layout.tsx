import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

import localFont from "next/font/local";

const helvetica = localFont({
  src: "../../public/fonts/Helvetica.ttf",
  variable: "--font-helvetica",
});

export const metadata: Metadata = {
  title: "Asmi Collection",
  description: "Developed by Avishkar Parab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${helvetica.className}`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
