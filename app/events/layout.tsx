import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events | Otaku.lt',
  description: 'Discover anime, cosplay, and Japanese culture events across Lithuania.',
  metadataBase: new URL('https://otaku.lt'),
  openGraph: {
    title: 'Events | Otaku.lt',
    description: 'Discover anime, cosplay, and Japanese culture events across Lithuania.',
    url: 'https://otaku.lt/events',
    siteName: 'Otaku.lt',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events | Otaku.lt',
    description: 'Discover anime, cosplay, and Japanese culture events across Lithuania.',
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
