import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // No @vitejs/plugin-react needed for tests — esbuild handles the automatic JSX runtime.
  esbuild: { jsx: "automatic", jsxImportSource: "react" },
  resolve: {
    // Mirror the app's "~/*" -> "app/*" path alias so route and server modules resolve in tests.
    alias: { "~": fileURLToPath(new URL("./app", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    include: ["app/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
