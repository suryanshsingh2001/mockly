import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-4 py-8 text-center">
        <div className="mb-8">
          <Search className="mx-auto h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t  exist or has been moved.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" className="w-full">

            <Link href="" target="_blank" rel="noopener noreferrer">
              Report an Issue
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}