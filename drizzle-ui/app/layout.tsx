import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DarkModeScript } from "@/src/components/ui/dark-mode";
import { GoogleAnalytics } from "@next/third-parties/google";
import "highlight.js/styles/atom-one-dark.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drizzle UI",
  description: "The minimalist component library used in Drizzle Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-FR34HJSEG9" />
      <DarkModeScript />
    </html>
  );
}
