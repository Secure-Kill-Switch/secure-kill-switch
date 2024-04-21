/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: [],
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/dates",
      "@mantine/form",
      "@mantine/hooks",
      "@mantine/notifications",
      "@tabler/icons-react",
    ],
  },
};
