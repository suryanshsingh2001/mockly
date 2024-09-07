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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingHeader />

      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_700px] xl:grid-cols-[1fr_800px] items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none max-w-[600px] animate-fade-in">
                    Create Stunning Screenshots in Seconds
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-lg sm:text-xl animate-fade-in-up">
                    Mockly lets you whip up beautiful mockups and presentations
                    in no time. No stress, just pick, place, zoom, done. Perfect
                    for developers who'd rather code than design.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row animate-fade-in-up">
                  <Link href="/editor">
                    <Button
                      size="lg"
                      className="text-lg group transition-all duration-300 transform hover:scale-105"
                    >
                      Try Now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    asChild
                    variant="outline"
                    className="text-lg transition-all duration-300 transform hover:scale-105 hover:bg-primary/10"
                  >
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground animate-fade-in-up">
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
              <div className="flex items-center justify-center lg:justify-end">
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Feature-Packed, Yet Lazy-Friendly
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg sm:text-xl">
                  Everything you need to create professional-looking screenshots
                  and mockups
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
              <Card className="bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <ImagePlus className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="text-xl">Instant Mockups</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Upload, tweak, done. It’s like magic, but without the wand.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <Monitor className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="text-xl">
                    Multi-device Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Instantly see how your designs look on any screen
                    size—because nobody has time for resizing.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <ZoomIn className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="text-xl">Zoom & Place</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Put your screenshots exactly where you want, and zoom in
                    like a pro—minus the struggle.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <Type className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="text-xl">Text & Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Add text, pick your font, and make it pop. Because plain
                    screenshots are so last year.
                  </p>
                </CardContent>
              </Card>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg sm:text-xl">
                  Pick a plan that works for you—no surprises, no hidden fees,
                  just straight-up value.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {siteConfig.pricing.map((plan) => (
                <Card
                  key={plan.name}
                  className="flex flex-col bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold">
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
                    <Button className="w-full">Choose Plan</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg sm:text-xl">
                  Don't just take our word for it - hear from some of our
                  satisfied customers
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  name: "Alex Johnson",
                  role: "UX Designer",
                  quote:
                    "ScreenCraft has revolutionized my workflow. I can create stunning mockups in minutes!",
                },
                {
                  name: "Sarah Lee",
                  role: "Marketing Manager",
                  quote:
                    "The time we save with ScreenCraft allows us to focus on what really matters - our customers.",
                },
                {
                  name: "Michael Chen",
                  role: "Startup Founder",
                  quote:
                    "As a non-designer, ScreenCraft helps me create professional-looking visuals for my pitch decks.",
                },
              ].map((testimonial) => (
                <Card
                  key={testimonial.name}
                  className="bg-card text-card-foreground rounded-xl"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="max-w-[600px] text-primary-foreground/80 text-lg sm:text-xl">
                  Take control of your projects with powerful tools and a
                  flexible, open-source platform. We are proudly open source!
                </p>
              </div>
              <div className="flex space-x-4">
                <Link href="/editor">
                  <Button
                    size="lg"
                    variant={"secondary"}
                    className="text-lg group transition-all duration-300 transform hover:scale-105"
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
                  <Button size="lg" variant="ghost" className="text-lg">
                    <Github className="mr-2 h-5 w-5" />
                    Contribute
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 ScreenCraft. All rights reserved.
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by
              Suryansh
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
