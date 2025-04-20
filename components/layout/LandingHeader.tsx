"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { BackgroundGradient } from "@/components/layout/background-gradient";
import Image from "next/image";
import { siteConfig } from "@/config/config";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 left-0 right-0">
        <div className="relative h-16 overflow-hidden backdrop-blur-md border-b border-primary/10">
          {/* Subtle background gradient specifically for header */}
          <BackgroundGradient
            primaryColor="primary"
            secondaryColor="violet-500"
            accentColor="fuchsia-500"
            gridOpacity="0.02"
            className="opacity-70"
          />

          {/* Additional glass effect for the header */}
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm z-0"></div>

          <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between relative z-10">
            <motion.div
              className="flex items-center gap-2 font-bold text-xl"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/icon-512.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                />
                Mockly
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link
                  href="#features"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link
                  href="#pricing"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Link
                  href="#faq"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link
                  href="/blogs"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <ThemeToggle />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Link href="/editor">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden flex items-center justify-center"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

        {/* Decorative accent line with gradient */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </header>

      {/* Mobile Side Menu */}
      <MobileSideMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />
    </>
  );
}

function MobileSideMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full w-3/4 max-w-sm overflow-hidden"
          >
            {/* Gradient background for mobile menu */}
            <div className="absolute inset-0 bg-background/95">
              <BackgroundGradient
                primaryColor="primary"
                secondaryColor="violet-500"
                accentColor="fuchsia-500"
                gridOpacity="0.02"
              />
            </div>

            <div className="relative z-10 h-full p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 font-bold text-xl">
                  <Image
                    src="/icon-512.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                  Mockly
                </div>
                <button
                  className="flex items-center justify-center"
                  onClick={onClose}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                <Link
                  href="#features"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  Pricing
                </Link>
                <Link
                  href="#faq"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  FAQ
                </Link>
                <Link
                  href="/blogs"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  Blog
                </Link>
                <div className="flex items-center justify-between mt-4 mb-2">
                  <span className="text-sm font-medium">Toggle theme</span>
                  <ThemeToggle />
                </div>
                <Link href="/editor">
                  <Button className="w-full mt-4" onClick={onClose}>
                    Get Started
                  </Button>
                </Link>
               
              </nav>

              {/* Decorative elements */}
              <div className="absolute bottom-8 left-6 h-24 w-24 rounded-full border border-primary/10 bg-primary/5 blur-xl"></div>
              <div className="absolute top-1/3 right-6 h-16 w-16 rounded-full border border-violet-500/10 bg-violet-500/5 blur-lg"></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
