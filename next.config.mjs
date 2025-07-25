import { withPayload } from '@payloadcms/next/withPayload'
const url = new URL(`${process.env.NEXT_PUBLIC_CMS_URL}/**`)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [url],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
