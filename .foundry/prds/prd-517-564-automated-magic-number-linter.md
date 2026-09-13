---
id: prd-517-564-automated-magic-number-linter
type: PRD
title: Automated Magic Number Linter
status: PENDING
owner_persona: epic_planner
created_at: '2026-09-09T00:00:00.000Z'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: null
parent: idea-517-automated-magic-number-linter
rejection_reason: ''
locks: []
---
# PRD: Automated Magic Number Linter for Save Parsing

## Context & Motivation
Based on `idea-517-automated-magic-number-linter`, QA frequently rejects tasks where agents violate Section 13 of the `schema.md` guidelines by using inline magic numbers instead of named constants (e.g., using `8` instead of `BITS_PER_BYTE`). This causes manual review friction and repetitive corrections. To enforce this automatically, we need to implement a linter rule (ESLint or Biome) that detects and flags these magic bitwise numbers during the pre-commit process.

## Scope
1. Introduce or configure a linter rule targeting JavaScript/TypeScript files used for save data parsing (e.g., within `src/engine/saveParser` or `src/engine/gen3` depending on configuration boundaries).
2. The rule must explicitly flag the usage of magic numbers related to bitwise operations (like shifts `>>`, masks `&`, or bit counts like `8`) if they are used as inline literals instead of named constants.
3. Ensure the rule runs during pre-commit checks to catch violations before manual review.

## Requirements
* Identify the correct Biome or ESLint rule configuration to ban magic numbers, specifically in the context of save parsing directories, or globally if appropriate.
* Document the rule and any required constant definitions so future code complies with the automated check.
* Integrate the check into the existing `pnpm lint` command or pre-commit hooks.

## Acceptance Criteria
- [ ] Create Epic for implementing the magic number linter rule.
