import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PostCard } from '@/components/PostCard'
import { getPosts, getCategories } from '@/lib/sanity'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guides & Artikler',
  description: 'Alle vores guides og artikler om prediction markets på dansk.',
  alternates: {
    canonical: 'https://predictionmarkets.dk/blog',
  },
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPosts(20).catch(() => []),
    getCategories().catch(() => []),
  ])

  return (
    <>
      <Navbar />
      <div className="rp-section">
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', marginBottom: '12px' }}>
            Guides & artikler
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(232,230,224,0.5)', fontWeight: 300 }}>
            Alt du behøver at vide om prediction markets — på dansk.
          </p>
        </div>

        {/* Category filters */}
        {categories.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <Link href="/blog" style={{ padding: '7px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, background: 'rgba(232,160,32,0.15)', color: '#e8a020', border: '1px solid rgba(232,160,32,0.3)', textDecoration: 'none' }}>
              Alle
            </Link>
            {categories.map((cat: any) => (
              <Link key={cat._id} href={`/blog?kategori=${cat.slug.current}`} style={{ padding: '7px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 400, background: 'transparent', color: 'rgba(232,230,224,0.5)', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(232,230,224,0.3)' }}>
            <p style={{ fontSize: '16px', marginBottom: '16px' }}>Ingen artikler endnu.</p>
            <Link href="/studio" style={{ color: '#e8a020', fontSize: '14px' }}>Tilføj indhold i Sanity Studio →</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {posts.map((post: any) => <PostCard key={post._id} {...post} />)}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
