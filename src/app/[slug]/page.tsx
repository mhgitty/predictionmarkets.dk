import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getPostBySlug, getPageBySlug, getPosts } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ProsConsBlock } from '@/components/ProsConsBlock'
import { FaqBlock } from '@/components/FaqBlock'
import { CalloutBlock } from '@/components/CalloutBlock'
import { TableOfContents, headingId } from '@/components/TableOfContents'
import { AuthorMeta } from '@/components/AuthorMeta'
import { AuthorBio } from '@/components/AuthorBio'

const SITE_URL = 'https://predictionmarkets.dk'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const post = await getPostBySlug(slug)
  if (post) {
    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      alternates: { canonical: `${SITE_URL}/${slug}` },
    }
  }

  const page = await getPageBySlug(slug)
  if (page) {
    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription,
      alternates: { canonical: `${SITE_URL}/${slug}` },
    }
  }

  return {}
}

export async function generateStaticParams() {
  const posts = await getPosts(100)
  return posts.map((post: any) => ({ slug: post.slug.current }))
}

// Portable Text components — headings get IDs for TOC anchor links
const ptComponents = {
  block: {
    h2: ({ children, value }: any) => {
      const text = value?.children?.map((c: any) => c.text).join('') || ''
      return <h2 id={headingId(text)}>{children}</h2>
    },
    h3: ({ children, value }: any) => {
      const text = value?.children?.map((c: any) => c.text).join('') || ''
      return <h3 id={headingId(text)}>{children}</h3>
    },
    h4: ({ children, value }: any) => {
      const text = value?.children?.map((c: any) => c.text).join('') || ''
      return <h4 id={headingId(text)}>{children}</h4>
    },
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
    normal: ({ children }: any) => <p>{children}</p>,
  },
  marks: {
    link: ({ value, children }: any) => (
      <a href={value.href} target={value.blank ? '_blank' : '_self'} rel="noopener noreferrer">{children}</a>
    ),
  },
  types: {
    prosConsBlock: ({ value }: any) => <ProsConsBlock value={value} />,
    faqBlock: ({ value }: any) => <FaqBlock value={value} />,
    calloutBlock: ({ value }: any) => <CalloutBlock value={value} />,
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
}

// ── Structured data ───────────────────────────────────────────────────────────

function buildFaqJsonLd(body: any[]) {
  if (!body?.length) return null
  const faqBlocks = body.filter((b: any) => b._type === 'faqBlock')
  if (!faqBlocks.length) return null
  const allItems = faqBlocks.flatMap((b: any) => b.items ?? [])
  if (!allItems.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((item: any) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

function buildArticleJsonLd(post: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt || '',
    datePublished: post.publishedAt ?? undefined,
    dateModified: (post.lastUpdated || post.publishedAt) ?? undefined,
    url,
    inLanguage: 'da',
    ...(post.author?.imageUrl ? {
      author: {
        '@type': 'Person',
        name: post.author.name,
        image: post.author.imageUrl,
      },
    } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'PredictionMarkets.dk',
      url: SITE_URL,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export default async function SlugPage({ params }: Props) {
  const { slug } = await params

  // Try post first, then static page
  const post = await getPostBySlug(slug)

  if (post) {
    return <PostContent post={post} slug={slug} />
  }

  const page = await getPageBySlug(slug)
  if (page) {
    return <PageContent page={page} slug={slug} />
  }

  notFound()
}

// ── Post renderer ─────────────────────────────────────────────────────────────

function PostContent({ post, slug }: { post: any; slug: string }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const pageUrl = `${SITE_URL}/${slug}`
  const faqJsonLd = buildFaqJsonLd(post.body)
  const articleJsonLd = buildArticleJsonLd(post, pageUrl)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <Navbar />
      <div className="rp-post-wrap">
        <div className="rp-post-layout">

          {/* ── Article ── */}
          <article>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ fontSize: '13px', color: 'rgba(232,230,224,0.35)', textDecoration: 'none' }}>Hjem</Link>
              <span style={{ color: 'rgba(232,230,224,0.2)' }}>/</span>
              <Link href="/blog" style={{ fontSize: '13px', color: 'rgba(232,230,224,0.35)', textDecoration: 'none' }}>Guides</Link>
              {post.category && (
                <>
                  <span style={{ color: 'rgba(232,230,224,0.2)' }}>/</span>
                  <span style={{ fontSize: '13px', color: 'rgba(232,230,224,0.35)' }}>{post.category.name}</span>
                </>
              )}
            </div>

            {post.category && (
              <span style={{ display: 'inline-block', background: 'rgba(232,160,32,0.1)', color: '#e8a020', fontSize: '11px', fontWeight: 500, padding: '4px 12px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
                {post.category.emoji} {post.category.name}
              </span>
            )}

            <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '20px' }}>
              {post.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
              {post.author ? (
                <AuthorMeta
                  author={post.author}
                  lastUpdated={post.lastUpdated}
                  publishedAt={post.publishedAt}
                />
              ) : (
                <div style={{ display: 'flex', gap: '20px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '40px', flexWrap: 'wrap', width: '100%' }}>
                  {date && <span style={{ fontSize: '13px', color: 'rgba(232,230,224,0.4)' }}>{date}</span>}
                  {post.readingTime && <span style={{ fontSize: '13px', color: 'rgba(232,230,224,0.4)' }}>{post.readingTime} min læsning</span>}
                </div>
              )}
              {post.author && post.readingTime && (
                <span style={{ fontSize: '12px', color: 'rgba(232,230,224,0.3)', marginBottom: '36px' }}>{post.readingTime} min læsning</span>
              )}
            </div>

            <div className="prose-dark">
              {post.body && <PortableText value={post.body} components={ptComponents} />}
            </div>

            {post.author && <AuthorBio author={post.author} />}

            {/* Mobile CTA */}
            <div className="rp-post-sidebar-cta" style={{ display: 'none', marginTop: '24px', background: 'rgba(232,160,32,0.07)', border: '1px solid rgba(232,160,32,0.2)', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Klar til at handle?</h4>
              <p style={{ fontSize: '13px', color: 'rgba(232,230,224,0.5)', lineHeight: 1.6, marginBottom: '16px', fontWeight: 300 }}>Se vores sammenligning af de bedste prediction market platforme.</p>
              <Link href="/platforme" style={{ display: 'block', background: '#e8a020', color: '#0f172a', padding: '10px 16px', borderRadius: '7px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>Sammenlign platforme</Link>
            </div>
          </article>

          {/* ── Sticky sidebar ── */}
          <aside className="rp-post-sidebar">
            <div className="rp-hide-mobile">
              <TableOfContents body={post.body || []} />
            </div>

            <div className="rp-hide-mobile" style={{ background: 'rgba(232,160,32,0.07)', border: '1px solid rgba(232,160,32,0.2)', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                Klar til at handle?
              </h4>
              <p style={{ fontSize: '13px', color: 'rgba(232,230,224,0.5)', lineHeight: 1.6, marginBottom: '16px', fontWeight: 300 }}>
                Se vores sammenligning af de bedste prediction market platforme.
              </p>
              <Link href="/platforme" style={{ display: 'block', background: '#e8a020', color: '#0f172a', padding: '10px 16px', borderRadius: '7px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
                Sammenlign platforme
              </Link>
            </div>
          </aside>

        </div>
      </div>
      <Footer />
    </>
  )
}

// ── Static page renderer ──────────────────────────────────────────────────────

function PageContent({ page, slug }: { page: any; slug: string }) {
  return (
    <>
      <Navbar />
      <div className="rp-post-wrap">
        <div className="rp-post-layout">
          <article>
            <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '32px' }}>
              {page.title}
            </h1>
            <div className="prose-dark">
              {page.body && <PortableText value={page.body} components={ptComponents} />}
            </div>
          </article>

          <aside className="rp-post-sidebar">
            <div className="rp-hide-mobile">
              <TableOfContents body={page.body || []} />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  )
}
