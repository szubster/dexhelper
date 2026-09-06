---
id: task-497-524-gen3-mystery-gift-parser-tests
type: TASK
title: Unit Tests for Gen 3 Mystery Gift Data Parser
status: PENDING
owner_persona: coder
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on:
  - task-497-523-gen3-mystery-gift-parser
jules_session_id: null
pr_number: null
parent: story-405-497-gen3-e-reader-dashboard-state
tags:
  - gen3
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Unit Tests for Gen 3 Mystery Gift Data Parser

## Objective
Write comprehensive unit tests for the Gen 3 Mystery Gift data parser.

## Scope
1. Write unit tests (e.g. in `src/engine/saveParser/gen3/mysteryGift/parser.test.ts` or similar) targeting the logic implemented in the prerequisite task.
2. Test both Emerald/Ruby/Sapphire and FireRed/LeafGreen offset logic.
3. Verify that both "Item Received" and "Enable Ship" flags are correctly parsed from mocked `DataView` buffers.

## Constraints
- Do not implement core parsing logic here.

## Acceptance Criteria
- [ ] Tests execute and pass.
- [ ] Edge cases (like Old Sea Map being Emerald exclusive) are verified.
