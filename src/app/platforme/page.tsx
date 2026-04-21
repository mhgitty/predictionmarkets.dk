import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getPlatforms } from '@/lib/sanity'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sammenlign Prediction Market Platforme',
  description: 'Sammenlign de bedste prediction market platforme. Se gebyrer, markeder, og find den bedste platform for dig.',
  alternates: {
    canonical: 'https://predictionmarkets.dk/platforme',
  },
}

export default async function PlatformerPage() {
  const platforms = await getPlatforms().catch(() => [])

  return (
    <>
      <Navbar />
      <div className="rp-section">
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', marginBottom: '12px' }}>
            Sammenlign platforme
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(232,230,224,0.5)', fontWeight: 300 }}>
            Vi har testet og anmeldt de bedste prediction market platforme tilgængelige for danskere.
          </p>
        </div>

        {platforms.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(232,230,224,0.3)' }}>
            <p style={{ fontSize: '16px', marginBottom: '16px' }}>Ingen platforme tilføjet endnu.</p>
            <Link href="/studio" style={{ color: '#e8a020', fontSize: '14px' }}>Tilføj platforme i Sanity Studio →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {platforms.map((platform: any, i: number) => (
              <div key={platform._id} style={{
                background: '#1e293b',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                padding: '24px 28px',
              }}>
                {/* Top row: rank + name + CTA */}
                <div className="rp-platform-row">
                  <div className="rp-platform-num" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '22px', fontWeight: 800, color: i === 0 ? '#e8a020' : 'rgba(232,230,224,0.2)' }}>
                    {i + 1}
                  </div>

                  <div className="rp-platform-name-col">
                    <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                      {platform.name}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {platform.badges?.map((badge: string, j: number) => (
                        <span key={j} style={{ background: 'rgba(232,160,32,0.1)', color: '#e8a020', fontSize: '10px', fontWeight: 500, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rp-platform-stats">
                    {platform.minDeposit && (
                      <div>
                        <div style={{ fontSize: '11px', color: 'rgba(232,230,224,0.3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Min. indbetaling</div>
                        <div style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>{platform.minDeposit}</div>
                      </div>
                    )}
                    {platform.fees && (
                      <div>
                        <div style={{ fontSize: '11px', color: 'rgba(232,230,224,0.3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Gebyrer</div>
                        <div style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>{platform.fees}</div>
                      </div>
                    )}
                    {platform.rating && (
                      <div>
                        <div style={{ fontSize: '11px', color: 'rgba(232,230,224,0.3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Vurdering</div>
                        <div style={{ fontSize: '18px', color: '#e8a020', fontWeight: 700, fontFamily: 'Bricolage Grotesque, sans-serif' }}>{platform.rating}/10</div>
                      </div>
                    )}
                  </div>

                  <div className="rp-platform-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
                    <a href={platform.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" style={{ background: '#e8a020', color: '#0f172a', padding: '10px 20px', borderRadius: '7px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
                      Besøg platform
                    </a>
                    <Link href={`/platforme/${platform.slug.current}`} style={{ color: 'rgba(232,230,224,0.4)', fontSize: '12.5px', textDecoration: 'none', textAlign: 'center' }}>
                      Læs anmeldelse →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p style={{ fontSize: '12px', color: 'rgba(232,230,224,0.2)', marginTop: '32px', lineHeight: 1.6 }}>
          Reklame: Denne side indeholder affiliate-links. Vi modtager en kommission hvis du opretter en konto via vores links — uden ekstra omkostninger for dig.
        </p>
      </div>
      <Footer />
    </>
  )
}
