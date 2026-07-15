---
id: task-291-315-gen3-roamer-core-extraction-qa
type: TASK
title: Gen 3 Roamer Core Extraction QA
status: ACTIVE
owner_persona: qa
created_at: '2026-07-11'
updated_at: '2026-07-15'
depends_on:
  - task-291-314-gen3-roamer-core-extraction-impl
jules_session_id: '8694432224905365922'
pr_number: null
parent: story-149-291-gen3-roamer-core-extraction
tags:
  - gen3
  - roamer
  - qa
research_references:
  - .foundry/docs/knowledge_base/gen3_roamer_offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Core Extraction QA

## Objective
Verify the implementation of the Gen 3 Roamer Core Extraction logic in `src/engine/saveParser/parsers/gen3.ts`.

## Description
Ensure that the `coder` correctly implemented the `parseGen3Roamer` function to extract the full Roamer data block, complying with the `Gen3RoamerState` interface.

Verify that the returned object contains `isActive`, `speciesId`, `level`, `hp`, `status`, `personality`, `ivs` (as a 32-bit number), `cool`, `beauty`, `cute`, `smart`, and `tough`.

Check that the new offsets are defined as module-level constants and that no inline magic numbers were used for memory offsets. Ensure `pnpm test` passes and `src/engine/saveParser/parsers/gen3.test.ts` was correctly updated to test the new schema.

**CRITICAL REMINDERS FOR QA:**
1. **Rejections:** If you reject an implementation, you MUST update the TARGET task's YAML frontmatter (`status: FAILED`, increment `rejection_count`, add `rejection_reason`) and uncheck its Acceptance Criteria. DO NOT modify your own QA task's YAML.
2. **Orphaned Node Policy:** If a parent implementation task is permanently cancelled, do not modify the YAML frontmatter of your QA task. Instead, append a cancellation notice to your markdown body and check it off in the parent Story's Acceptance Criteria.
3. **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify `parseGen3Roamer` correctly implements the `Gen3RoamerState` structure.
- [x] Verify all new memory offsets (cool, beauty, cute, smart, tough) are defined as reusable constants at the module level (no inline magic numbers).
- [x] Verify the returned object keys exactly match `Gen3RoamerState` (`isActive`, `personality`, `status`, `ivs` as a number, plus the contest stats).
- [x] Verify `src/engine/saveParser/parsers/gen3.test.ts` is updated and tests pass.
