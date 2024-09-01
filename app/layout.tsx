import "./globals.css";
import { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
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
  
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SiteHeader />
              {children}
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
