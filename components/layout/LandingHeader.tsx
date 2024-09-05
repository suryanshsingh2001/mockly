"use client"
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
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
  } from "lucide-react";


const LandingHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
            <ImageIcon className="h-8 w-8 mr-2 text-primary" />
            <span className="font-bold text-xl">ScreenCraft</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#testimonials"
            >
              Testimonials
            </Link>
            <Link
              href="https://github.com/yourusername/your-repo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
            </Link>
            <Button size="sm">Try Now</Button>
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
          <span className="font-bold text-xl">Menu</span>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="p-4 flex flex-col gap-4">
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#features"
            onClick={toggleSidebar}
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#pricing"
            onClick={toggleSidebar}
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#testimonials"
            onClick={toggleSidebar}
          >
            Testimonials
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
          <Button size="sm">Try Now</Button>
        </nav>
      </div>
    </>
  );
};

export default LandingHeader;
