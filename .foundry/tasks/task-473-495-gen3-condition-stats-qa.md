---
id: task-473-495-gen3-condition-stats-qa
type: TASK
title: QA Gen 3 Contest Condition Stats Extraction
status: PENDING
owner_persona: qa
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on:
  - task-473-494-gen3-condition-stats-parser
jules_session_id: null
locks: []
pr_number: null
parent: story-134-473-gen3-condition-stats-extraction-impl
tags:
  - gen3
  - save-engine
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Contest Condition Stats Extraction

## Objective
Verify that the Contest Condition stats extraction logic strictly adheres to architectural and schema guidelines.

## Technical Context
- The QA task must verify Section 13 compliance: no magic numbers, explicit constants, RangeError handling as per `.foundry/docs/schema.md`.
- It must also ensure the permutation logic correctly offsets into the EVs & Condition substructure and extracts the correct values for Cool, Beauty, Cute, Smart, Tough, and Feel.

## Acceptance Criteria
- [ ] Verify that the `DataView` API is used and `RangeError` is handled appropriately as defined in the schema.
- [ ] Verify that NO magic numbers are used in the parsing logic and module-level constants are strictly utilized.
- [ ] Verify that the permutation mapping logic correctly offsets the 'E' substructure.
