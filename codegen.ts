import type { CodegenConfig } from "@graphql-codegen/cli";

// Types are generated from the backend's exported SDL (a sibling repo).
// Regenerate with `bun run codegen` after changing a .graphql operation.
const config: CodegenConfig = {
  schema: "../colette-exercise-api/priv/schema.graphql",
  documents: ["app/**/*.graphql"],
  config: { scalars: { DateTime: "string" }, useTypeImports: true },
  generates: {
    "app/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
    },
  },
};

export default config;
