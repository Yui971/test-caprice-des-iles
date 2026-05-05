/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? '/test-caprice-des-iles' : '',
  assetPrefix: isProd ? '/test-caprice-des-iles/' : '',
};

module.exports = nextConfig;
