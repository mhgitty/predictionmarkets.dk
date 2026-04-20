import Link from 'next/link'

interface Post {
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  readingTime?: number
  category?: { name: string; emoji?: string; slug: { current: string } }
  featured?: boolean
}

export function PostCard({ title, slug, excerpt, publishedAt, readingTime, category, featured = false }: Post) {
  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  return (
    <Link href={`/blog/${slug.current}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <article style={{
        background: '#1e293b',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,160,32,0.3)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
      >
        {/* Image placeholder */}
        <div style={{
          height: featured ? '200px' : '130px',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0,
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(232,160,32,0.03) 0px, rgba(232,160,32,0.03) 1px, transparent 1px, transparent 12px)' }} />
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(232,160,32,0.1)', border: '1px solid rgba(232,160,32,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', position: 'relative', zIndex: 1 }}>
            {category?.emoji || '📈'}
          </div>
        </div>

        <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {category && (
            <span style={{ display: 'inline-block', background: 'rgba(232,160,32,0.1)', color: '#e8a020', fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', width: 'fit-content' }}>
              {category.name}
            </span>
          )}

          <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: featured ? '20px' : '16px', fontWeight: 600, color: '#fff', lineHeight: 1.35, letterSpacing: '-0.02em', margin: 0 }}>
            {title}
          </h3>

          {excerpt && (
            <p style={{ fontSize: '13.5px', color: 'rgba(232,230,224,0.5)', lineHeight: 1.65, fontWeight: 300, margin: 0, display: '-webkit-box', WebkitLineClamp: featured ? 3 : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {excerpt}
            </p>
          )}

          <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(232,230,224,0.3)' }}>
            <span>{readingTime ? `${readingTime} min læsning` : ''}</span>
            <span>{date || ''}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
