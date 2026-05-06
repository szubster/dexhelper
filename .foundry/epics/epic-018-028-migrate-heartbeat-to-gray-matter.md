---
id: epic-018-028-migrate-heartbeat-to-gray-matter
type: EPIC
title: "Migrate foundry-heartbeat.ts to gray-matter"
status: PENDING
owner_persona: story_owner
created_at: "2026-05-06"
updated_at: "2026-05-06"
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/prds/prd-018-018-migrate-heartbeat-to-gray-matter.md
tags: ["foundry", "dag", "orchestrator", "technical-debt"]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Epic: Migrate foundry-heartbeat.ts to gray-matter

## Context
ADR-006 mandated the use of `gray-matter` for parsing and mutating Markdown frontmatter, explicitly deprecating custom regex. The main orchestrator was migrated, but `foundry-heartbeat.ts` still uses regex to mutate YAML (e.g., in `transitionNodeToReady` and `transitionNodeToCompleted`).

## Objectives
- Update `.github/scripts/foundry-heartbeat.ts` to use `gray-matter` (`matter.stringify()`) for all frontmatter modifications.
- Ensure compliance with ADR-006.
- Prevent brittle regex bugs in frontmatter modifications.

## High-level Acceptance Criteria
- `transitionNodeToFailed` uses `gray-matter` to parse and mutate frontmatter instead of regex.
- `transitionNodeToCompleted` uses `gray-matter` to parse and mutate frontmatter instead of regex.
- `transitionNodeToReady` uses `gray-matter` to parse and mutate frontmatter instead of regex.
- All modifications write the new node contents via `matter.stringify()`.
