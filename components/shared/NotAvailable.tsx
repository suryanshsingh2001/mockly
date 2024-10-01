import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function NotAvailable() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full px-4 py-8 text-center">
        <div className="mb-8">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Editor Unavailable</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Whoops 🙈! The editor is currently unavailable. Please try again later.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
         
        </div>
      </div>
    </div>
  )
}