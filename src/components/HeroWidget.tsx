'use client'

import { useEffect, useState } from 'react'

interface Market {
  question: string
  probability: number
  outcome: string
  volume: number
}

export function HeroWidget() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/ticker')
      .then((r) => r.json())
      .then((data: Market[]) => {
        setMarkets(data.slice(0, 4))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const placeholder = [
    { question: 'Vil Bitcoin nå $150k i 2025?', probability: 62, outcome: 'Ja', volume: 0 },
    { question: 'Vil der komme dansk valg i 2025?', probability: 34, outcome: 'Ja', volume: 0 },
    { question: 'Fed rentenedgang i juni?', probability: 78, outcome: 'Ja', volume: 0 },
    { question: 'Vil AI erstatte 10% af jobs i 2026?', probability: 45, outcome: 'Ja', volume: 0 },
  ]

  const items = markets.length > 0 ? markets : placeholder

  return (
    <div style={{
      background: 'rgba(30,41,59,0.6)',
      border: '1px solid rgba(232,160,32,0.2)',
      borderRadius: '16px',
      padding: '20px',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 0 60px rgba(232,160,32,0.06), 0 24px 48px rgba(0,0,0,0.3)',
      width: '100%',
      maxWidth: '380px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '7px', height: '7px', background: '#22c55e', borderRadius: '50%', display: 'inline-block',
            boxShadow: '0 0 6px #22c55e',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(232,230,224,0.5)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Live markeder</span>
        </div>
        <span style={{ fontSize: '11px', color: 'rgba(232,230,224,0.3)' }}>Polymarket</span>
      </div>

      {/* Market rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {(loading ? placeholder : items).map((m, i) => {
          const pct = Math.round(m.probability * 100) / 1
          const displayPct = typeof m.probability === 'number'
            ? m.probability > 1 ? Math.round(m.probability) : Math.round(m.probability * 100)
            : 50

          return (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px',
              padding: '12px 14px',
            }}>
              <p style={{
                fontSize: '12.5px',
                color: 'rgba(232,230,224,0.8)',
                marginBottom: '10px',
                lineHeight: 1.4,
                fontWeight: 400,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {m.question}
              </p>
              {/* Probability bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${displayPct}%`,
                    height: '100%',
                    background: displayPct >= 50 ? '#22c55e' : '#f87171',
                    borderRadius: '2px',
                    transition: 'width 0.6s ease',
                  }} />
                </div>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: displayPct >= 50 ? '#22c55e' : '#f87171',
                  minWidth: '36px',
                  textAlign: 'right',
                }}>
                  {displayPct}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11.5px', color: 'rgba(232,230,224,0.3)' }}>Opdateres live</span>
        <span style={{ fontSize: '11.5px', color: '#e8a020', fontWeight: 500 }}>Se alle markeder →</span>
      </div>
    </div>
  )
}
