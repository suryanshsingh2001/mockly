import { BackgroundGradient } from "@/components/layout/background-gradient";
import { Header } from "@/components/layout/LandingHeader";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Apply explicitly defined background gradient instead of using dynamic props */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-600/30 via-blue-500/10 to-indigo-600/5 blur-3xl"></div>
        <div className="absolute right-0 top-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-indigo-600/20 via-violet-500/10 to-indigo-600/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-indigo-600/10 via-fuchsia-500/10 to-indigo-600/5 blur-3xl"></div>

        {/* Decorative shapes */}
        <div className="absolute top-1/4 right-1/4 h-24 w-24 rounded-full border border-indigo-600/20 bg-indigo-600/5"></div>
        <div className="absolute bottom-1/3 left-1/5 h-16 w-16 rounded-full border border-indigo-600/20 bg-indigo-600/5"></div>
        <div className="absolute top-1/3 left-1/4 h-32 w-32 rounded-full border border-indigo-600/10 bg-indigo-600/5 opacity-30"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(120,119,198,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Header component */}
      <Header />

      {/* Main content with proper z-index to appear above gradient */}
      <main className="flex-1 relative z-10">{children}</main>
    </div>
  );
}
