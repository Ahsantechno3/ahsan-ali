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
  "MERN Stack Developer building fast, modern websites and full-stack web applications that help businesses attract more customers and grow their brand — with React, Next.js, Node.js, Express and MongoDB.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ahsan-ali-protfolio.vercel.app"),
  title: "Ahsan Ali — MERN Stack Developer",
  description,
  openGraph: {
    title: "Ahsan Ali — MERN Stack Developer",
    description,
    type: "website",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },
};

// Runs before paint so the saved theme (dark by default) never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
