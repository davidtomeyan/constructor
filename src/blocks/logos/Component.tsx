import NextImage from 'next/image'
import NextLink from 'next/link'
import { Marquee } from '@/components/magicui/marquee'
import { LogoBlock } from '@/payload-types'

export function Logos({ data }: { data?: LogoBlock }) {
  if (!data || !data?.length) return null

  return (
    <div className="relative min-w-0 max-w-full overflow-hidden">
      <Marquee repeat={10} pauseOnHover className="[--duration:20s]">
        {data.map((logo, index) => {
          if (typeof logo.image !== 'object' || !logo.image.url) return null
          return (
            <div key={index} className="relative flex-none px-4 overflow-hidden">
              {logo.url ? (
                <NextLink href={logo.url}>
                  <NextImage
                    src={logo.image.url!}
                    alt={logo.image.alt}
                    width={logo.image.width!}
                    height={logo.image.height!}
                    className="h-12 w-fit object-contain"
                  />
                </NextLink>
              ) : (
                <NextImage
                  src={logo.image.url}
                  alt={logo.image.alt}
                  width={logo.image.width!}
                  height={logo.image.height!}
                  className="h-12 w-fit object-contain"
                />
              )}
            </div>
          )
        })}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/7 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/7 bg-gradient-to-l from-background"></div>
    </div>
  )
}
