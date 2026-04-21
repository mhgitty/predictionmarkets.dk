import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'PredictionMarkets.dk — Danmarks guide til prediction markets',
    template: '%s | PredictionMarkets.dk',
  },
  description: 'Alt du behøver at vide om prediction markets på dansk. Guides, platformanmeldelser og strategier.',
  alternates: {
    canonical: 'https://predictionmarkets.dk',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.webp', type: 'image/webp' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  )
}
