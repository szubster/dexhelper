---
id: task-564-681-implement-enum-strictness-validation
type: TASK
title: "Implement Enum Strictness Validation"
status: PENDING
owner_persona: coder
created_at: "2026-10-12"
updated_at: "2026-10-12"
depends_on:
  - task-564-680-implement-frontmatter-parsing
jules_session_id: null
parent: story-555-564-lint-schema-frontmatter-validation
confidence_score: null
tags:
  - linting
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Implement Enum Strictness Validation

## Objective
Update `.foundry/scripts/lint-schema.ts` to enforce valid enums for `type`, `status`, and `owner_persona`.

## Details
- Implement strict validation against the defined enums in the schema.
- `type` must be one of: `IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`, `RESEARCH`, `ADR`, `EXPERIMENT`.
- `status` must be one of: `DRAFT`, `WIP`, `PENDING`, `READY`, `ACTIVE`, `VERIFYING`, `COMPLETED`, `FAILED`, `BLOCKED`, `CANCELLED`.
- `owner_persona` must be one of: `canvas`, `palette`, `product_manager`, `epic_planner`, `story_owner`, `architect`, `tech_lead`, `coder`, `qa`, `human`, `tpm`, `agile_coach`, `researcher`, `auditor`, `librarian`, `curator`.
- If an invalid value is found, log a specific error and flag the file as having failed validation.
