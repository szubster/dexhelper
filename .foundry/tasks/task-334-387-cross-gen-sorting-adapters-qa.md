---
id: task-334-387-cross-gen-sorting-adapters-qa
type: TASK
title: QA Cross-Generation Sorting Adapters
status: ACTIVE
owner_persona: qa
created_at: '2026-08-02'
updated_at: '2026-08-03'
depends_on:
  - task-334-386-cross-gen-sorting-adapters-impl
jules_session_id: '15284529042228902330'
pr_number: null
parent: story-136-334-sorting-cross-gen-considerations-retry
tags:
  - feature
  - gen1
  - gen2
  - gen3
  - sorting
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Cross-Generation Sorting Adapters

## Context
The coder has implemented cross-generation sorting adapters to handle Regional Dex mappings, Gen 1 type differences, and missing properties in older generations. This QA task ensures these implementations are robust and thoroughly tested.

## Acceptance Criteria
- [x] Verify `DexNumberSorter` in `src/engine/sorting/StandardSorters.ts` correctly handles specific regional dex mappings for Gen 1, Gen 2, and Gen 3.
- [x] Verify `TypeSorter` correctly handles Gen 1 type differences (e.g., Magnemite missing Steel type) without breaking modern sorting.
- [x] Verify that edge cases with null/undefined properties across older generations are handled gracefully in all standard sorters.
- [x] Run `pnpm test` and verify that the unit tests in `src/engine/sorting/StandardSorters.test.ts` pass and accurately cover the cross-generation considerations.
- [x] Ensure `pnpm lint` passes with no warnings or errors related to the new implementations.
