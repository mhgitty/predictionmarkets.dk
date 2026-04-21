'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: 'h2' | 'h3' | 'h4'
}

function extractHeadings(body: any[]): Heading[] {
  if (!body?.length) return []
  return body
    .filter((block: any) => block._type === 'block' && ['h2', 'h3', 'h4'].includes(block.style))
    .map((block: any) => {
      const text = block.children?.map((c: any) => c.text).join('') || ''
      return {
        id: headingId(text),
        text,
        level: block.style as 'h2' | 'h3' | 'h4',
      }
    })
    .filter((h) => h.text.length > 0)
}

function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-æøå]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function TableOfContents({ body }: { body: any[] }) {
  const [activeId, setActiveId] = useState<string>('')
  const headings = extractHeadings(body)

  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '0px 0px -60% 0px' }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings.length])

  if (!headings.length) return null

  return (
    <div style={{
      background: '#1e293b',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '16px',
    }}>
      <h4 style={{
        fontFamily: 'Bricolage Grotesque, sans-serif',
        fontSize: '11px',
        fontWeight: 700,
        color: 'rgba(232,230,224,0.4)',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        marginBottom: '14px',
      }}>
        Indholdsfortegnelse
      </h4>

      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                style={{
                  display: 'block',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: activeId === id ? '#e8a020' : 'rgba(232,230,224,0.55)',
                  textDecoration: 'none',
                  padding: '4px 0',
                  paddingLeft: level === 'h3' ? '12px' : level === 'h4' ? '24px' : '0',
                  borderLeft: activeId === id ? '2px solid #e8a020' : '2px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

// Export the helper so the page renderer can add IDs to headings
export { headingId }
