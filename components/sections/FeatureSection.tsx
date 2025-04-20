"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Laptop, LucideIcon, MousePointer } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  ImagePlus,
  Monitor,
  ZoomIn,
  Type,
  Palette,
  Layers,
  Share,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import { BackgroundGradient } from "../layout/background-gradient";
type FeatureProps = {
  icon: React.ReactNode | LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function FeaturesSection() {
  const title = "Features that make your work easier";
  const subtitle =
    "Everything you need to create beautiful mockups in seconds, without the complexity.";

  const features = [
    {
      icon: <ImagePlus className="h-10 w-10 mb-4 text-primary" />,
      title: "Instant Mockups",
      description:
        "Upload, tweak, done. It's like magic, but without the wand.",
    },
    {
      icon: <Monitor className="h-10 w-10 mb-4 text-primary" />,
      title: "Multi-device Preview",
      description:
        "Instantly see how your designs look on any screen size—because nobody has time for resizing.",
    },
    {
      icon: <ZoomIn className="h-10 w-10 mb-4 text-primary" />,
      title: "Zoom & Place",
      description:
        "Put your screenshots exactly where you want, and zoom in like a pro—minus the struggle.",
    },
    {
      icon: <Type className="h-10 w-10 mb-4 text-primary" />,
      title: "Text & Style",
      description:
        "Add text, pick your font, and make it pop. Because plain screenshots are so last year.",
    },
    {
      icon: <Palette className="h-10 w-10 mb-4 text-primary" />,
      title: "Custom Colors",
      description:
        "Choose from a wide palette or create your own. Your mockups, your style.",
    },
    {
      icon: <Layers className="h-10 w-10 mb-4 text-primary" />,
      title: "No Watermarks",
      description:
        "No ugly watermarks, no strings attached. Just beautiful mockups, ready to use.",
    },
    {
      icon: <Share className="h-10 w-10 mb-4 text-primary" />,
      title: "Easy Export",
      description:
        "Share your creations with a single click. Available in all the formats you need.",
    },
    {
      icon: <Sparkles className="h-10 w-10 mb-4 text-primary" />,
      title: "Auto Color Detection",
      description:
        "Mockly automatically detects the dominant colors in your screenshots and applies them to your mockups. No more manual adjustments—just upload and let Mockly do the rest.",
    },
    {
      icon: <Sparkles className="h-10 w-10 mb-4 text-primary" />,
      title: "Video Editor (Coming Soon)",
      description:
        "Turn your screenshots into stunning videos. Because sometimes, a picture is not enough.",
    },
    {
      icon: <MoreHorizontal className="h-10 w-10 mb-4 text-primary" />,
      title: "And More",
      description:
        "We're always adding new features to make your experience even better. Stay tuned!",
    },
  ];
  return (
    <section id="features" className="relative py-24">
      <BackgroundGradient className="z-0" />
      <div className="container mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Designed for developers,{" "}
            <span className="text-primary">built for speed</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Mockly gives you all the tools you need to create stunning mockups
            without the learning curve.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Large feature card - Instant Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 row-span-2 relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/10 blur-xl"></div>
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg  text-primary mb-6">
                {features[0].icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{features[0].title}</h3>
              <p className="text-muted-foreground mb-6">
                {features[0].description} Choose from dozens of device frames to
                showcase your work in the perfect context.
              </p>
              <Image
                src="/feature-demo.png"
                width={600}
                height={300}
                alt={features[0].title}
                className="rounded-lg shadow-md w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Medium feature card - Multi-device Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-500/5 to-violet-500/10 p-6"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-violet-500/10 blur-xl"></div>
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg  text-violet-500 mb-4">
                {features[1].icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{features[1].title}</h3>
              <p className="text-muted-foreground">{features[1].description}</p>
            </div>
          </motion.div>

          {/* Small feature card - Zoom & Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-500/5 to-fuchsia-500/10 p-6"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-fuchsia-500/10 blur-xl"></div>
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg  text-fuchsia-500 mb-4">
                {features[2].icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{features[2].title}</h3>
              <p className="text-muted-foreground">{features[2].description}</p>
            </div>
          </motion.div>

          {/* Medium feature card - Text & Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 p-6"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-blue-500/10 blur-xl"></div>
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg text-blue-500 mb-4">
                {features[3].icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{features[3].title}</h3>
              <p className="text-muted-foreground">{features[3].description}</p>
            </div>
          </motion.div>

          {/* Medium feature card - Custom Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2 relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/5 to-indigo-500/10 p-6"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-indigo-500/10 blur-xl"></div>
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg  text-indigo-500 mb-4">
                {features[4].icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{features[4].title}</h3>
              <p className="text-muted-foreground">
                {features[4].description} Perfect for creating a consistent
                brand experience across your mockups.
              </p>
            </div>
          </motion.div>

          {/* Medium feature card - No Watermarks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 p-6"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-cyan-500/10 blur-xl"></div>
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg  text-cyan-500 mb-4">
                {features[5].icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{features[5].title}</h3>
              <p className="text-muted-foreground">{features[5].description}</p>
            </div>
          </motion.div>

          {/* Small feature card - Easy Export */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/5 to-amber-500/10 p-6"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-amber-500/10 blur-xl"></div>
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg  text-amber-500 mb-4">
                {features[6].icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{features[6].title}</h3>
              <p className="text-muted-foreground">{features[6].description}</p>
            </div>
          </motion.div>

          {/* Small feature card - Auto Color Detection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-500/5 to-rose-500/10 p-6"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-rose-500/10 blur-xl"></div>
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg  text-rose-500 mb-4">
                {features[7].icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{features[7].title}</h3>
              <p className="text-muted-foreground">{features[7].description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
