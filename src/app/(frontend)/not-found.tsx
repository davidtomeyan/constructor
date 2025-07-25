import Link from 'next/link'
import { Section, SectionContent } from '@/components/section'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <Section className="min-h-screen">
      <SectionContent className="flex flex-col  text-center">
        <div className="prose prose-lg flex flex-col items-center">
          <AlertTriangle className="size-16 text-warning" />
          <h2 className="font-bold text-warning">Page Not Found</h2>
          <p className=" text-muted-foreground max-w-lg">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable. Please check the address or return to the home page.
          </p>
        </div>
        <Button asChild className="px-8 mt-8">
          <Link href="/">Return to Home</Link>
        </Button>
      </SectionContent>
    </Section>
  )
}