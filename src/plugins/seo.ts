import type { Plugin } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { envPublic } from '@/lib/env'

const hostname = new URL(envPublic.cmsUrl).hostname

export const seo: Plugin = seoPlugin({
  uploadsCollection: 'media',
  generateTitle: () => `${hostname}`,
  generateDescription: () => '',
  generateURL: ({ doc, collectionSlug, globalSlug, id }) => {
    switch (collectionSlug ?? globalSlug) {
      case 'pages': {
        return `${envPublic.cmsUrl}/${doc.slug === 'home' ? '' : doc.slug}`
      }
      case 'posts': {
        return `${envPublic.cmsUrl}/${collectionSlug}/post/${id}`
      }
      case 'posts-page': {
        return `${envPublic.cmsUrl}/posts/1`
      }
      default: {
        return envPublic.cmsUrl
      }
    }
  },
})
