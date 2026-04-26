import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://predictionmarkets.dk'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PredictionMarkets.dk — Danmarks guide til prediction markets',
    template: '%s | PredictionMarkets.dk',
  },
  description: 'Alt du behøver at vide om prediction markets på dansk. Guides, platformanmeldelser og strategier.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    url: SITE_URL,
    siteName: 'PredictionMarkets.dk',
    title: 'PredictionMarkets.dk — Danmarks guide til prediction markets',
    description: 'Alt du behøver at vide om prediction markets på dansk. Guides, platformanmeldelser og strategier.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PredictionMarkets.dk — Danmarks guide til prediction markets',
    description: 'Alt du behøver at vide om prediction markets på dansk. Guides, platformanmeldelser og strategier.',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.webp', type: 'image/webp' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PredictionMarkets.dk',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PredictionMarkets.dk',
  url: SITE_URL,
  inLanguage: 'da',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?s={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
