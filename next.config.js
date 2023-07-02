/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  transpilePackages: ['@package/bug'],
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"]
  },
  webpack: (config, { webpack }) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.externals["node:fs"] = "commonjs node:fs";
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    };

    // Merge the aliases
    Object.assign(config.resolve.alias, {
      '@mongodb-js/zstd': false,
      '@aws-sdk/credential-providers': false,
      'snappy': false,
      'aws4': false,
      'mongodb-client-encryption': false,
      'kerberos': false,
      'supports-color': false
    });

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^node:/,
        (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        },
      ),
    );

    return config;
  },
  reactStrictMode: process.env.NODE_ENV === "development" ? false : true,
}

module.exports = nextConfig;
