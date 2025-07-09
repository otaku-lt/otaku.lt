import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Otaku.lt - Lithuania\'s Otaku Community Hub',
  description: 'Your central hub for anime, cosplay, J-pop, karaoke, and otaku culture in Lithuania. Join events, connect with communities, and celebrate Japanese pop culture.',
  keywords: 'anime, otaku, lithuania, cosplay, j-pop, karaoke, events, community, japanese culture, vilnius, kaunas',
  authors: [{ name: 'Otaku.lt Team' }],
  openGraph: {
    title: 'Otaku.lt - Lithuania\'s Otaku Community Hub',
    description: 'Your central hub for anime, cosplay, J-pop, karaoke, and otaku culture in Lithuania.',
    url: 'https://otaku.lt',
    siteName: 'Otaku.lt',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/otaku_lt.png',
        width: 800,
        height: 600,
        alt: 'Otaku.lt Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Otaku.lt - Lithuania\'s Otaku Community Hub',
    description: 'Your central hub for anime, cosplay, J-pop, karaoke, and otaku culture in Lithuania.',
    images: ['/otaku_lt.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: '/otaku_lt.png',
    shortcut: '/otaku_lt.png',
    apple: '/otaku_lt.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex flex-col min-h-screen bg-background text-foreground`}>
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}