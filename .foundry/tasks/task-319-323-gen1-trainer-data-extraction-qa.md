---
id: task-319-323-gen1-trainer-data-extraction-qa
type: TASK
title: Gen 1 Trainer Data Extraction QA
status: ACTIVE
owner_persona: qa
created_at: '2026-07-14'
updated_at: '2026-07-31'
depends_on:
  - task-319-322-gen1-trainer-data-extraction-impl
jules_session_id: '10545465525477158768'
pr_number: null
parent: story-306-319-gen1-trainer-data-extraction
tags:
  - gen1
  - save-engine
  - extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 Trainer Data Extraction QA

## Context
QA verification for the Gen 1 Trainer Data Extraction Implementation.

## Requirements
1. Verify that trainer defeat flags are properly extracted from the Gen 1 save file.
2. Verify explicit bitwise logic is used with boundary testing (ADR 026).
3. Verify relative offsets and constants (ADR 028) are used strictly. No inline magic numbers. All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level.
4. Verify boundary testing is comprehensive.
5. If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
6. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
7. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify Gen 1 trainer data extraction implementation.
- [ ] Verify no magic numbers are used and constants are declared at module level.
- [ ] Verify unit tests cover explicit bitwise logic and boundaries.
