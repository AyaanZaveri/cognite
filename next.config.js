/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
  webpack: (config, { webpack }) => {
    config.externals["node:fs"] = "commonjs node:fs";
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };

    return config;
  },
};

module.exports = nextConfig;
