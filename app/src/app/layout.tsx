import type { Metadata } from "next";
import { Geist, Geist_Mono, Zilla_Slab_Highlight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Formial Dashboard",
  description: "Formial Dashboard",
};

const zillaSlabHighlight = Zilla_Slab_Highlight({
  variable: "--font-zilla-slab-highlight",
  subsets: ["latin"],
  weight: "400",
});

// Note: Add Instrument Serif font file to ./fonts/ folder when available
// For now, using a fallback to Playfair Display (similar serif font from Google Fonts)
const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-instrument-serif",
  fallback: ["serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zillaSlabHighlight.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
