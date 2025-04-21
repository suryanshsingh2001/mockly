"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  Github,
  Laptop,
  Menu,
  MousePointer,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Header } from "./LandingHeader";
import { FeaturesSection } from "../sections/FeatureSection";
import { PricingSection } from "../sections/PricingSection";
import FAQSection from "../sections/FAQSection";
import { siteConfig } from "@/config/config";
import { BackgroundGradient } from "./background-gradient";

export default function Home() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section
        ref={ref}
        id="hero"
        className="relative overflow-hidden pb-32 pt-24 md:pb-40 md:pt-32"
      >
        <motion.div
          style={{ y, opacity }}
          className="container relative z-10 mx-auto  text-center "
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <motion.span 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.3, 
                duration: 0.4,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary relative overflow-hidden"
              >
              <motion.div 
                className="absolute inset-0 bg-primary/5"
                animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0, 0.3, 0]
                }}
                transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
                }}
              />
              <motion.span 
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3
                }}
              >
                <Sparkles className="mr-1 h-3 w-3" />
              </motion.span>
              Open Source
              </motion.span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Link
                href={siteConfig.peerlistLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-50/10 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-green-50/30 hover:scale-105 dark:border-green-500/20 dark:bg-green-950/10 dark:hover:bg-green-900/20 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 rounded-full border border-green-500/40"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border border-green-500/30"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <Image
                  src="/peerlist.png"
                  alt="Peerlist Logo"
                  width={16}
                  height={16}
                  className="h-4 w-4 relative z-10"
                  priority
                />
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="relative z-10"
                >
                  Launched on Peerlist
                </motion.span>
              </Link>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-5xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Beautiful mockups <br className="hidden sm:inline" />
              <span className="text-primary">without the stress</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-lg text-muted-foreground md:text-xl"
            >
              Create professional-looking screenshots and mockups with ease.
              Designed for developers who&apos;d rather code than design.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/editor">
                <Button size="lg" className="h-12 px-8 text-base">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="relative mx-auto mt-16 max-w-6xl px-6 sm:mt-20 md:mt-24"
        >
          <div className="relative overflow-hidden rounded-xl border border-muted/30 transform transition-transform hover:scale-[1.02] duration-700">
            <div className="absolute top-0 w-full h-8 bg-muted/30 flex items-center px-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <Image
              src="/mockly-demo.png"
              width={1200}
              height={600}
              alt="Mockly Dashboard"
              className="rounded-b-lg pt-8 shadow-lg"
              priority
            />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -top-3 -left-3 w-24 h-24 bg-violet-500/10 rounded-full blur-xl"></div>
          </div>

          {/* Floating elements for depth */}
        </motion.div>

        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/30 via-purple-500/10 to-primary/5 blur-3xl"></div>
          <div className="absolute right-0 top-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-primary/20 via-violet-500/10 to-primary/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-primary/10 via-fuchsia-500/10 to-primary/5 blur-3xl"></div>

          {/* Decorative shapes */}
          <div className="absolute top-1/4 right-1/4 h-24 w-24 rounded-full border border-primary/20 bg-primary/5"></div>
          <div className="absolute bottom-1/3 left-1/5 h-16 w-16 rounded-full border border-primary/20 bg-primary/5"></div>
          <div className="absolute top-1/3 left-1/4 h-32 w-32 rounded-full border border-primary/10 bg-primary/5 opacity-30"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(120,119,198,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <FeaturesSection />
      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-24 container mx-auto ">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-fuchsia-500/10 p-8 md:p-12 lg:p-16 overflow-hidden"
          >
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready to create stunning mockups?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of developers who are saving time and creating
                beautiful mockups with Mockly.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/editor">
                  <Button size="lg" className="h-12 px-8 text-base">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 text-base"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Star on GitHub
                  </Button>
                </Link>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute right-0 top-0 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-tl from-primary/20 via-violet-500/10 to-primary/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 -z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-tr from-primary/10 via-fuchsia-500/10 to-primary/5 blur-2xl"></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(120,119,198,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(120,119,198,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 relative overflow-hidden">
        <BackgroundGradient className="opacity-30" gridOpacity="0.01" />
        
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl">
            <Image 
              src="/icon-512.png"
              alt="Mockly Logo"
              width={40}
              height={40}
              className="h-8 w-8"
            />
         
            Mockly
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Beautiful mockups without the stress. An open-source tool for
            developers.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
          href={siteConfig.socialLinks.github}
          className="text-muted-foreground hover:text-foreground"
          aria-label="GitHub"
            >
          <Github className="h-5 w-5" />
            </Link>
            <Link
          href={siteConfig.peerlistLink}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Peerlist"
            >
          <Image
            src="/peerlist.png"
            alt="Peerlist Logo"
            width={20}
            height={20}
            className="h-5 w-5"
          />
            </Link>
            <Link
          href={siteConfig.socialLinks.twitter || "#"}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Twitter"
            >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium">Resources</h3>
          <ul className="mt-4 space-y-2">
            <li>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Blog
          </Link>
            </li>
            <li>
          <Link
            href="/docs"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Documentation
          </Link>
            </li>
            <li>
          <Link
            href="/support"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Support
          </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium">Legal</h3>
          <ul className="mt-4 space-y-2">
            <li>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </Link>
            </li>
            <li>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms of Service
          </Link>
            </li>
          </ul>
        </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Mockly. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
          Made with <span className="text-red-500">❤</span> by{" "}
          <Link
            href="https://linkedin.com/in/suryanshsingh2001"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors font-medium flex items-center gap-1"
          >
            {siteConfig.author}
            <Image 
          src={siteConfig.authorImage} 
          alt={siteConfig.author} 
          width={16} 
          height={16} 
          className="rounded-full" 
            />
          </Link>
        </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
