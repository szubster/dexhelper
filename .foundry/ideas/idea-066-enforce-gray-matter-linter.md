---
id: idea-066-enforce-gray-matter-linter
type: IDEA
title: Enforce Gray-Matter Linter for Scripts
status: PENDING
owner_persona: product_manager
created_at: "2026-05-25"
updated_at: "2026-05-25"
depends_on: []
jules_session_id: null
parent: null
tags:
  - lint
  - schema
  - foundry
research_references: []
rejection_count: 0
rejection_reason: ""
notes: "Generated autonomously to enforce ADR 006"
---

# Enforce Gray-Matter Linter for Scripts

## Context
ADR 006 established the requirement to exclusively use the `gray-matter` library for parsing and modifying YAML frontmatter across all Foundry automation scripts (`.github/scripts/`), explicitly deprecating the use of brittle custom Regular Expressions (`Regex`). Despite this, occasional regressions have been introduced where regex is still utilized, resulting in broken frontmatter and orchestrator failures.

## Proposal
Implement a strict programmatic linting rule (e.g., via Biome or an ESLint plugin) that scans the `.github/scripts/` directory and explicitly forbids regex string manipulation or matching patterns commonly used for YAML frontmatter (like `/^---/`). The linter should fail the CI pipeline if such patterns are detected, directing developers to use `matter.stringify()` instead.

## Next Steps
- [ ] Product Manager: Evaluate this idea, outline the technical approach for the linter rule, and transform this into a PRD.
