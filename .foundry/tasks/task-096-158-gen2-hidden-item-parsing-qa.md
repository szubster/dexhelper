---
id: task-096-158-gen2-hidden-item-parsing-qa
type: TASK
title: Gen 2 Hidden Item Event Flags Parsing QA
status: ACTIVE
owner_persona: qa
created_at: '2026-06-10'
updated_at: '2026-06-13'
depends_on:
  - task-096-157-gen2-hidden-item-parsing-impl
jules_session_id: '18050449299085592293'
pr_number: null
parent: story-058-096-gen2-hidden-item-parsing
tags:
  - gen2
  - save-parsing
  - feature
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Hidden Item Event Flags Parsing QA

## Context
The Coder has implemented the Gen 2 hidden item event flags parsing logic as specified in `task-096-157-gen2-hidden-item-parsing-impl`.

## QA Requirements
1. **Verify `SaveData` Interface**: Confirm that `hiddenItemFlags?: Uint8Array;` exists in `src/engine/saveParser/parsers/common.ts`.
2. **Verify Extraction Logic**: Ensure `src/engine/saveParser/parsers/gen2.ts` correctly extracts the 256-byte `wEventFlags` block from offset `0x2600` (Crystal) or `0x2624` (Gold/Silver). Ensure `view.byteOffset` is handled safely.
3. **Run Unit Tests**: Run `pnpm exec vitest run src/engine/saveParser/parsers/gen2.test.ts` to ensure all tests pass.
4. **Code Review**: Ensure there are no type errors or linting issues introduced.

## Acceptance Criteria
- [x] `SaveData` interface correctly includes `hiddenItemFlags`.
- [x] `parseGen2` extracts `hiddenItemFlags` using the correct Gen 2 offsets safely.
- [x] Unit tests pass successfully.

## IMPORTANT REMINDERS
- **If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.**
- **If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.**
