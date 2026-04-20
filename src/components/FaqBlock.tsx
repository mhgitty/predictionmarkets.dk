'use client'

import { useState } from 'react'

type FaqItem = {
  _key: string
  question: string
  answer: string
}

type FaqBlockProps = {
  value: {
    title?: string
    items?: FaqItem[]
  }
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: '17px',
          fontWeight: 600,
          color: open ? '#e8a020' : '#fff',
          lineHeight: 1.4,
          transition: 'color 0.2s',
          fontFamily: 'Bricolage Grotesque, sans-serif',
        }}>
          {question}
        </span>
        <span style={{
          fontSize: '18px',
          color: open ? '#e8a020' : 'rgba(232,230,224,0.3)',
          flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s, color 0.2s',
          display: 'inline-block',
          lineHeight: 1,
        }}>
          +
        </span>
      </button>

      {open && (
        <div style={{
          padding: '0 24px 20px',
        }}>
          <p style={{
            fontSize: '17px',
            color: 'rgb(203 213 225)',
            lineHeight: 1.75,
            margin: 0,
            fontWeight: 400,
          }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

export function FaqBlock({ value }: FaqBlockProps) {
  const { title = 'Ofte stillede spørgsmål', items = [] } = value

  if (items.length === 0) return null

  return (
    <div style={{
      margin: '40px 0',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.09)',
      background: '#1e293b',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{ fontSize: '18px' }}>❓</span>
        <h3 style={{
          fontFamily: 'Bricolage Grotesque, sans-serif',
          fontSize: '16px',
          fontWeight: 700,
          color: '#fff',
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          {title}
        </h3>
      </div>

      {/* Items */}
      <div>
        {items.map((item, i) => (
          <FaqItem
            key={item._key || i}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  )
}
