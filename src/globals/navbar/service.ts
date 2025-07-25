import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

export const getNavbar = cache(async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.findGlobal({
    slug: 'navbar',
  })
  return result || null
})