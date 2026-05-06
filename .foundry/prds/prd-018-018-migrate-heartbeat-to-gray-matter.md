---
id: prd-018-018-migrate-heartbeat-to-gray-matter
type: PRD
title: Migrate foundry-heartbeat.ts to gray-matter
status: BLOCKED
owner_persona: tpm
created_at: '2026-05-06'
updated_at: '2026-05-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/ideas/idea-018-migrate-heartbeat-to-gray-matter.md
tags:
  - foundry
  - dag
  - orchestrator
  - technical-debt
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Migrate foundry-heartbeat.ts to gray-matter

## Context
ADR-006 mandated the use of `gray-matter` for parsing and mutating Markdown frontmatter, explicitly deprecating custom regex. The main orchestrator was migrated, but `foundry-heartbeat.ts` still uses regex to mutate YAML (e.g., in `transitionNodeToReady` and `transitionNodeToCompleted`).

## Requirements
- Update `.github/scripts/foundry-heartbeat.ts` to use `gray-matter` (`matter.stringify()`) for all frontmatter modifications.
- Ensure compliance with ADR-006.
- Prevent brittle regex bugs in frontmatter modifications.
