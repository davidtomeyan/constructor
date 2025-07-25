import { getPageBySlug } from '@/lib/services'
import type { Metadata, ResolvingMetadata } from 'next'
import { envPublic } from '@/lib/env'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  const previousImages = (await parent).openGraph?.images || []
  const ImageUrl =
    typeof page?.meta?.image === 'object' && page?.meta?.image?.sizes?.og?.filename
      ? `${envPublic.cmsUrl}/media/${page.meta.image.sizes.og.filename}`
      : ''

  const images = [ImageUrl, ...previousImages].filter(Boolean) as string[]
  return {
    title: page?.meta?.title ?? page?.label ?? '',
    description: page?.meta?.description ?? '',
    openGraph: {
      images: images,
    },
  }
}
