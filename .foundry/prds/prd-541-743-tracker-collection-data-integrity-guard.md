---
id: prd-541-743-tracker-collection-data-integrity-guard
type: PRD
title: Tracker Collection Data Integrity Linter & Developer Guideline
status: READY
owner_persona: epic_planner
created_at: '2026-11-06T16:17:15Z'
updated_at: '2026-11-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-541-tracker-collection-data-integrity-guard
tags:
  - engine
  - linter
  - quality
---

# Tracker Collection Data Integrity Linter & Developer Guideline

## Context
QA session logs revealed a repeating defect pattern where tracker extraction utilities incorrectly utilize ES6 `Set` data structures to collect items or entities. Because `Set` deduplicates elements, duplicate valid entries are silently dropped, corrupting quantity-sensitive tracking data.

## Requirements
1. Update `.foundry/docs/schema.md` (Section 13 / Engine Guidelines) to explicitly prohibit the use of deduplicating collection types (`Set`) in extraction pipelines where duplicate items/entities are valid.
2. Introduce a custom linter rule or AST check in `.github/scripts/` / ESLint / Biome that flags `new Set()` usage in `src/engine/tracker/` and `src/engine/saveParser/` files during pre-commit checks.

## Acceptance Criteria
- [ ] Update `.foundry/docs/schema.md`
- [ ] Create AST/linter validation rule
