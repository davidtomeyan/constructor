'use client'


import { useRowLabel } from '@payloadcms/ui'

export const ArrayRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ field?: string }>()

  const customLabel = data?.field ? data.field : `Field ${String(rowNumber).padStart(2, '0')}`

  return <div>{customLabel}</div>
}