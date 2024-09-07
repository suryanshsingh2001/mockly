import "./globals.css";
import { Metadata } from "next";

import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/config";
import { Inter as FontSans } from "next/font/google";



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});






export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // openGraph: {
  //   images: siteConfig.ogImage,
  //   title: `${siteConfig.name}`,
  //   description: siteConfig.description,
  //   url: siteConfig.url,
  //   siteName: `${siteConfig.name}`,
  //   locale: "en_US",
  //   type: "website",
  // },
  
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
  twitter: {
    title: `${siteConfig.name}`,
    card: "summary_large_image",
    //images: siteConfig.ogImage,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased px-6",
           fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            {/* <TailwindIndicator /> */}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
