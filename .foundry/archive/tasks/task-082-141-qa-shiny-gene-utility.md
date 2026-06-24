---
id: task-082-141-qa-shiny-gene-utility
type: TASK
title: QA Shiny Gene Parsing and Evaluation
status: COMPLETED
owner_persona: qa
created_at: '2026-05-23'
updated_at: '2026-05-31'
depends_on: []jules_session_id: null
pr_number: null
parent: story-044-082-dv-shiny-gene-logic
tags:
  - feature
  - breeding
  - gen2
  - backend
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Shiny Gene Parsing and Evaluation

## Objective
Verify that the DVs are correctly parsed from the save file's binary data using `DataView` and that the `checkShinyGene` utility function correctly identifies DVs that meet the Gen 2 breeding mechanics for shiny inheritance.

## Verification Steps
1. Review `src/engine/saveParser/parsers/common.ts` to ensure `checkShinyGene` returns true for Defense DV = 10 and Special DV = 2 or 10.
2. Review DV decoding logic to ensure binary data extraction via `DataView` accurately unpacks the 16-bit DVs into constituent stats for evaluation.
3. Review `PokemonInstance` interface to ensure the optional `hasShinyGene?: boolean` property was added.
4. Review `src/engine/saveParser/parsers/common.test.ts` to ensure comprehensive unit tests cover `checkShinyGene` and proper decoding.
5. Run tests with `pnpm test` to ensure all tests pass.

## Acceptance Criteria
- [x] DVs are successfully decoded from `DataView` memory blocks.
- [x] `checkShinyGene` is correctly implemented according to Gen 2 mechanics.
- [x] Type definitions are updated correctly.
- [x] Unit tests are present and passing.

## Reminder for QA
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
