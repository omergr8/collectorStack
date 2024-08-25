/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Add SVGR configuration
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["66.135.31.135"], // Add the external domain here
  },
  output: "export",
  images: {
    unoptimized: true, // Disable image optimization
  },
};

export default nextConfig;
