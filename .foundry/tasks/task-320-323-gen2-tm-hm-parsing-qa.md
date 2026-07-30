---
id: task-320-323-gen2-tm-hm-parsing-qa
type: TASK
title: Gen 2 TM/HM Parse QA
status: ACTIVE
owner_persona: qa
created_at: '2026-07-14'
updated_at: '2026-07-30'
depends_on:
  - task-320-322-gen2-tm-hm-parsing-impl
jules_session_id: '16268222064868257650'
pr_number: null
parent: story-306-320-gen2-tm-hm-parsing
tags:
  - feature
  - gen2
  - save-parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 TM/HM Parsing QA

## Overview
Verify the implementation of TM/HM parsing for Gen 2 save files.

## Contracts
- **Failure Protocol:**
  - If a transient failure occurs requiring a retry (e.g., failing tests or missing requirements), update the YAML frontmatter to status: FAILED with a clear rejection_reason.
  - If the task is permanently aborted, update the YAML frontmatter to status: CANCELLED with a rejection_reason.
  - If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify that ADR 028 is followed: No magic numbers are used for offsets; constants are defined at the module level.
- [x] Verify that ADR 015 is followed: Full property names are used.
- [x] Verify TM/HM extraction logic works correctly for both Crystal and GS saves.
- [x] Verify one-time TM collection event flags are extracted.
- [x] Verify that pnpm test passes.
