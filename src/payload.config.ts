// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'

import { collections } from '@/collections'
import { plugins } from '@/plugins'
import { Footer } from '@/globals/footer/config'
import { Navbar } from '@/globals/navbar/config'
import { Posts } from '@/globals/posts/config'
import { Site } from '@/globals/site/config'
import { envPublic } from '@/lib/env'
import { emailFuture } from '@/futures/email'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL:envPublic.cmsUrl,
  collections: [...collections],
  globals: [Navbar, Footer, Posts, Site],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [...plugins],
  email: emailFuture
})
