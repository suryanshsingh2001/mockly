import React from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Github } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
                <a href="#" className="text-lg font-semibold">Home</a>
                <a href="https://github.com/yourusername/mockup-editor" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <Github className="h-5 w-5" />
                  <span>GitHub Repo</span>
                </a>
                <a href="#" className="text-lg font-semibold">Pricing</a>
              </nav>
            </SheetContent>
          </Sheet>
          <span className="text-2xl font-bold">Mockup Editor</span>
        </div>
        <nav className="hidden lg:flex items-center space-x-6">
          <a href="#" className="text-lg font-semibold">Home</a>
          <a href="https://github.com/yourusername/mockup-editor" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <Github className="h-5 w-5" />
            <span>GitHub Repo</span>
          </a>
          <a href="#" className="text-lg font-semibold">Pricing</a>
        </nav>
      </div>
    </header>
  )
}