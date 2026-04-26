import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/sanity'
import { client } from '@/lib/sanity'

const SITE_URL = 'https://predictionmarkets.dk'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all posts
  const posts = await getPosts(1000).catch(() => [])

  // Fetch all static pages
  const pages = await client.fetch(
    `*[_type == "page" && defined(slug.current)] { slug, _updatedAt }`
  ).catch(() => [])

  // Fetch all platforms
  const platforms = await client.fetch(
    `*[_type == "platform" && defined(slug.current)] { slug, _updatedAt }`
  ).catch(() => [])

  const postUrls: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${SITE_URL}/${post.slug.current}`,
    lastModified: post.lastUpdated || post.publishedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const pageUrls: MetadataRoute.Sitemap = pages.map((page: any) => ({
    url: `${SITE_URL}/${page.slug.current}`,
    lastModified: page._updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const platformUrls: MetadataRoute.Sitemap = platforms.map((p: any) => ({
    url: `${SITE_URL}/platforme/${p.slug.current}`,
    lastModified: p._updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/platforme`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postUrls,
    ...platformUrls,
    ...pageUrls,
  ]
}
