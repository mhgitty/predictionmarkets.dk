import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-04-14',
  useCdn: true,
})

// Queries
export async function getPosts(limit = 20, categorySlug?: string) {
  const filter = categorySlug
    ? `*[_type == "post" && defined(publishedAt) && category->slug.current == $categorySlug]`
    : `*[_type == "post" && defined(publishedAt)]`

  return client.fetch(
    `${filter} | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readingTime,
      featuredImage,
      category-> { name, slug, emoji }
    }`,
    { limit, categorySlug: categorySlug || '' }
  )
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      body,
      publishedAt,
      lastUpdated,
      readingTime,
      featuredImage,
      metaTitle,
      metaDescription,
      category-> { name, slug, emoji },
      author-> {
        name,
        bio,
        linkedin,
        x,
        facebook,
        "imageUrl": image.asset->url
      }
    }`,
    { slug }
  )
}

export async function getCategories() {
  return client.fetch(
    `*[_type == "category"] | order(name asc) {
      _id, name, slug, emoji, description
    }`
  )
}

export async function getPlatforms() {
  return client.fetch(
    `*[_type == "platform"] | order(sortOrder asc) {
      _id,
      name,
      slug,
      logo,
      affiliateUrl,
      rating,
      shortDescription,
      badges,
      minDeposit,
      fees,
      withdrawalSpeed,
      blockchain,
      markets,
      pros,
      cons,
      sortOrder
    }`
  )
}

export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      metaTitle,
      metaDescription,
    }`,
    { slug }
  )
}

export async function getHomePage() {
  return client.fetch(
    `*[_type == "homePage"][0] {
      heroBadge,
      heroHeading,
      heroHeadingAccent,
      heroSubtext,
      heroPrimaryButtonText,
      heroSecondaryButtonText,
      stats,
      body,
      "pinnedMarketIds": pinnedMarkets[].marketId,
      metaTitle,
      metaDescription,
    }`
  )
}

export async function getPlatformBySlug(slug: string) {
  return client.fetch(
    `*[_type == "platform" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      logo,
      affiliateUrl,
      rating,
      shortDescription,
      badges,
      minDeposit,
      fees,
      withdrawalSpeed,
      blockchain,
      foundedYear,
      markets,
      pros,
      cons,
      reviewBody
    }`,
    { slug }
  )
}
