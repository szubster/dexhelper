---
id: task-288-305-gen3-mix-record-inherited-events-qa
type: TASK
title: QA Gen 3 Mix Record Inherited Events Extraction
status: ACTIVE
owner_persona: qa
created_at: '2026-07-06'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: '4835345170691585571'
pr_number: null
parent: story-081-288-gen3-mix-record-inherited-events
tags:
  - feature
  - gen3
  - data-parsing
  - qa
research_references:
  - .foundry/docs/knowledge_base/gen3_tv_shows_and_events.md
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Blueprint: QA Gen 3 Mix Record Inherited Events Extraction

## Objective
Verify the implementation for extracting inherited event data (TV Shows) originating from other players' save files via the "Mix Record" feature in Gen 3 games.

## Context
The coder has implemented logic to parse the `TVShow` array in `SaveBlock1` at offset `0x27CC` to extract inherited events (`kind` IDs 21-40).

## Requirements

1. **Verify Implementation Logic:**
   - Confirm that the coder explicitly used reusable module-level constants for the `TVShow` array offset (`0x27CC`), array length (`25`), struct size (`36`), and any bit logic. Inline magic numbers for offsets or loop bounds are strictly forbidden per the blueprint contract.
   - Verify that the parsing logic correctly identifies active Mix Record shows (`kind` between 21 and 40, `active` byte is truthy).

2. **Verify Tests:**
   - Ensure the coder has written tests for this feature that validate correctness and edge cases (e.g., verifying parsing handles normal shows vs mix record shows correctly, handles inactive shows properly).

3. **Handling Failures:**
   - If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
   - If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
   - If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Code is reviewed for correctness in parsing `TVShow` structs.
- [ ] Magic numbers are not used for bounding loops or defining offsets.
- [ ] Tests comprehensively cover the new functionality.
