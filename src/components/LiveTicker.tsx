'use client'

import { useEffect, useState, useRef } from 'react'
import type { TickerItem } from '@/app/api/ticker/route'

const POLL_INTERVAL = 30_000

function formatPct(p: number) {
  return `${Math.round(p * 100)}%`
}

function TickerItems({ items }: { items: TickerItem[] }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={`${item.id}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', paddingRight: '48px' }}>
          <span style={{ fontSize: '12.5px', color: 'rgba(203,213,225,0.6)', whiteSpace: 'nowrap' }}>
            {item.question}
          </span>
          <span style={{
            fontSize: '12.5px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            color: item.probability >= 0.6
              ? '#4ade80'
              : item.probability <= 0.35
                ? '#f87171'
                : 'rgba(203,213,225,0.85)',
          }}>
            {item.outcome} {formatPct(item.probability)}
          </span>
          {/* Separator dot */}
          <span style={{ color: 'rgba(255,255,255,0.15)', paddingLeft: '42px', fontSize: '10px' }}>◆</span>
        </span>
      ))}
    </>
  )
}

export function LiveTicker({ pinnedIds = [] }: { pinnedIds?: string[] }) {
  const [items, setItems] = useState<TickerItem[]>([])
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  async function load() {
    try {
      const params = pinnedIds.length ? `?pinned=${pinnedIds.join(',')}` : ''
      const res = await fetch(`/api/ticker${params}`)
      if (!res.ok) return
      const data: TickerItem[] = await res.json()
      setItems(data)
    } catch {
      // silently fail — keep showing previous items
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    intervalRef.current = setInterval(load, POLL_INTERVAL)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  // Scroll speed: pixels per second. Wider content = same speed feels right.
  const scrollDuration = Math.max(20, items.length * 8)

  return (
    <div style={{
      background: '#0d1426',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '9px 0',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Static "LIVE MARKETS" badge — pinned left */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '0 16px 0 24px',
        flexShrink: 0,
        zIndex: 2,
        background: '#0d1426',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        marginRight: '20px',
      }}>
        <span style={{
          width: '6px', height: '6px',
          background: '#4ade80',
          borderRadius: '50%',
          display: 'inline-block',
          boxShadow: '0 0 6px #4ade80',
          animation: 'pulse 2s infinite',
        }} />
        <span style={{
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: '#e8a020',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          Live markets
        </span>
      </div>

      {/* Scrolling strip */}
      <div style={{ overflow: 'hidden', flex: 1, position: 'relative' }}>
        {loading ? (
          <span style={{ fontSize: '12px', color: 'rgba(203,213,225,0.3)', fontStyle: 'italic' }}>
            Henter markedsdata…
          </span>
        ) : items.length === 0 ? (
          <span style={{ fontSize: '12px', color: 'rgba(203,213,225,0.3)', fontStyle: 'italic' }}>
            Ingen markedsdata tilgængelig
          </span>
        ) : (
          /* Duplicate content so the scroll loops seamlessly */
          <div style={{
            display: 'inline-flex',
            animation: `marquee ${scrollDuration}s linear infinite`,
            whiteSpace: 'nowrap',
          }}>
            <TickerItems items={items} />
            <TickerItems items={items} />
          </div>
        )}
      </div>

      {/* Fade-out on the right edge */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '80px',
        background: 'linear-gradient(to right, transparent, #0d1426)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
    </div>
  )
}
