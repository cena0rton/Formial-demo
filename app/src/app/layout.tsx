import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Zilla_Slab_Highlight, Instrument_Serif, Lexend_Exa } from "next/font/google";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const zillaSlabHighlight = Zilla_Slab_Highlight({
  variable: "--font-zilla-slab-highlight",
  subsets: ["latin"],
  weight: "400",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const lexendExa = Lexend_Exa({
  variable: "--font-lexend-exa",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zillaSlabHighlight.variable} ${instrumentSerif.variable} ${lexendExa.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
