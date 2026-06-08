# Colette Exercise — Web

The front-end for the Colette activities exercise: a React Router 7 (framework mode)
app, styled with Tailwind CSS v4, talking to the GraphQL API in `../colette-exercise-api`.

**This project uses [Bun](https://bun.sh) as its package manager and runner.** Use `bun`,
not `npm`.

## Prerequisites

- [Bun](https://bun.sh) `1.3+`
- The API running and reachable (see `../colette-exercise-api`)

## Quick start

```bash
bun install
bun run dev          # http://localhost:5173
```

## Key commands

```bash
bun run dev          # dev server (HMR)
bun run codegen      # regenerate app/generated/graphql.ts from the API SDL
bun run check        # lint (Biome) + typecheck + tests — must be green
bun run build        # production build
```

## Docs

The conventions you're graded on, the shared data model, and your task live in
[`docs/`](docs/) — **read [`docs/README.md`](docs/README.md) first.** The backend lives in
the sibling `../colette-exercise-api` repo.

## Notes

- GraphQL types are generated from the API's exported SDL
  (`../colette-exercise-api/priv/schema.graphql`). After changing a `.graphql`
  operation **or** the API schema, run `bun run codegen`.
- Sign in on the home page by pasting a seeded user id (the bearer token for this
  exercise).
