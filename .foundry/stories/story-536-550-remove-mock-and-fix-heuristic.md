---
id: story-536-550-remove-mock-and-fix-heuristic
type: STORY
title: Remove isGen3Save mock and fix heuristic
status: READY
owner_persona: tech_lead
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
parent: epic-520-536-remove-gen3save-mock
---

# Remove isGen3Save mock and fix heuristic

## Context
The `isGen3Save` heuristic in `src/engine/saveParser/utils/detection.ts` currently has some flaws and throws errors (like `RangeError`), and it's being mocked out in `src/engine/saveParser/index.test.ts` which bypasses the real heuristic. This story will fix the heuristic and remove the mock in tests.

## Requirements
- Fix `isGen3Save` in `src/engine/saveParser/utils/detection.ts` so it correctly identifies Gen 3 saves and handles errors without relying on mocks.
- Remove the `isGen3Spy` mock in `src/engine/saveParser/index.test.ts`.
- Ensure tests still pass.

## Acceptance Criteria
- [ ] Break down into Tasks
