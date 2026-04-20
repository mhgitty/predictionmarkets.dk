'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/blog', label: 'Guides' },
  { href: '/platforme', label: 'Platforme' },
  { href: '/om', label: 'Om os' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0f172a', position: 'relative', zIndex: 50 }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 40px', maxWidth: '1280px', margin: '0 auto',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/logo.webp" alt="PredictionMarkets.dk" width={220} height={52} style={{ height: '44px', width: 'auto' }} />
        </Link>

        {/* Desktop links */}
        <ul className="rp-nav-desktop" style={{ gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link className="rp-nav-desktop" href="/platforme" style={{
          background: '#e8a020', color: '#0f172a', padding: '9px 20px',
          borderRadius: '7px', fontSize: '13.5px', fontWeight: 600,
          textDecoration: 'none', fontFamily: 'Inter, sans-serif',
        }}>
          Kom i gang
        </Link>

        {/* Hamburger — mobile only */}
        <button
          className="rp-nav-hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Åbn menu"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          {open ? (
            /* X icon */
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 4L18 18M18 4L4 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            /* Hamburger icon */
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="rp-mobile-menu" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block', padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: 'rgba(232,230,224,0.8)', textDecoration: 'none',
                fontSize: '16px', fontFamily: 'Inter, sans-serif',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/platforme"
            onClick={() => setOpen(false)}
            style={{
              display: 'block', marginTop: '16px',
              background: '#e8a020', color: '#0f172a',
              padding: '13px 20px', borderRadius: '8px',
              fontSize: '15px', fontWeight: 600,
              textDecoration: 'none', textAlign: 'center',
            }}
          >
            Kom i gang
          </Link>
        </div>
      )}
    </header>
  )
}
