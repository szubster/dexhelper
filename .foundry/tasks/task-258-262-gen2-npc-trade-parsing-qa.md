---
id: task-258-262-gen2-npc-trade-parsing-qa
type: TASK
title: QA Gen 2 NPC Trade Extraction
status: ACTIVE
owner_persona: qa
created_at: '2026-07-04'
updated_at: '2026-07-05'
depends_on:
  - task-258-261-gen2-npc-trade-parsing-impl
jules_session_id: '7600040783913859597'
pr_number: null
parent: story-119-258-gen2-npc-trade-parsing
tags:
  - backend
  - save-parsing
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 NPC Trade Extraction

## Context
The `coder` has implemented parsing logic to extract Gen 2 NPC trade flags from save files.

## Acceptance Criteria
- [x] Verify unit tests have been added/updated in `src/engine/saveParser/parsers/gen2.test.ts`.
- [x] Ensure tests cover both Gold/Silver and Crystal offsets.
- [x] Ensure the tests assert correct extraction of the 7 bitwise flags into a boolean array.
- [x] Run the tests (`npx vitest run src/engine/saveParser/parsers/gen2.test.ts`) and ensure they pass.
- [x] If transient failures require retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- [x] If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- [x] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
