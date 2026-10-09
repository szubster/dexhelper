---
id: story-582-673-yaml-schema-validation-impl
type: STORY
title: "Implement Schema and Validation Logic for system_failure_count"
status: PENDING
owner_persona: tech_lead
created_at: "2026-10-09"
updated_at: "2026-10-09"
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-586-582-yaml-schema-counters
priority: 80
confidence_score: null
tags: ["typescript"]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Implement Schema and Validation Logic for system_failure_count

## Context
As part of EPIC `epic-586-582-yaml-schema-counters`, we need to track infrastructure failures independently from QA domain rejections. This story implements the new `system_failure_count` property in the `.foundry` YAML frontmatter schema.

## Objectives
- Update the YAML frontmatter schema definition to include `system_failure_count`.
- Implement validation logic to ensure `system_failure_count` is correctly typed (integer) and handled.

## Acceptance Criteria
- [ ] Break down into Tasks
