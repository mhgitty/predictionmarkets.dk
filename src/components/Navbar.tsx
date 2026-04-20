import Link from 'next/link'
import Image from 'next/image'

export function Navbar() {
  return (
    <header style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0f172a' }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 40px', maxWidth: '1280px', margin: '0 auto',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Image src="/logo.webp" alt="PredictionsMarkets.dk" width={180} height={40} style={{ height: '36px', width: 'auto' }} />
        </Link>

        <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
          {[
            { href: '/blog', label: 'Guides' },
            { href: '/platforme', label: 'Platforme' },
            { href: '/om', label: 'Om os' },
          ].map((link) => (
            <li key={link.href}>
              <Link href={link.href} style={{
                color: '#fff', textDecoration: 'none',
                fontSize: '14px', fontWeight: 400, fontFamily: 'Inter, sans-serif',
              }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/platforme" style={{
          background: '#e8a020', color: '#0f172a', padding: '9px 20px',
          borderRadius: '7px', fontSize: '13.5px', fontWeight: 600,
          textDecoration: 'none', fontFamily: 'Inter, sans-serif',
        }}>
          Kom i gang
        </Link>
      </nav>
    </header>
  )
}
