import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'
import { Page } from '@/payload-types'

export const getPageBySlug = cache(async (slug: string = 'home'): Promise<null | Page> => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    depth: 10,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export const getAllPages = cache(async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    depth: 3,
    limit: 1000,
    select: {
      updatedAt: true,
      slug: true,
      label: true,
      layout: {
        blocks: {
          hero: {
            slug: true,
            label: true,
          },
          content: {
            slug: true,
            label: true,
          },
        },
      },
    },
  })

  return result || null
})

export const getPosts = cache(async (page: number = 1, limit: number = 10) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    page: page,
    limit: limit,
    pagination: true,
    collection: 'posts',
    depth: 1,
    select: {
      shortTitle: true,
      shortDescription: true,
      updatedAt:true
    },
  })

  return result || null
})
export const getPostById = cache(async (id: number | string) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.findByID({
    collection: 'posts',
    id: id,
    depth: 2
  })

  return result || null
})

export const getPostsPage = cache(async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  return await payload.findGlobal({ slug: 'posts-page' })
})
