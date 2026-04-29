---
id: "task-016-056-fix-heartbeat-test-types"
type: "TASK"
title: "Fix strict type errors in foundry-heartbeat.test.ts"
status: "READY"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-010-016-enable-expensive-oxlint-checks.md"
---

# Fix strict type errors in foundry-heartbeat.test.ts

## Context
When enabling `oxlint`'s `--type-check` and `--type-aware` options, numerous type errors surfaced in `.github/scripts/foundry-heartbeat.test.ts`. This was mainly due to how `globalFetch` is mocked using Vitest, where the mock responses (raw JS objects) do not strictly conform to the `Response` interface, and the mock implementation signatures don't perfectly align with the `fetch` API.

To unblock the `oxlint` type-aware rollout, a `// @ts-nocheck` directive was temporarily added to `.github/scripts/foundry-heartbeat.test.ts`.

## Instructions
1. Remove `// @ts-nocheck` from `.github/scripts/foundry-heartbeat.test.ts`.
2. Properly type the mocks for `globalFetch.mockResolvedValue` and `globalFetch.mockImplementation`, using type assertions where appropriate (e.g. `as unknown as Response`), or using granular `// @ts-expect-error` comments.
3. Ensure the test file passes the type-checking stage of `oxlint`.
