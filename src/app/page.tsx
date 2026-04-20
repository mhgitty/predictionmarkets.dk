import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PostCard } from '@/components/PostCard'
import { ProsConsBlock } from '@/components/ProsConsBlock'
import { FaqBlock } from '@/components/FaqBlock'
import { CalloutBlock } from '@/components/CalloutBlock'
import { LatestPostsBlock } from '@/components/LatestPostsBlock'
import { LiveTicker } from '@/components/LiveTicker'
import { HeroWidget } from '@/components/HeroWidget'
import { getPosts, getCategories, getHomePage } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'


// Default values used if no Sanity document exists yet
const DEFAULTS = {
  heroBadge: 'Danmarks guide til prediction markets',
  heroHeading: 'Forudsig fremtiden|| med rigtige penge',
  heroHeadingAccent: 'rigtige penge',
  heroSubtext: 'Alt du behøver at vide om prediction markets — fra begynder til ekspert. Guides, platformanmeldelser og strategier på dansk.',
  heroPrimaryButtonText: 'Læs seneste guides',
  heroSecondaryButtonText: 'Sammenlign platforme →',
  stats: [
    { value: '100+', label: 'Guides publiceret' },
    { value: '5', label: 'Platforme anmeldt' },
    { value: '100%', label: 'Dansk indhold' },
    { value: 'Gratis', label: 'Adgang til alt' },
  ],
}

function makePtComponents(posts: any[]) { return {
  block: {
    h2: ({ children }: any) => (
      <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '30px', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: '16px', marginTop: '40px' }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '23px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '12px', marginTop: '32px' }}>{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p style={{ fontSize: '16px', color: 'rgb(203 213 225)', lineHeight: 1.75, marginBottom: '16px', fontWeight: 400 }}>{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{ borderLeft: '3px solid #e8a020', paddingLeft: '16px', margin: '24px 0', color: 'rgba(232,230,224,0.6)', fontStyle: 'italic' }}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong style={{ color: '#fff', fontWeight: 600 }}>{children}</strong>,
    link: ({ value, children }: any) => (
      <a href={value.href} target={value.blank ? '_blank' : '_self'} rel="noopener noreferrer" style={{ color: '#e8a020', textDecoration: 'underline' }}>{children}</a>
    ),
  },
  types: {
    prosConsBlock: ({ value }: any) => <ProsConsBlock value={value} />,
    faqBlock: ({ value }: any) => <FaqBlock value={value} />,
    calloutBlock: ({ value }: any) => <CalloutBlock value={value} />,
    latestPostsBlock: ({ value }: any) => <LatestPostsBlock value={value} posts={posts} />,
    image: ({ value }: any) => (
      value?.asset?._ref ? (
        <img
          src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${value.asset._ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}`}
          alt={value.alt || ''}
          style={{ width: '100%', borderRadius: '8px', margin: '24px 0' }}
        />
      ) : null
    ),
  },
}}

// Renders the H1, splitting on || and highlighting the accent phrase
function HeroHeading({ heading, accent }: { heading: string; accent: string }) {
  const parts = heading.split('||')
  return (
    <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 800, lineHeight: 1.07, letterSpacing: '-0.04em', color: '#fff', marginBottom: '24px', maxWidth: '700px' }}>
      {parts.map((part, i) => {
        if (!accent) return <span key={i}>{part}{i < parts.length - 1 ? <br /> : null}</span>
        const idx = part.indexOf(accent)
        if (idx === -1) return <span key={i}>{part}{i < parts.length - 1 ? <br /> : null}</span>
        return (
          <span key={i}>
            {part.slice(0, idx)}
            <span style={{ color: '#e8a020' }}>{accent}</span>
            {part.slice(idx + accent.length)}
            {i < parts.length - 1 ? <br /> : null}
          </span>
        )
      })}
    </h1>
  )
}

export default async function HomePage() {
  const [posts, categories, homePage] = await Promise.all([
    getPosts(6).catch(() => []),
    getCategories().catch(() => []),
    getHomePage().catch(() => null),
  ])

  const featuredPost = posts[0]
  const restPosts = posts.slice(1, 5)

  // Merge Sanity data with defaults
  const hero = {
    badge: homePage?.heroBadge || DEFAULTS.heroBadge,
    heading: homePage?.heroHeading || DEFAULTS.heroHeading,
    accent: homePage?.heroHeadingAccent || DEFAULTS.heroHeadingAccent,
    subtext: homePage?.heroSubtext || DEFAULTS.heroSubtext,
    primaryBtn: homePage?.heroPrimaryButtonText || DEFAULTS.heroPrimaryButtonText,
    secondaryBtn: homePage?.heroSecondaryButtonText || DEFAULTS.heroSecondaryButtonText,
  }
  const stats = (homePage?.stats?.length ? homePage.stats : DEFAULTS.stats) as { value: string; label: string }[]

  return (
    <>
      <Navbar />

      {/* Live ticker — polls Polymarket API every 30s */}
      <LiveTicker pinnedIds={homePage?.pinnedMarketIds ?? []} />

      {/* Hero */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 40px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
          {/* Left: text content */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(232,160,32,0.1)', border: '1px solid rgba(232,160,32,0.25)', borderRadius: '20px', padding: '5px 14px', fontSize: '11.5px', fontWeight: 500, color: '#e8a020', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '28px' }}>
              <span style={{ width: '5px', height: '5px', background: '#e8a020', borderRadius: '50%', display: 'inline-block' }} />
              {hero.badge}
            </div>

            <HeroHeading heading={hero.heading} accent={hero.accent} />

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(232,230,224,0.6)', maxWidth: '500px', marginBottom: '40px', fontWeight: 300 }}>
              {hero.subtext}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/blog" style={{ background: '#e8a020', color: '#0f172a', padding: '13px 28px', borderRadius: '7px', fontSize: '14.5px', fontWeight: 600, textDecoration: 'none' }}>
                {hero.primaryBtn}
              </Link>
              <Link href="/platforme" style={{ background: 'transparent', color: 'rgba(232,230,224,0.7)', border: '1px solid rgba(255,255,255,0.15)', padding: '13px 28px', borderRadius: '7px', fontSize: '14.5px', textDecoration: 'none' }}>
                {hero.secondaryBtn}
              </Link>
            </div>
          </div>

          {/* Right: live market widget */}
          <div style={{ flexShrink: 0, width: '380px', display: 'flex', alignItems: 'center' }}>
            <HeroWidget />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', display: 'flex' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ flex: 1, padding: '24px 32px', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '28px', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'rgba(232,230,224,0.35)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em' }}>Seneste guides & artikler</h2>
          <Link href="/blog" style={{ fontSize: '13px', color: '#e8a020', textDecoration: 'none', fontWeight: 500 }}>Se alle →</Link>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'rgba(232,230,224,0.3)' }}>
            <p>Ingen artikler endnu.</p>
            <Link href="/studio" style={{ color: '#e8a020', fontSize: '14px', marginTop: '12px', display: 'inline-block' }}>Tilføj indhold i Sanity Studio →</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', alignItems: 'start' }}>
            {featuredPost && <PostCard {...featuredPost} featured />}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {restPosts.slice(0, 2).map((post: any) => <PostCard key={post._id} {...post} />)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {restPosts.slice(2, 4).map((post: any) => <PostCard key={post._id} {...post} />)}
            </div>
          </div>
        )}
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 40px' }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: '28px' }}>Udforsk emner</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {categories.map((cat: any) => (
                <Link key={cat._id} href={`/blog?kategori=${cat.slug.current}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '20px', width: '40px', height: '40px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {cat.emoji || '📊'}
                    </div>
                    <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '14px', fontWeight: 600, color: '#fff' }}>{cat.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Body content from Sanity (FAQ, callouts, rich text etc.) */}
      {homePage?.body?.length > 0 && (
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '64px 40px' }}>
            <PortableText value={homePage.body} components={makePtComponents(posts)} />
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
