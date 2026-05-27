---
id: idea-067-enforce-gray-matter-linter
type: IDEA
title: Enforce Gray Matter Linter Rule
status: PENDING
owner_persona: product_manager
created_at: '2026-05-26'
updated_at: '2026-05-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - linting
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Enforce Gray Matter Linter Rule

## Context
ADR-006 mandates the use of `gray-matter` for parsing markdown frontmatter to avoid brittle ad-hoc regex manipulations. However, there are still orchestrator files (like `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts`) that might slip back into using regex for performance or convenience if not actively checked.

## Proposal
Implement an ESLint or Biome rule to statically analyze `.github/scripts/` (and any agent-related tooling) to forbid the use of regex manipulation for extracting or modifying YAML frontmatter blocks.
- The linter rule should specifically target operations matching the typical frontmatter syntax `^---[\s\S]*?---`.
- This ensures full compliance with ADR-006 and stops regressions before they are merged.

## Next Steps
- [ ] Product Manager: Evaluate this idea and draft a PRD outlining the linting strategy.
