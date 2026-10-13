import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thiha Linn — Mobile & Fullstack Developer",
  description:
    "Mobile and Fullstack Developer with 2+ years of experience building enterprise web applications, insurance mini apps, and business solutions.",
  icons: {
    icon: "/THL.png",
  },
};

/**
 * Runs before first paint:
 * - marks the document as JS-enabled so scroll-reveal content can start hidden
 *   (if JS never runs, content stays visible instead of being stuck at opacity 0)
 * - applies the stored theme without a flash (default is DARK)
 */
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('theme')!=='light'){d.classList.add('dark')}}catch(e){d.classList.add('dark')}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
