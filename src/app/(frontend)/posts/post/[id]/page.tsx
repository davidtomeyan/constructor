import { getPostById } from '@/lib/services'
import { notFound } from 'next/navigation'
import { Post } from '@/payload-types'
import { RichText } from '@/components/rich-text'
import { Section, SectionContent } from '@/components/section'
import { generateMetadata } from './generate-metadata'

export function generateStaticParams() {
  return []
}
export { generateMetadata }

export default async function PostPage({ params }: { params: Promise<{ id: number | string }> }) {
  const postId = (await params).id
  let post: Post
  try {
    post = await getPostById(postId)
  } catch (error) {
    console.warn(error)
    notFound()
  }

  return (
    <Section>
      <SectionContent className="text-start max-w-5xl">
        <RichText className="prose-base! max-w-full w-full" data={post.content.content} />
      </SectionContent>
    </Section>
  )
}
