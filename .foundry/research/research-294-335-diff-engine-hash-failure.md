---
id: research-294-335-diff-engine-hash-failure
type: RESEARCH
title: Investigate Diff Engine Hash Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-07-20'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: '5413365205932644365'
pr_number: null
parent: story-137-294-diff-engine-logic
tags:
  - diff
  - bug
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Diff Engine Hash Failure

## Objective
Investigate the root cause of the permanent failure of `task-294-316-diff-engine-impl` and `task-294-317-diff-engine-qa`.

## Context
The QA journal recorded a failure on 2026-07-15 for `task-294-316-diff-engine-impl`. The reason cited was:
"The developer implemented `calculateBoxDiff` with a fallback hash generator instead of strictly relying on the `hash` property on `PokemonInstance` as required by the contract. Furthermore, the `hash` property does not even exist on the `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts`. This demonstrates a failure to update the underlying interface to match the technical requirements."

## Acceptance Criteria
- [x] Investigate why the `hash` property is missing from `PokemonInstance`.
- [x] Determine the exact required updates to `src/engine/saveParser/parsers/common.ts` to add the `hash` property correctly.
- [x] Provide clear recommendations for updating `calculateBoxDiff` in `src/engine/saveParser/utils/boxDiff.ts` to use this new `hash` property exclusively.

## Findings
- **Missing `hash` property**: The `hash` property is missing from `PokemonInstance` in `src/engine/saveParser/parsers/common.ts` because it was never defined on the interface, even though downstream code like `calculateBoxDiff` in `src/engine/saveParser/utils/boxDiff.ts` attempts to use it.
- **Required updates to `common.ts`**: The `PokemonInstance` interface needs to be updated to include an optional (or required) `hash` property of type `string`. This property should serve as a unique identifier for each Pokemon instance to facilitate accurate diffing between save states.
- **Recommendations for `calculateBoxDiff`**: The `calculateBoxDiff` function should be updated to enforce strict reliance on the `hash` property provided by `PokemonInstance`. The fallback hash generation logic inside `calculateBoxDiff` should be removed or made secondary, ensuring that the primary source of truth for identity is the `hash` property defined by the parsers. This aligns with the contractual requirements mentioned in the failure context.
