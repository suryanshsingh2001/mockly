import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  ZoomIn,
  Type,
  ImagePlus,
  Heart,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import LandingHeader from "./LandingHeader";
import { siteConfig } from "@/config/config";
import { useTheme } from "next-themes";
import ShowcaseImage from "../shared/ShowcaseImage";
import { Badge } from "../ui/badge";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingHeader />

      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr] items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-[600px] animate-fade-in">
                    Create Stunning Screenshots in Seconds
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-base sm:text-lg md:text-xl animate-fade-in-up">
                  With Mockly, just pick, place, zoom—done. Fast, stress-free mockups for developers who'd rather code than design.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up">
                  <Link href="/editor">
                    <Button
                      size="lg"
                      className="text-base sm:text-lg group transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                    >
                      Try Now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    asChild
                    variant="outline"
                    className="text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:bg-primary/10 w-full sm:w-auto"
                  >
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground animate-fade-in-up">
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4 text-primary" />
                    No Login Required
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4 text-primary" />
                    No Watermarks
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4 text-primary" />
                    Free to Use
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
                <div className="relative w-full max-w-[800px] aspect-[16/9] group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl transform transition-transform duration-300 group-hover:scale-105"></div>
                  <ShowcaseImage />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Feature-Packed, Yet Lazy-Friendly
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl">
                  Everything you need to create professional-looking screenshots
                  and mockups
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
              {[
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
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl">
                  Pick a plan that works for you—no surprises, no hidden fees,
                  just straight-up value.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {siteConfig.pricing.map((plan) => (
                <Card
                  key={plan.name}
                  className={`flex flex-col bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    plan.isRecommended ? "border-primary shadow-lg" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl sm:text-2xl">
                        {plan.name}
                      </CardTitle>
                      {plan.isRecommended && (
                        <Badge
                          variant="secondary"
                          className="text-xs font-semibold"
                        >
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-2xl sm:text-3xl font-bold">
                      {plan.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <Check className="h-5 w-5 mr-2 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.isRecommended ? "default" : "outline"}
                    >
                      Choose Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Ready to Get Started?
                </h2>
                <p className="max-w-[600px] text-primary-foreground/80 text-base sm:text-lg md:text-xl">
                  Take control of your projects with powerful tools and a
                  flexible, open-source platform. We are proudly open source!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/editor">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-base sm:text-lg group transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  >
                    Try Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-base sm:text-lg w-full sm:w-auto"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    Contribute
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center text-sm font-medium text-muted-foreground">
            Made with <Heart className="inline-block h-4 w-4 mx-1 text-primary" /> by{" "}
            <Link
              href="https://www.linkedin.com/in/suryanshsingh2001/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-foreground hover:text-primary transition-colors"
            >
              Suryansh
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          
          </nav>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mockly. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
