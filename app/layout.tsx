import type React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/preloader";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio 2.0 | Awwwards Level",
    template: "%s | Portfolio 2.0",
  },
  description:
    "A luxurious, motion-rich portfolio experience showcasing high-end web development and AI solutions.",
  keywords: [
    "Portfolio",
    "Web Development",
    "AI",
    "Design",
    "Next.js",
    "React",
    "Three.js",
  ],
  authors: [{ name: "Himanchal" }],
  creator: "Himanchal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://himanchal.dev",
    title: "Portfolio 2.0 | Awwwards Level",
    description: "A luxurious, motion-rich portfolio experience.",
    siteName: "Himanchal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio 2.0 | Awwwards Level",
    description: "A luxurious, motion-rich portfolio experience.",
    creator: "@himanchal",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${spaceMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        <Preloader />

        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
