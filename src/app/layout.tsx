import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import DateTime from '@/components/date-time';
import ParticleBackground from '@/components/particle-background';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dshmahi.dev'),
  title: {
    default: 'Dsh Mahi',
    template: '%s | Dsh Mahi',
  },
  description: 'Creative Developer & Designer Portfolio',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Dsh Mahi',
    description: 'Creative Developer & Designer Portfolio',
    siteName: 'Dsh Mahi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dsh Mahi',
    description: 'Creative Developer & Designer Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-body antialiased`}>
        <ParticleBackground />
        <div className="relative z-10">
          {children}
        </div>
        <DateTime />
        <Toaster />
      </body>
    </html>
  );
}
