import { cn, getCMSLinkProps } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { ThemeSwitcher } from '@/components/theme-swicher'
import { PopoverContent, PopoverTrigger, PopoverAnchor } from '@/components/ui/popover'
import { Menu, X } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { HideScrollBody, MobileMenuClient } from './mobile-menu.client'
import { PopoverProvider } from './popover-provider'
import { getNavbar } from '@/globals/navbar/service'
import Image from 'next/image'
import { cva } from 'class-variance-authority'
import { CmsLinkList } from '@/components/cms-link/cms-link-list'
import { LinkWithActiveAttribute } from '@/components/link-with-active-attribute'

export async function Navbar({ className, ...props }: React.ComponentProps<'header'>) {
  const navbarData = await getNavbar()

  return (
    <PopoverProvider>
      <header
        className={cn([
          'h-(--header-height) flex justify-center fixed top-0 w-full z-50 pt-2 px-2',
          className,
        ])}
        {...props}
      >
        <PopoverAnchor className="absolute left-1/2 -translate-x-1/2 pointer-events-none bottom-0" />
        <div className="grow min-w-0 flex gap-4 justify-between items-center max-w-9xl px-4 shadow-sm py-1 backdrop-blur-lg bg-background/40 border rounded-full">
          <Logo />
          <div className="grow min-w-0 flex justify-center items-center">
            <NavigationMenu className="hidden lg:flex" viewport={false}>
              <NavigationMenuList>
                <LinksList />
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <CmsLinkList animated={false} links={navbarData.callToAction} />
          <PopoverTrigger className="lg:hidden group relative">
            <Menu className="opacity-0" />
            <Menu className="top-0 transition-[scale] absolute scale-100 group-data-[state=open]:scale-0" />
            <X className="top-0 transition-[scale] absolute scale-0 group-data-[state=open]:scale-100 " />
          </PopoverTrigger>
          <ThemeSwitcher className="hidden lg:flex" />
        </div>
      </header>
      <MobileNavigation />
    </PopoverProvider>
  )
}

async function LinksList() {
  const navbarData = await getNavbar()
  if (!navbarData?.links?.length) return null

  return (
    <>
      {navbarData.links.map(({ link }, index) => {
        const linkItemId = `nav-link-item-${index}`
        const cmsLinkProps = getCMSLinkProps(link)
        // console.log(cmsLinkProps)
        if (!cmsLinkProps) return null
        const { showBlocksInDropdown, blocks, label, isReference, href, newTabProps } = cmsLinkProps
        if (isReference && blocks.length > 0 && showBlocksInDropdown) {
          return (
            <NavigationMenuItem key={linkItemId}>
              <NavigationMenuTrigger className="bg-transparent">
                <LinkWithActiveAttribute className="font-semibold" {...newTabProps} href={href}>
                  {label}
                </LinkWithActiveAttribute>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="!bg-background/90 backdrop-blur relative">
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  {blocks?.map((block, index) => {
                    return (
                      <li key={`sub-link-item-${index}`} className="row-span-3">
                        <NavigationMenuLink className="font-semibold" asChild>
                          <Link href={`${href}#${block.slug}`}>{block.label}</Link>
                        </NavigationMenuLink>
                      </li>
                    )
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        } else {
          return (
            <li key={linkItemId}>
              <LinkWithActiveAttribute
                className={cn([
                  navigationMenuLinkStyle(),
                  'focus:bg-none font-semibold data-[state=open]:focus:bg-none',
                ])}
                href={href}
              >
                {label}
              </LinkWithActiveAttribute>
            </li>
          )
        }
      })}
    </>
  )
}

async function MobileNavigation() {
  const navbarData = await getNavbar()

  return (
    <PopoverContent
      className={cn([
        'h-[calc(var(--radix-popper-available-height)---spacing(4))] w-[calc(var(--radix-popper-available-width)---spacing(6))]',
        'origin-(--radix-popover-content-transform-origin)',
        'z-50 flex min-h-0 flex-col lg:hidden outline-hidden backdrop-blur-lg bg-background/80 no-scrollbar overflow-y-auto rounded-3xl p-0 shadow-none duration-100',
      ])}
      sideOffset={8}
      alignOffset={0}
      side={'top'}
      align={'center'}
    >
      <div className="flex min-h-0 max-h-full h-full w-full flex-col py-8 px-4">
        <div className="min-h-0 flex w-full flex-1 overflow-hidden">

            <ScrollArea className="flex-1">
              <HideScrollBody/>
              {navbarData.links && <MobileMenuClient data={navbarData.links} />}
              <ScrollBar />
            </ScrollArea>
        </div>
        <div className="grid gap-4">
          <ThemeSwitcher />
        </div>
      </div>
    </PopoverContent>
  )
}

async function Logo() {
  const navbarData = await getNavbar()
  if (typeof navbarData.logoBase !== 'object' || typeof navbarData.logoDark !== 'object')
    return null
  const logoUrl = navbarData.logoBase?.url || navbarData.logoDark?.url || undefined

  if (!logoUrl) return null
  return (
    <Link className="h-full flex items-center py-0.5 ms-1 min-w-0" href="/">
      <Image
        className="inline-block dark:hidden max-h-full max-w-fit object-contain"
        sizes="auto"
        loading="eager"
        quality={100}
        width={navbarData.logoBase?.width ?? 200}
        height={navbarData.logoBase?.height ?? 70}
        src={logoUrl}
        alt={navbarData.logoBase?.alt ?? ''}
      />
      <Image
        className="hidden dark:inline-block max-h-full max-w-fit object-contain"
        sizes="auto"
        loading="eager"
        quality={100}
        width={navbarData.logoDark?.width ?? navbarData.logoBase?.width ?? 200}
        height={navbarData.logoBase?.height ?? navbarData.logoDark?.height ?? 70}
        src={navbarData.logoDark?.url ?? logoUrl}
        alt={navbarData.logoDark?.alt ?? navbarData.logoBase?.alt ?? ''}
      />
    </Link>
  )
}

const navigationMenuLinkStyle = cva(
  'inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
)
