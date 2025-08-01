import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ParticleBackground from '@/components/particle-background';
import DateTime from '@/components/date-time';

export const metadata: Metadata = {
  title: 'Dsh Mahi',
  description: 'Creative Developer & Designer Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
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
