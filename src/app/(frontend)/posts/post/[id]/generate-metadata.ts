import { getPostById } from '@/lib/services'
import type { Metadata, ResolvingMetadata } from 'next'
import { envPublic } from '@/lib/env'
import { Post } from '@/payload-types'

type Props = {
  params: Promise<{ id: number | string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id: postId } = await params
  let post: Post

  try {
    post = await getPostById(postId)
  } catch (error) {
    console.warn(error)
    return {}
  }

  const meta = post.meta
  const previousImages = (await parent).openGraph?.images || []
  const ImageUrl =
    typeof meta?.image === 'object' && meta?.image?.sizes?.og?.filename
      ? `${envPublic.cmsUrl}/media/${meta?.image?.sizes?.og?.filename}`
      : ''

  const images = [ImageUrl, ...previousImages].filter(Boolean) as string[]
  return {
    title: meta?.title ?? post?.shortTitle ?? '',
    description: meta?.description ?? post?.shortDescription ?? '',
    openGraph: {
      images: images,
    },
  }
}
