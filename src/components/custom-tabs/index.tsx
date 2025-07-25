'use client'

import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  ComponentProps,
} from 'react'
import { Button } from '@/components/ui/button'

type TabsContextType = {
  activeTab: string | undefined
  setActiveTab: Dispatch<SetStateAction<string | undefined>>
}
const TabsContext = createContext<TabsContextType | undefined>(undefined)

export function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider')
  }
  return context
}

export function TabsProvider({
  children,
  defaultActiveTab,
}: {
  children: ReactNode
  defaultActiveTab?: string
}) {
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultActiveTab)
  return <TabsContext value={{ activeTab, setActiveTab }}>{children}</TabsContext>
}

export function TabTrigger({
  tabValue,
  children,
  onClick,
  ...props
}: { tabValue: string } & ComponentProps<typeof Button>) {
  const { setActiveTab, activeTab } = useTabs()
  return (
    <Button
      {...props}
      data-active={activeTab === tabValue}
      onClick={(event) => {
        onClick?.(event)
        setActiveTab(tabValue)
      }}
    ></Button>
  )
}
