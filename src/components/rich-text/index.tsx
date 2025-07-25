import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { jsxConverter } from '@/components/rich-text/converters'
import { cn } from '@/lib/utils'
import { hasText } from '@payloadcms/richtext-lexical/shared'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, ...rest } = props
  if (!hasText(rest.data)) return null
  return (
    <RichTextConverter
      {...rest}
      className={cn(['prose-violet prose prose-lg lg:prose-2xl dark:prose-invert', className])}
      converters={jsxConverter}
    />
  )
}
