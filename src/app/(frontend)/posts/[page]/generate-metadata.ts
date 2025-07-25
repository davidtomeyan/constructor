import { getPostsPage } from '@/lib/services'
import type { Metadata, ResolvingMetadata } from 'next'
import { envPublic } from '@/lib/env'
import * as z from 'zod/v4'

type Props = {
  params: Promise<{ page: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const page = (await params).page
  const safePage = z.coerce.number().default(1).safeParse(page).data ?? 1

  const { meta } = await getPostsPage()

  const previousImages = (await parent).openGraph?.images || []
  const ImageUrl =
    typeof meta?.image === 'object' && meta?.image?.sizes?.og?.filename
      ? `${envPublic.cmsUrl}/media/${meta?.image?.sizes?.og?.filename}`
      : ''

  const images = [ImageUrl, ...previousImages].filter(Boolean) as string[]
  return {
    title: `${meta?.title ?? ''} - page: ${safePage}`,
    description: meta?.description ?? '',
    openGraph: {
      images: images,
    },
  }
}
