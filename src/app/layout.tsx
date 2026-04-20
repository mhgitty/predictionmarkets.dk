import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'PredictionsMarkets.dk — Danmarks guide til prediction markets',
    template: '%s | PredictionsMarkets.dk',
  },
  description: 'Alt du behøver at vide om prediction markets på dansk. Guides, platformanmeldelser og strategier.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  )
}
