import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AmbientGlow from "@/components/AmbientGlow";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Rahima Tahir | Portfolio",
  description: "High-end Scrollytelling Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        <AmbientGlow />
        {children}
      </body>
    </html>
  );
}
