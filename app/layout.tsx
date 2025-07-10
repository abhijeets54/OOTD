import './globals.css';
import type { Metadata } from 'next';
// import { Inter } from 'next/font/google'; // Temporarily disabled to fix build issues
import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from './providers';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';

// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   preload: true,
//   adjustFontFallback: true,
// }); // Temporarily disabled to fix build issues

export const metadata: Metadata = {
  title: '#OOTD - AI-Powered Fashion Stylist',
  description: 'Transform your style with AI-powered outfit recommendations, style analysis, and personalized fashion insights. Your personal fashion stylist powered by artificial intelligence.',
  keywords: 'AI fashion, outfit analyzer, style recommendations, fashion AI, personal stylist, outfit generator',
  authors: [{ name: 'OOTD Team' }],
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
      {
        url: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: '#OOTD - AI Fashion Stylist',
    description: 'Transform your style with AI-powered outfit recommendations and style analysis.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className="antialiased relative font-sans">
          {/* Animated gradient background */}
          <div className="container-bg fixed inset-0 z-0"></div>

          {/* Content overlay */}
          <div className="relative z-10">
            <Providers>
              <Navigation />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </Providers>
          </div>
          <Analytics mode="production" />
        </body>
      </html>
    </ClerkProvider>
  );
}