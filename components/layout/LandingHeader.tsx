"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Smartphone,
  Tablet,
  Monitor,
  Image as ImageIcon,
  Sliders,
  Download,
  Check,
  Menu,
  X,
  Github,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";
import { siteConfig } from "@/config/config";


export default function LandingHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
            <ImageIcon className="h-8 w-8 mr-2 text-primary" />
            <span className="font-bold text-xl">Mockly</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Button size="sm" asChild>
              <Link href="/editor" className="">
                Try Now
              </Link>
            </Button>

            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="/blogs"
            >
              Blogs
            </Link>
            <Link
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-4 flex justify-between items-center border-b border-border">
          <span className="font-bold text-xl">Mockly</span>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="p-4 flex flex-col gap-4">
          <Button size="sm">Try Now</Button>

          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="/blogs"
            onClick={toggleSidebar}
          >
            Blog
          </Link>
          <Link
            href="https://github.com/yourusername/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm font-medium">GitHub</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">Toggle Theme</span>
          </Button>
        </nav>
      </div>
    </>
  );
}
