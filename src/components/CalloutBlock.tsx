type Variant = 'info' | 'tip' | 'warning'

type CalloutBlockProps = {
  value: {
    variant?: Variant
    title?: string
    body?: string
  }
}

const VARIANTS = {
  info: {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3" strokeLinecap="round" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </svg>
    ),
    accent: '#38bdf8',        // sky blue
    bg: 'rgba(56,189,248,0.07)',
    border: 'rgba(56,189,248,0.25)',
    leftBar: '#38bdf8',
  },
  tip: {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 1 4 12.9V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.1A7 7 0 0 1 12 2z" />
        <path d="M9 21h6M10 17v1M14 17v1" />
      </svg>
    ),
    accent: '#e8a020',        // amber — matches site accent
    bg: 'rgba(232,160,32,0.07)',
    border: 'rgba(232,160,32,0.25)',
    leftBar: '#e8a020',
  },
  warning: {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    accent: '#f87171',        // red
    bg: 'rgba(248,113,113,0.07)',
    border: 'rgba(248,113,113,0.2)',
    leftBar: '#f87171',
  },
}

export function CalloutBlock({ value }: CalloutBlockProps) {
  const { variant = 'info', title, body } = value
  const v = VARIANTS[variant] ?? VARIANTS.info

  return (
    <div style={{
      margin: '28px 0',
      borderRadius: '10px',
      background: v.bg,
      border: `1px solid ${v.border}`,
      borderLeft: `4px solid ${v.leftBar}`,
      padding: '18px 20px',
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
    }}>
      {/* Icon */}
      <span style={{ color: v.accent, flexShrink: 0, marginTop: '2px' }}>
        {v.icon}
      </span>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {title && (
          <p style={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontSize: '14.5px',
            fontWeight: 700,
            color: v.accent,
            margin: '0 0 6px',
            lineHeight: 1.4,
          }}>
            {title}
          </p>
        )}
        {body && (
          <p style={{
            fontSize: '14px',
            color: 'rgba(232,230,224,0.75)',
            lineHeight: 1.7,
            margin: 0,
            fontWeight: 300,
            whiteSpace: 'pre-line',
          }}>
            {body}
          </p>
        )}
      </div>
    </div>
  )
}
