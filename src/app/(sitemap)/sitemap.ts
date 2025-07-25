import { envPublic } from '@/lib/env'
import { getAllPages, getPosts } from '@/lib/services'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages()
  const postsRes = await getPosts(1, 10)

  const urls: MetadataRoute.Sitemap = []

  pages?.docs.forEach((page) => {
    urls.push({
      priority: page.slug === 'home' ? 1 : 0.9,
      url: `${envPublic.cmsUrl}${page.slug === 'home' ? '' : `/${page.slug}`}`,
      lastModified: page.updatedAt ?? new Date().toISOString(),
    })
  })
  Array.from({ length: postsRes?.totalPages ?? 1 }).map((_, index) => {
    urls.push({
      priority: 0.8,
      url: `${envPublic.cmsUrl}/posts/${index + 1}`,
      lastModified: new Date().toISOString(),
    })
  })
  return urls
}
