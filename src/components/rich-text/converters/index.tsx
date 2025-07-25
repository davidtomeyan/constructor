import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { headingConverter } from './headingConverter'
import { paragraphConverter } from './paragraphConverter'
import { textConverter } from '@/components/rich-text/converters/textConvertor'
import { listConverter } from '@/components/rich-text/converters/listConvertor'
import { linkJSXConverter } from '@/components/rich-text/converters/link'
import { linebreakJSXConverter } from '@/components/rich-text/converters/linebreak'
import { horizontalRuleJSXConverter } from '@/components/rich-text/converters/horizontalRule'
import { internalDocToHref } from '@/components/rich-text/converters/internal-doc-to-href'
import { blocksJSXConverter } from '@/components/rich-text/converters/media-block'

type NodeTypes = DefaultNodeTypes


export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...headingConverter,
  ...paragraphConverter,
  ...textConverter,
  ...listConverter,
  ...linebreakJSXConverter,
  ...horizontalRuleJSXConverter,
  ...linkJSXConverter({internalDocToHref}),
  ...blocksJSXConverter
})
