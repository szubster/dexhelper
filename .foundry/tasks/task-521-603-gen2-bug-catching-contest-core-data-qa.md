---
id: task-521-603-gen2-bug-catching-contest-core-data-qa
type: TASK
title: Gen 2 Bug-Catching Contest Core Data QA
status: PENDING
owner_persona: qa
created_at: '2026-09-19'
updated_at: '2026-09-21'
depends_on:
  - task-521-602-gen2-bug-catching-contest-core-data-impl
jules_session_id: null
pr_number: null
parent: story-512-521-gen2-bug-catching-contest-core-data
tags:
  - gen2
  - backend
  - save-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Bug-Catching Contest Core Data QA

## Description
Verify the parsing of the Gen 2 save state to extract the basic data of the currently caught Bug-Catching Contest Pokémon, including its Species ID, Level, Current HP, and Max HP.

## Context
This task verifies that the implementation correctly extracts the data and that the tests are thorough.

## Acceptance Criteria
- [ ] Verify the constants/offsets match the schema documentation.
- [ ] Verify the unit tests accurately cover both success and edge cases (e.g., empty buffer).
- [ ] Verify the implementation follows the schema guidelines (e.g., catching RangeError).

## Execution Blueprint
1. Review the changes to ensure compliance with Section 13 of `.foundry/docs/schema.md`.
2. Run unit tests (`pnpm test`) to ensure they pass.
3. Review code for magic numbers and ensure offsets are correctly handled.
