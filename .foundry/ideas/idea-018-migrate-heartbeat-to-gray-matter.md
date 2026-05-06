---
id: idea-018-migrate-heartbeat-to-gray-matter
type: IDEA
title: Migrate foundry-heartbeat.ts to gray-matter
status: ACTIVE
owner_persona: product_manager
created_at: '2026-05-06'
updated_at: '2026-05-06'
depends_on: []
jules_session_id: '8259486336301315401'
parent: null
tags:
  - foundry
  - dag
  - orchestrator
  - technical-debt
notes: ''
---

# Idea: Migrate foundry-heartbeat.ts to use gray-matter

## Context
ADR-006 mandated the use of `gray-matter` for parsing and mutating Markdown frontmatter, explicitly deprecating custom regex. The main orchestrator was migrated, but `foundry-heartbeat.ts` still uses regex to mutate YAML (e.g., in `transitionNodeToReady` and `transitionNodeToCompleted`).

## Proposal
Update `.github/scripts/foundry-heartbeat.ts` to use `gray-matter` (`matter.stringify()`) for all frontmatter modifications to conform to ADR-006 and prevent brittle regex bugs.

## Impact
Reduces technical debt, prevents bugs related to frontmatter modifications, and ensures full compliance with system architecture decisions.

## Child Nodes
- [x] PRD created: `.foundry/prds/prd-018-018-migrate-heartbeat-to-gray-matter.md`
