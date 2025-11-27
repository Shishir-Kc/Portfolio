import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Shishir Kc | Full Stack Developer",
  description: "Portfolio of Shishir Kc, a Full Stack Developer & Designer building digital reality with modern technologies.",
  openGraph: {
    title: "Shishir Kc | Full Stack Developer",
    description: "Building digital reality with modern technologies.",
    url: "https://shishirkc.com",
    siteName: "Shishir Kc Portfolio",
    images: [
      {
        url: "https://shishirkc.com/og-image.png", // Placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
