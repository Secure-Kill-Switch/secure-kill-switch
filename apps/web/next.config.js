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
  headers: async () => {
    return [
      {
        source: "/ping/:clientid*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};
