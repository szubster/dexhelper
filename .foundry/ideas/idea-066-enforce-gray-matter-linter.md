---
id: idea-066-enforce-gray-matter-linter
type: IDEA
title: Enforce Gray-Matter Linter for Scripts
status: CANCELLED
owner_persona: tpm
created_at: '2026-05-25'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: '17630040877061059442'
parent: null
tags:
  - lint
  - schema
  - foundry
research_references: []
rejection_count: 0
rejection_reason: >-
  Low ROI; maintaining a custom Biome/Oxlint rule for a minor scripts edge-case
  outweighs the benefits over standard PR review.
notes: Generated autonomously to enforce ADR 006
---

# Enforce Gray-Matter Linter for Scripts

## Context
ADR 006 established the requirement to exclusively use the `gray-matter` library for parsing and modifying YAML frontmatter across all Foundry automation scripts (`.github/scripts/`), explicitly deprecating the use of brittle custom Regular Expressions (`Regex`). Despite this, occasional regressions have been introduced where regex is still utilized, resulting in broken frontmatter and orchestrator failures.

## Proposal
Implement a strict programmatic linting rule (e.g., via Biome or an ESLint plugin) that scans the `.github/scripts/` directory and explicitly forbids regex string manipulation or matching patterns commonly used for YAML frontmatter (like `/^---/`). The linter should fail the CI pipeline if such patterns are detected, directing developers to use `matter.stringify()` instead.

## Questionable ROI?
Note: There are concerns from leadership that a custom linter rule just for this edge case might not be worth the maintenance overhead compared to relying on standard PR reviews.
**Product Manager and downstream personas MUST strictly evaluate the ROI and technical feasibility of this before proceeding.** It is fully acceptable for this to be declined/cancelled during the PRD or Architecture phase if the cost outweighs the benefit.

## Next Steps
- [ ] Product Manager: Evaluate this idea, outline the technical approach for the linter rule, explicitly evaluate the ROI concerns, and either transform this into a PRD or cancel it.
