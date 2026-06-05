import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget';
import CartDrawer from '@/components/cart/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://himtatwa.com'),
  title: {
    default: 'Himtatwa — Pure Himalayan Shilajit | Premium Liquid Drops',
    template: '%s | Himtatwa',
  },
  description:
    'Experience the purest Himalayan Shilajit in convenient liquid dropper form. Lab-tested, FSSAI certified, zero additives. Boost energy, enhance brain function, and slow aging naturally.',
  keywords: [
    'shilajit', 'himalayan shilajit', 'liquid shilajit', 'pure shilajit',
    'him tatwa', 'himtatwa', 'shilajit drops', 'ayurvedic supplement', 'natural energy booster',
    'testosterone booster', 'fulvic acid', 'anti aging supplement',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Himtatwa',
    title: 'Himtatwa — Pure Himalayan Shilajit',
    description: 'Premium liquid Shilajit drops sourced from 16,000+ feet in the Himalayas.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Himtatwa Shilajit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himtatwa — Pure Himalayan Shilajit',
    description: 'Premium liquid Shilajit drops sourced from 16,000+ feet in the Himalayas.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://himtatwa.com" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Hathras, Uttar Pradesh, India" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Himtatwa',
              url: 'https://himtatwa.com',
              logo: 'https://himtatwa.com/images/logo_himtatwa.jpg',
              description: 'Premium Himalayan Shilajit in liquid dropper form. Lab-tested, FSSAI certified, zero additives.',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-9045577509',
                contactType: 'customer service',
                availableLanguage: ['Hindi', 'English'],
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Hathras',
                addressRegion: 'Uttar Pradesh',
                addressCountry: 'IN',
              },
              sameAs: [
                'https://www.instagram.com/himtatwa',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Himtatwa',
              url: 'https://himtatwa.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://himtatwa.com/products?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: 'Himtatwa Liquid Shilajit — 30ml',
                image: 'https://himtatwa.com/images/product.jpg',
                description: 'Pure Himalayan Shilajit in liquid dropper form. Sourced from 16,000+ feet. Lab-tested, FSSAI certified, zero additives.',
                brand: { '@type': 'Brand', name: 'Himtatwa' },
                sku: 'HT-30ML',
                offers: {
                  '@type': 'Offer',
                  url: 'https://himtatwa.com/products/himtatwa-liquid-shilajit-30ml',
                  priceCurrency: 'INR',
                  price: '1199',
                  priceValidUntil: '2027-12-31',
                  availability: 'https://schema.org/InStock',
                  seller: { '@type': 'Organization', name: 'Himtatwa' },
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.7',
                  reviewCount: '1600',
                  bestRating: '5',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: 'Himtatwa Liquid Shilajit — 50ml',
                image: 'https://himtatwa.com/images/product.jpg',
                description: 'Best-value pure Himalayan Shilajit in liquid dropper form. 3-4 month supply. Lab-tested, FSSAI certified.',
                brand: { '@type': 'Brand', name: 'Himtatwa' },
                sku: 'HT-50ML',
                offers: {
                  '@type': 'Offer',
                  url: 'https://himtatwa.com/products/himtatwa-liquid-shilajit-50ml',
                  priceCurrency: 'INR',
                  price: '1799',
                  priceValidUntil: '2027-12-31',
                  availability: 'https://schema.org/InStock',
                  seller: { '@type': 'Organization', name: 'Himtatwa' },
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.5',
                  reviewCount: '1100',
                  bestRating: '5',
                },
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppWidget />
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              color: '#f5f5f5',
            },
          }}
        />
      </body>
    </html>
  );
}
