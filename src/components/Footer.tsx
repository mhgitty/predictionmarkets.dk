import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: '#0d1426' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 40px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '14px' }}>
              <Image src="/logo.webp" alt="PredictionMarkets.dk" width={200} height={46} style={{ height: '40px', width: 'auto' }} />
            </Link>
            <p style={{ fontSize: '13.5px', color: 'rgba(232,230,224,0.4)', lineHeight: 1.7, maxWidth: '280px', fontWeight: 300 }}>
              Danmarks uafhængige guide til prediction markets.
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(232,230,224,0.2)', marginTop: '16px' }}>
              Indeholder affiliate-links. Vi modtager kommission uden ekstra omkostninger for dig.
            </p>
          </div>

          {[
            { title: 'Guides', links: [{ href: '/blog', label: 'Alle guides' }, { href: '/blog/hvad-er-prediction-markets', label: 'Hvad er prediction markets?' }, { href: '/blog/kom-i-gang', label: 'Kom i gang' }] },
            { title: 'Platforme', links: [{ href: '/platforme', label: 'Alle platforme' }, { href: '/platforme/polymarket', label: 'Polymarket' }, { href: '/platforme/kalshi', label: 'Kalshi' }] },
            { title: 'Info', links: [{ href: '/om', label: 'Om os' }, { href: '/om/kontakt', label: 'Kontakt' }, { href: '/om/privatlivspolitik', label: 'Privatlivspolitik' }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} style={{ color: 'rgb(148 163 184)', fontSize: '13.5px', textDecoration: 'none' }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '12.5px', color: 'rgba(232,230,224,0.25)' }}>
          © {new Date().getFullYear()} PredictionMarkets.dk — Spil ansvarligt. 18+
        </p>
      </div>
    </footer>
  )
}
