
import { cn } from "@/lib/utils";





interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en">
        <head />
        <body className={cn("min-h-screen bg-background flex flex-col items-center justify-center max-w-2xl mx-auto py-12 sm:py-24 px-6", )}>
          
            {children}
            {/* <TailwindIndicator /> */}
        </body>
      </html>
    </>
  );
}
