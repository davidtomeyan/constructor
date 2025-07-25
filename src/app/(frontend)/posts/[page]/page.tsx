import { getPosts, getPostsPage } from '@/lib/services'
import * as z from 'zod/v4'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { RichText } from '@/components/rich-text'
import { generateStaticParams } from './generate-static-params'
import { notFound } from 'next/navigation'
import { generateMetadata } from '@/app/(frontend)/posts/[page]/generate-metadata'

export { generateStaticParams ,generateMetadata}
export const revalidate = 3600

export default async function PostsPage({ params }: { params: Promise<{ page: string }> }) {
  const page = (await params).page
  if (!page || isNaN(Number(page))) {
    notFound()
  }
  const safePage = z.coerce.number().default(1).safeParse(page).data ?? 1
  const res = await getPosts(safePage)
  const { content: data } = await getPostsPage()

  if (!res) return null

  return (
    <div className="pt-(--header-height) text-start">
      <div className="px-4 space-y-8 md:space-y-12 lg:space-y-16 md:px-8 lg:px-16 xl:px-24 py-8 md:py-14 xl:py-20 max-w-9xl min-w-0">
        {data && data.content && (
          <RichText
            className={cn([
              'mx-auto',
              data.isBordered && 'border',
              data.paddingX,
              data.maxWidth,
              data.paddingY,
              data.variant,
              data.spaceY && data.spaceY !== 'auto'
                ? cn('[&_*]:p-0 [&_*]:m-0', data.spaceY)
                : undefined,
            ])}
            data={data.content}
          />
        )}
        {res.docs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {res.docs.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post?.shortTitle}</CardTitle>
                </CardHeader>
                <CardContent className="grow">
                  <CardDescription>{post?.shortDescription}</CardDescription>
                </CardContent>
                <CardFooter>
                  <CardAction className="">
                    <Button asChild variant="outline" className="px-8!">
                      <Link
                        href={`/posts/post/${post.id}`}
                        aria-label={`Open post: ${post?.shortTitle}`}
                      >
                        {data.cardLinkLabel} <ArrowRight />
                      </Link>
                    </Button>
                  </CardAction>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <AlertTriangle className="w-16 h-16 text-warning" />
            <h2 className="text-3xl font-bold">No Posts Available</h2>
            <p className="text-muted-foreground max-w-md">
              It looks like there are no posts published yet. Please check back later or return to
              the home page.
            </p>
            <Button asChild className="mt-6 px-8">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={!res.hasPrevPage}
                className={cn([!res.hasPrevPage && 'pointer-events-none opacity-50'])}
                href={`${res.prevPage}`}
              />
            </PaginationItem>
            <span className="text-sm text-muted-foreground">
              Page {res.page} of {res.totalPages}
            </span>
            <PaginationItem>
              <PaginationNext
                aria-disabled={!res.hasNextPage}
                className={cn([!res.hasNextPage && 'pointer-events-none opacity-50'])}
                href={`${res.nextPage}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
