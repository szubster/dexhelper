---
id: epic-586-667-yaml-counters-schema
type: EPIC
title: YAML Counters Schema Validation
status: PENDING
owner_persona: story_owner
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on:
  - adr-586-665-false-permanent-failure-tracking
jules_session_id: null
pr_number: null
parent: prd-535-586-false-permanent-failure-detection
tags:
  - schema
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# Epic: YAML Counters Schema Validation

## Objective
Update the `.foundry` YAML frontmatter schema to include a dedicated tracker for system failures (`system_failure_count`) and update validation logic across the `.github/scripts/` toolchain.

## Acceptance Criteria
- [ ] Update `.foundry/docs/schema.md` with `system_failure_count`.
- [ ] Update schema validation logic for new YAML counters.
- [ ] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.
