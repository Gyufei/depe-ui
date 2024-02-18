/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.depe.app",
      },
      {
        protocol: "https",
        hostname: "explorer-api.walletconnect.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // experimental: {
  //   swcPlugins: [["@swc-jotai/react-refresh", {}]],
  // },
};

module.exports = nextConfig;
