import Link from "next/link";
import { ArrowRight, Github, Star, GitFork, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl sm:text-2xl text-primary-foreground/90 max-w-[800px] mx-auto">
              Take control of your projects with powerful tools and a flexible,
              open-source platform. We are proudly open source!
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 text-lg">
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400 h-6 w-6" />
              <span>15.2k Stars</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitFork className="h-6 w-6" />
              <span>2.8k Forks</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-6 w-6" />
              <span>342 Watchers</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/editor">
              <Button
                size="lg"
                className="text-lg group transition-all duration-300 transform hover:scale-105 w-full sm:w-auto bg-secondary hover:bg-secondary-dark text-secondary-foreground"
              >
                Try Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/github" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="text-lg w-full sm:w-auto border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                <Github className="mr-2 h-5 w-5" />
                Contribute on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
