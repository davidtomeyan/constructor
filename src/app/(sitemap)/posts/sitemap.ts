import { envPublic } from '@/lib/env'
import { getPosts } from '@/lib/services'
import type { MetadataRoute } from 'next'

export async function generateSitemaps() {
  const res = await getPosts(1, 1000)
  return Array.from({ length: res?.totalPages ?? 0 }).map((_, index) => ({ id: index + 1 }))
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const res = await getPosts(id, 1000)

  return res?.docs.map((post) => ({
    priority: 0.8,
    url: `${envPublic.cmsUrl}/posts/post/${post.id}`,
    lastModified: post.updatedAt ?? new Date().toISOString(),
  }))
}
