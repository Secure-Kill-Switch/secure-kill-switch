/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: [],
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/form",
    ],
  },
};
