---
id: epic-586-582-yaml-schema-counters
type: EPIC
title: "Update Schema and Validation Logic for New YAML Counters"
status: READY
owner_persona: story_owner
created_at: "2026-10-08"
updated_at: "2026-10-08"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-535-586-false-permanent-failure-detection
priority: 80
confidence_score: null
tags: []
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Update Schema and Validation Logic for New YAML Counters

## Context
To prevent temporary system issues from falsely exceeding the domain rejection limit and cancelling tasks, we need to track infrastructure failures independently from QA domain rejections.

This Epic covers updating the `.foundry` YAML frontmatter schema to include a dedicated tracker for system failures (e.g., `system_failure_count`).

## Objectives
- Update YAML frontmatter schema definition for `.foundry` nodes.
- Implement validation logic to ensure `system_failure_count` is properly typed and handled.

## Acceptance Criteria
- [x] Generate an exclusive STORY dedicated to Integration and E2E Verification.
- [ ] story-582-673-yaml-schema-validation-impl
- [ ] story-582-674-yaml-schema-e2e-verification
