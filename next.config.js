/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://explorer-api.walletconnect.com"],
  },
  // experimental: {
  //   swcPlugins: [["@swc-jotai/react-refresh", {}]],
  // },
};

module.exports = nextConfig;
