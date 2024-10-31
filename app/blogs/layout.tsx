import LandingHeader from "@/components/layout/LandingHeader";



interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
            <LandingHeader />
            {children}
    </>
  );
}
