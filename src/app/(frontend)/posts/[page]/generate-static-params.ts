import { getPosts } from '@/lib/services'
import * as z from 'zod/v4'

export async function generateStaticParams({ params }: { params: Promise<{ page: string }> }) {
  const page = (await params).page
  const safePage = z.coerce.number().default(1).safeParse(page).data ?? 1

  const res = await getPosts(safePage)

  return Array.from({ length: res?.totalPages ?? 0 }).map((_, index) => ({
    page: `${index + 1}`,
  }))
}
