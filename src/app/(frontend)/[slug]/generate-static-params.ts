import { getAllPages } from '@/lib/services'

export async function generateStaticParams() {
  const pages = await getAllPages()
  return pages?.docs
    .map(({ slug }) => ({
      slug,
    }))
    .filter(({ slug }) => slug !== 'home')
}