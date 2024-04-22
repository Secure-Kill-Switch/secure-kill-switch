import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: [
    "helpers/index.ts",
    "handlers/index.ts",
    "types/index.ts",
    "components/index.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  emitDeclarationOnly: true,
  external: ["react", "@opentelemetry/api"],
  ...options,
}));
