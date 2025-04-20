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

export default function Home() {
  const ref = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Sparkles className="mr-1 h-3 w-3" />
                Open Source
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Link
                href="https://peerlist.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11.9999 4.8C10.0955 4.8 8.26651 5.53714 6.93313 6.87052C5.59976 8.2039 4.86261 10.0329 4.86261 11.9373C4.86261 13.8417 5.59976 15.6707 6.93313 17.0041C8.26651 18.3375 10.0955 19.0746 11.9999 19.0746C13.9043 19.0746 15.7333 18.3375 17.0667 17.0041C18.4001 15.6707 19.1372 13.8417 19.1372 11.9373C19.1372 10.0329 18.4001 8.2039 17.0667 6.87052C15.7333 5.53714 13.9043 4.8 11.9999 4.8ZM11.9999 17.2364C10.5521 17.2364 9.16354 16.6618 8.14097 15.6392C7.11839 14.6166 6.54375 13.2281 6.54375 11.7803C6.54375 10.3325 7.11839 8.94398 8.14097 7.9214C9.16354 6.89883 10.5521 6.32419 11.9999 6.32419C13.4477 6.32419 14.8362 6.89883 15.8588 7.9214C16.8814 8.94398 17.456 10.3325 17.456 11.7803C17.456 13.2281 16.8814 14.6166 15.8588 15.6392C14.8362 16.6618 13.4477 17.2364 11.9999 17.2364Z"
                    fill="white"
                  />
                  <path
                    d="M14.4001 9.6001H13.2001V14.4001H14.4001V9.6001Z"
                    fill="white"
                  />
                  <path
                    d="M10.8001 9.6001H9.6001V14.4001H10.8001V9.6001Z"
                    fill="white"
                  />
                </svg>
                <span>Launched on Peerlist</span>
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
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
              >
                <Github className="mr-2 h-4 w-4" />
                Star on GitHub
              </Button>
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
                <Button size="lg" className="h-12 px-8 text-base">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base"
                >
                  Schedule a Demo
                </Button>
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
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <Sparkles className="h-5 w-5 text-primary" />
                Mockly
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Beautiful mockups without the stress. An open-source tool for
                developers.
              </p>
              <div className="mt-6 flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
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
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2"  />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
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
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
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
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Mockly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
