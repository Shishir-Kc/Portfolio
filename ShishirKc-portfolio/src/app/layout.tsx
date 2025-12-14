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
  title: {
    default: "Shishir Khatri | Backend Developer",
    template: "%s | Shishir Khatri",
  },
  description: "Portfolio of Shishir Khatri,  Backend Engineer in Nepal building digital reality with modern technologies.",
  keywords: [
    "backend engineer in Nepal",
    "Nepal backend development",
    "Backend Developer",
    "Shishir Kc",
    "Software Engineer Nepal",
    "Web Developer Kathmandu",
    "python Developer",
    "fastapi Developer",
    "django Developer",
    "founder",
    "mrkc",
    "Shishir khatri",
    "shishir khatri",
    "shishirkhatri",
    "shishirkhatri.com.np",
    
  ],
  authors: [{ name: "Shishir Kc", url: "https://shishirkhatri.com.np" }],
  creator: "Shishir Kc",
  publisher: "Shishir Kc",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Shishir Kc | Full Stack Developer",
    description: "Building digital reality with modern technologies. Expert Backend Engineer in Nepal.",
    url: "https://shishirkhatri.com.np",
    siteName: "Shishir Kc Portfolio",
    images: [
      {
        url: "https://shishirkhatri.com.np/image/mrkc.jpeg",
        width: 1200,
        height: 630,
        alt: "Shishir Kc Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shishir khatri | Backend Developer",
    description: "Building digital reality with modern technologies. Expert Backend Engineer in Nepal.",
    images: ["https://shishirkhatri.com.np/image/mrkc.jpeg"],
 
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shishir Kc",
  url: "https://shishirkhatri.com.np",
  jobTitle: "Backend Engineer & Full Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  sameAs: [
    "https://github.com/Shishir-Kc", 
    "https://www.linkedin.com/in/shishir-khatri-3bb3b1376/",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
