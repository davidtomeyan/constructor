import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { IAccordionBlock } from '@/payload-types'
import { RichText } from '@/components/rich-text'
import { cn } from '@/lib/utils'

export function AccordionBlock({
  maxWidth,
  isBordered,
  paddingX,
  paddingY,
  backgroundVariant,
  items,
}: IAccordionBlock) {
  if (!items?.length) return null
  return (
    <div className="w-full flex justify-center text-start">
      <div
        className={cn([
          'grow rounded-base',
          paddingX,
          paddingY,
          maxWidth,
          isBordered && 'border shadow-xs',
          backgroundVariant,
        ])}
      >
        <Accordion type="single" collapsible className={"w-full"}>
          {items.map((item, index) => {
            const key = `item-${index}`
            return (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className="text-lg">{item.title}</AccordionTrigger>
                {item.content && (
                  <AccordionContent>
                    {
                      <RichText
                        className={cn(['prose-sm lg:prose-sm max-w-full'])}
                        data={item.content}
                      />
                    }
                  </AccordionContent>
                )}
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
