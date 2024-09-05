"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Smartphone, Tablet, Monitor, Image as ImageIcon, Sliders, Download, Check, Menu, X, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
            <ImageIcon className="h-8 w-8 mr-2 text-primary" />
            <span className="font-bold text-xl">ScreenCraft</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#testimonials">
              Testimonials
            </Link>
            <Link href="https://github.com/yourusername/your-repo" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
            </Link>
            <Button size="sm">Try Now</Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="p-4 flex justify-between items-center border-b border-border">
          <span className="font-bold text-xl">Menu</span>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="p-4 flex flex-col gap-4">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features" onClick={toggleSidebar}>
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing" onClick={toggleSidebar}>
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#testimonials" onClick={toggleSidebar}>
            Testimonials
          </Link>
          <Link href="https://github.com/yourusername/your-repo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <span className="text-sm font-medium">GitHub</span>
          </Link>
          <Button size="sm">Try Now</Button>
        </nav>
      </div>

      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none max-w-[600px]">
                    Create Stunning Screenshots in Seconds
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-lg sm:text-xl">
                    ScreenCraft is the all-in-one tool for creating beautiful mockups, presentations, and marketing materials.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="text-lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg">Watch Demo</Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4" />
                    No credit card required
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4" />
                    14-day free trial
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-video">
                  <Image
                    src="/placeholder.svg"
                    alt="ScreenCraft Editor Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Features</h2>
                <p className="max-w-[900px] text-muted-foreground text-lg sm:text-xl">
                  Everything you need to create professional-looking screenshots and mockups
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card className="bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <Monitor className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="text-xl">Multi-device Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Visualize your designs on various screen sizes instantly</p>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <ImageIcon className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="text-xl">Smart Background Removal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Automatically remove backgrounds with AI-powered tools</p>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <Sliders className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="text-xl">Advanced Editing Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Fine-tune your images with professional-grade adjustments</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground text-lg sm:text-xl">
                  Choose the plan that's right for you
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                { name: "Starter", price: "Free", features: ["Basic editing tools", "5 exports per month", "Community support"] },
                { name: "Pro", price: "$12/mo", features: ["Advanced editing tools", "Unlimited exports", "Priority support", "Custom branding"] },
                { name: "Enterprise", price: "Custom", features: ["Custom solutions", "Dedicated account manager", "API access", "SSO Integration"] },
              ].map((plan) => (
                <Card key={plan.name} className="flex flex-col bg-card text-card-foreground rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold">{plan.price}</CardDescription>
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

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground text-lg sm:text-xl">
                  Don't just take our word for it - hear from some of our satisfied customers
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                { name: "Alex Johnson", role: "UX Designer", quote: "ScreenCraft has revolutionized my workflow. I can create stunning mockups in minutes!" },
                { name: "Sarah Lee", role: "Marketing Manager", quote: "The time we save with ScreenCraft allows us to focus on what really matters - our customers." },
                { name: "Michael Chen", role: "Startup Founder", quote: "As a non-designer, ScreenCraft helps me create professional-looking visuals for my pitch decks." },
              ].map((testimonial) => (
                <Card key={testimonial.name} className="bg-card text-card-foreground rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-primary-foreground/80 text-lg sm:text-xl">
                  Join thousands of satisfied users and start creating amazing screenshots today
                </p>
              </div>
              <Button size="lg" variant="secondary" className="text-lg">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Tutorials</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Releases</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Press</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Newsletter</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Events</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="text-sm hover:text-primary transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2023 ScreenCraft. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}