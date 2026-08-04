import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '../client/src/contexts/ThemeContext';
import { TooltipProvider } from '../client/src/components/ui/tooltip';
import { Toaster } from '../client/src/components/ui/sonner';
import NavigationResponsive from '@/components/NavigationResponsive';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Red Shadow Designs',
  description: 'Futuristic engineering showroom experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
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
