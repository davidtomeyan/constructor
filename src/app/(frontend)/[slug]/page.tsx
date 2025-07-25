import React from 'react'
import { getPageBySlug } from '@/lib/services'
import BlockRenderer from '@/components/block-renderer'
import { notFound } from 'next/navigation'
import { generateStaticParams } from './generate-static-params'
import { generateMetadata } from './generate-metadata'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RefreshButtonClient } from '@/app/(frontend)/[slug]/refresh-button.clinet'
import { revalidatePath } from 'next/cache'

export { generateStaticParams, generateMetadata }

export const revalidate = 3600
export default async function AllPages({ params }: { params: Promise<{ slug: string }> }) {
  async function revalidate() {
    "use server"
    revalidatePath("/","layout")
  }

  const { slug } = await params
  const data = await getPageBySlug(slug)
  if (slug && !data) notFound()

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {data ? (
        <BlockRenderer blocks={data.layout?.blocks} />
      ) : (
        <div className="flex h-screen flex-col items-center justify-center py-20 text-center space-y-6">
          <AlertTriangle className="w-16 h-16 text-warning" />
          <h2 className="text-3xl font-bold">Welcome, but no content yet</h2>
          <p className="text-muted-foreground max-w-md">
            The homepage has been created but currently contains no content.
            Please check back later, reload the page, or explore other sections.
          </p>
          <div className="flex gap-4 mt-6">
            <RefreshButtonClient action={revalidate}/>
          </div>
        </div>
      )}
    </div>
  )
}
