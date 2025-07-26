import React, { cache } from 'react'
import './globals.css'
import { ThemeProvider } from '@/components/app-providers/theme-provider'
import { getPageBySlug } from '@/lib/services'
import { Footer } from '@/globals/footer/Component'
import { Navbar } from '@/globals/navbar/Component'
import type { Viewport, Metadata } from 'next'
import { envPublic } from '@/lib/env'
import config from '@payload-config'
import { getPayload } from 'payload'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { CookieConsentBanner, CookieScripts } from '@/components/cookie-consent-banner'
import { RichText } from '@/components/rich-text'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    {
      media: '(prefers-color-scheme: dark)',
      color: '#020617',
    },
    {
      media: '(prefers-color-scheme: light)',
      color: '#f8fafc',
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const verification: Metadata['verification'] = {}
  const icons: Metadata['icons'] = {}
  const result = await getSiteConfigs()
  if (result.googleVerificationCode) {
    verification.google = result.googleVerificationCode
  }
  if (result.favicon && typeof result.favicon === 'object' && result.favicon.filename) {
    icons.icon = { url: `${envPublic.cmsUrl}/media/${result.favicon?.filename}` }
  }
  const page = await getPageBySlug('home')
  const ImageUrl =
    typeof page?.meta?.image === 'object' && page?.meta?.image?.sizes?.og?.filename
      ? `/media/${page?.meta?.image?.sizes?.og?.filename}`
      : ''

  return {
    metadataBase: new URL(envPublic.cmsUrl),
    title: page?.meta?.title ?? page?.label ?? '',
    description: page?.meta?.description ?? '',
    openGraph: {
      images: [ImageUrl],
    },
    icons: icons,
    verification,
  }
}

export const revalidate = 36000

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const {
    cookieConsentBannerEnabled,
    cookieConsentBannerContent,
    rejectButtonLabel,
    acceptButtonLabel,
    googleTagManagerId,
    googleAnalyticsID
  } = await getSiteConfigs()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={'flex flex-col min-h-screen [--header-height:calc(--spacing(17))]'}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        {cookieConsentBannerEnabled && (
          <CookieConsentBanner
            rejectButtonLabel={rejectButtonLabel}
            acceptButtonLabel={acceptButtonLabel}
          >
            {cookieConsentBannerContent && (
              <RichText className="prose-base! max-w-full" data={cookieConsentBannerContent} />
            )}
          </CookieConsentBanner>
        )}
      </body>
      <CookieScripts
        cookieConsentBannerEnabled={cookieConsentBannerEnabled}
        googleTagManagerId={googleTagManagerId}
        googleAnalyticsID={googleAnalyticsID}
      />
    </html>
  )
}

const getSiteConfigs = cache(async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.findGlobal({
    depth: 2,
    slug: 'site',
  })
  return result
})
