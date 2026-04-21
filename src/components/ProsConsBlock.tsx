type ProsConsBlockProps = {
  value: {
    title?: string
    pros?: string[]
    cons?: string[]
  }
}

export function ProsConsBlock({ value }: ProsConsBlockProps) {
  const { title, pros = [], cons = [] } = value

  return (
    <div style={{
      margin: '32px 0',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.09)',
      background: '#1e293b',
    }}>
      {title && (
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          fontFamily: 'Bricolage Grotesque, sans-serif',
          fontSize: '14px',
          fontWeight: 700,
          color: 'rgba(232,230,224,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
        }}>
          {title}
        </div>
      )}

      <div className="rp-pros-cons-grid">
        {/* Pros */}
        <div className="rp-pros-col" style={{ padding: '20px 24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            color: '#4ade80',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            <span style={{ fontSize: '16px' }}>✅</span> Fordele
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pros.map((pro, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#4ade80', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>+</span>
                <span style={{ fontSize: '15px', color: 'rgb(203 213 225)', lineHeight: 1.7 }}>{pro}</span>
              </li>
            ))}
            {pros.length === 0 && (
              <li style={{ fontSize: '13px', color: 'rgba(232,230,224,0.25)', fontStyle: 'italic' }}>Ingen fordele angivet</li>
            )}
          </ul>
        </div>

        {/* Cons */}
        <div className="rp-cons-col" style={{ padding: '20px 24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            color: '#f87171',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            <span style={{ fontSize: '16px' }}>❌</span> Ulemper
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cons.map((con, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#f87171', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>−</span>
                <span style={{ fontSize: '15px', color: 'rgb(203 213 225)', lineHeight: 1.7 }}>{con}</span>
              </li>
            ))}
            {cons.length === 0 && (
              <li style={{ fontSize: '13px', color: 'rgba(232,230,224,0.25)', fontStyle: 'italic' }}>Ingen ulemper angivet</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
