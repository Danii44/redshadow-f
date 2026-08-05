import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import NavigationResponsive from '@/components/NavigationResponsive';
import Footer from '@/components/Footer';
import SessionLoader from '@/components/SessionLoader';

export const metadata: Metadata = {
  title: 'Red Shadow Design',
  description: 'Futuristic engineering showroom experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <SessionLoader />
            <Toaster />
            <NavigationResponsive />
            {children}
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
