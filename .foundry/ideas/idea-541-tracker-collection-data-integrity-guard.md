---
id: idea-541-tracker-collection-data-integrity-guard
type: IDEA
title: Tracker Collection Data Integrity Linter & Developer Guideline
status: READY
owner_persona: product_manager
created_at: '2026-10-26T04:30:00Z'
updated_at: '2026-11-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - engine
  - linter
  - quality
rejection_count: 1
rejection_reason: ''
---

# Tracker Collection Data Integrity Linter & Developer Guideline

## Overview
QA session logs (e.g. `2026-10-20-20-50-15.md` during `task-564-602-pokemon-held-item-tracker-extraction`) revealed a repeating defect pattern where tracker extraction utilities (e.g. `extractHeldItems`, `extractPartyMoves`, `extractBoxItems`) incorrectly utilize ES6 `Set` data structures to collect items or entities. Because `Set` deduplicates elements, duplicate valid entries (such as multiple Pokemon holding identical items like `Leftovers`) are silently dropped. This corrupts quantity-sensitive tracking data and breaks downstream diffing algorithms.

## Proposed Solution
1. Update `.foundry/docs/schema.md` (Section 13 / Engine Guidelines) to explicitly prohibit the use of deduplicating collection types (`Set`) in extraction pipelines where duplicate items/entities are valid.
2. Introduce a custom linter rule or AST check in `.github/scripts/` / ESLint / Biome that flags `new Set()` usage in `src/engine/tracker/` and `src/engine/saveParser/` files during pre-commit checks.

## Acceptance Criteria
- [ ] Document collection data integrity rules in `.foundry/docs/schema.md`
- [ ] Create AST / linter validation rule flagging improper `Set` usage in extraction routines
