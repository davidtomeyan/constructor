import type { MetadataRoute } from 'next'
import { envPublic } from '@/lib/env'
import { getPosts } from '@/lib/services'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const postsRes = await getPosts(1, 1000)
  const sitemaps = Array.from({ length: postsRes?.totalPages ?? 0 }).map(
    (_, index) => `${envPublic.cmsUrl}/posts/sitemap/${index + 1}.xml`,
  )
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/'],
    },
    sitemap: [`${envPublic.cmsUrl}/sitemap.xml`, ...sitemaps].filter(Boolean),
  }
}
