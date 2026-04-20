import Link from 'next/link'
import Image from 'next/image'

const COLUMNS = [
  {
    title: 'Guides',
    links: [
      { href: '/blog', label: 'Alle guides' },
      { href: '/blog/hvad-er-prediction-markets', label: 'Hvad er prediction markets?' },
      { href: '/blog/kom-i-gang', label: 'Kom i gang' },
    ],
  },
  {
    title: 'Platforme',
    links: [
      { href: '/platforme', label: 'Alle platforme' },
      { href: '/platforme/polymarket', label: 'Polymarket' },
      { href: '/platforme/kalshi', label: 'Kalshi' },
    ],
  },
  {
    title: 'Info',
    links: [
      { href: '/om', label: 'Om os' },
      { href: '/om/kontakt', label: 'Kontakt' },
      { href: '/om/privatlivspolitik', label: 'Privatlivspolitik' },
    ],
  },
]

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: '#0d1426' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 40px 32px' }}>

        {/* Row 1 — Logo + tagline (full width) */}
        <div style={{ marginBottom: '36px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <Link href="/" style={{ display: 'inline-block', marginBottom: '12px' }}>
            <Image src="/logo.webp" alt="PredictionMarkets.dk" width={200} height={46} style={{ height: '38px', width: 'auto' }} />
          </Link>
          <p style={{ fontSize: '13.5px', color: 'rgba(232,230,224,0.4)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
            Danmarks uafhængige guide til prediction markets.
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(232,230,224,0.2)', marginTop: '10px', margin: '10px 0 0' }}>
            Indeholder affiliate-links. Vi modtager kommission uden ekstra omkostninger for dig.
          </p>
        </div>

        {/* Row 2 — Link columns: always 3 side-by-side */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '36px',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginBottom: '14px',
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} style={{ color: 'rgb(148 163 184)', fontSize: '13.5px', textDecoration: 'none', lineHeight: 1.4, display: 'inline-block' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <p style={{ fontSize: '12.5px', color: 'rgba(232,230,224,0.25)', margin: 0 }}>
          © {new Date().getFullYear()} PredictionMarkets.dk — Spil ansvarligt. 18+
        </p>

      </div>
    </footer>
  )
}
