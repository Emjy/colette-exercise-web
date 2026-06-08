# Colette exercise — docs (frontend)

The conventions for this take-home. **Match them exactly — they override default habits.**
You build **one** feature end to end (backend + frontend); your task is under
[`tasks/`](tasks/).

- [`API.md`](API.md) — frontend conventions: typed GraphQL operations through the generated
  SDK in route `loader`s/`action`s, pending/error states, component reuse, the
  `bun run check` gate.
- [`DOMAIN.md`](DOMAIN.md) — the shared data model (it describes the backend; included here
  for context).
- [`tasks/`](tasks/) — `waiting-list.md`, the feature to build.

## Repo layout

This is the **frontend** repo (`colette-exercise-web`). Frontend paths in these docs —
`app/…` and `~/…` imports — are in **this** repo. Backend code paths (`lib/…`, `priv/…`,
`config/…`, `test/…`) and the backend docs (`ENGINEERING_GUIDE.md`, `GRAPHQL.md`) live in
the sibling **`../colette-exercise-api`** repo.

## Quality gate

This project uses **Bun** — use `bun`, not `npm`.

```bash
bun run codegen   # regenerate app/generated/graphql.ts first (check does NOT run codegen)
bun run check     # biome check . && react-router typegen && tsc && vitest run
```

The backend has its own gate (`make check`, in `../colette-exercise-api`). Both must be
green before you submit.
