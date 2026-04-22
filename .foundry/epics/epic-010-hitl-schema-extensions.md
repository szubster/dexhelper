---
id: "epic-010-hitl-schema-extensions"
type: "EPIC"
title: "Schema Extensions for Human-in-the-Loop"
status: "PENDING"
owner_persona: "story_owner"
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on: []
jules_session_id: null
parent: ".foundry/prds/prd-004-human-in-the-loop.md"
tags:
  - "human-in-the-loop"
---

# Epic 010: Schema Extensions for Human-in-the-Loop

## Prerequisites
- Knowledge of the Foundry Master Schema (`.foundry/docs/schema.md`).

## Acceptance Criteria
- [ ] Add `human` to the `owner_persona` enum in the Master Schema.
- [ ] Add `pr_number` to the global frontmatter schema as `integer | null` (optional, defaults to `null`).
