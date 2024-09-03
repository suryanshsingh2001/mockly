import React from 'react'
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun } from 'lucide-react'
import { Icons } from "@/components/icons"
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'


export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4">
                <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <Icons.gitHub className="h-5 w-5" />
                  <span>GitHub</span>
                </Link>
                <Link href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <Icons.twitter className="h-5 w-5 fill-current" />
                  <span>Twitter</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-2xl font-bold">Mockly</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
