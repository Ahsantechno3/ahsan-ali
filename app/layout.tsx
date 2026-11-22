import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const description =
  "MERN Stack Developer building fast, modern websites and full-stack web apps with React, Next.js, Node.js, Express and MongoDB — helping businesses grow online.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ahsan-ali-protfolio.vercel.app"),
  title: "Ahsan Ali — MERN Stack Developer",
  description,
  keywords: [
    "MERN Stack Developer",
    "Ahsan Ali",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "MongoDB",
    "Full-Stack Web Developer",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ahsan Ali — MERN Stack Developer",
    description,
    url: "https://ahsan-ali-protfolio.vercel.app/",
    siteName: "Ahsan Ali — Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ahsan Ali — MERN Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahsan Ali — MERN Stack Developer",
    description,
    images: ["/og-image.jpg"],
  },
};

// Runs before paint so the saved theme (dark by default) never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`;

// Structured data — sirf asal facts (koi invented rating/review nahi)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahsan Ali",
  jobTitle: "MERN Stack Developer",
  url: "https://ahsan-ali-protfolio.vercel.app/",
  sameAs: [
    "https://www.linkedin.com/in/ahsan-ali-468453440",
    "https://github.com/Ahsantechno3",
  ],
  knowsAbout: ["React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
