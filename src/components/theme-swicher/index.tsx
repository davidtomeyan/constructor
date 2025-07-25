'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { Moon, Sun, MonitorCog } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useIsHydrated } from '@/hooks/use-is-hydrated'
import { Spinner } from '@/components/ui/spinner'
import { JSX, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-is-mobile'

const themes = ['dark', 'light', 'system'] as const

type TTheme = (typeof themes)[number]

const themeIcons: Record<TTheme, JSX.Element> = {
  dark: <Moon />,
  light: <Sun />,
  system: <MonitorCog />,
}

export function ThemeSwitcher({ className }: { className?: string }) {
  const hydrated = useIsHydrated()
  const { setTheme, theme } = useTheme()

  const isMobile = useIsMobile()

  const handleThemeChange = useCallback(
    (theme: TTheme) => () => {
      setTheme(theme)
    },
    [setTheme],
  )

  const activeTheme = themes.includes(theme as TTheme) ? (theme as TTheme) : 'system'
  const activeIcon = themeIcons[activeTheme]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={!hydrated} asChild>
        <Button
          className={cn([
            "capitalize lg:size-8 lg:rounded-full lg:[&_svg:not([class*='size-'])]:size-4",
            className,
          ])}
          variant="outline"
          size="sm"
        >
          {!hydrated ? <Spinner /> : activeIcon}
          {hydrated  && <span className="inline-block lg:hidden">{activeTheme}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) rounded-lg"
        side={isMobile ? 'top' : 'bottom'}
        align={isMobile ? 'start' : 'end'}
      >
        {themes.map((theme) => (
          <DropdownMenuItem
            className={cn([
              "capitalize",
              activeTheme === theme ? 'bg-accent text-accent-foreground' : ''
            ])}
            onClick={handleThemeChange(theme)}
            key={theme}
          >
            {themeIcons[theme]} {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
