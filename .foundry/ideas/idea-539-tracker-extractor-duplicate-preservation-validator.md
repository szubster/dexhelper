---
id: idea-539-tracker-extractor-duplicate-preservation-validator
type: IDEA
title: Automated Linter Guard for Duplicate Item Preservation in Tracker Extractor Engine
status: READY
owner_persona: product_manager
created_at: "2026-10-18"
updated_at: "2026-10-18"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: 95
tags:
  - linter
  - tracker
  - save-parser
  - diffing
rejection_reason: ""
notes: "Triggered by QA rejection analysis in task-564-602-pokemon-held-item-tracker-extraction"
---

# Automated Linter Guard for Duplicate Item Preservation in Tracker Extractor Engine

## Problem
In `.foundry/journals/qa/2026-10-13-00-13-16.md`, QA rejected `task-564-602-pokemon-held-item-tracker-extraction` because the implementation of `extractHeldItems` in `src/engine/tracker/heldItemExtractor.ts` used a Javascript `Set` data structure to store extracted items.
While using a `Set` deduplicates array elements, it incorrectly drops duplicate items when multiple Pokémon hold the same item across party or PC box slots. Downstream diffing engines (e.g. `diffHeldItems`) rely on exact item quantities to accurately track newly acquired, removed, or transferred items. Dropping duplicates via `Set` causes silent data corruption in item tracking.

## Proposed Solution
Introduce a static AST linter rule or pre-commit unit test constraint targeting `src/engine/tracker/` and `src/engine/saveParser/` extraction functions that:
1. Detects instances where array extraction logic or return values convert collection items using `new Set(...)` or `Array.from(new Set(...))`.
2. Emits a build or lint warning/error requiring array multi-sets or list retention for tracker extractor logic, preventing silent item deduplication.
3. Provides explicit documentation or helper utilities (e.g., `preserveDuplicates(...)` or `Multiset`) in `src/engine/tracker/utils.ts` to guide coders when building inventory and held item extractors.

## Value
- Eliminates transient QA rejection loops caused by improper deduplication in save file data extractors.
- Guarantees state tracking integrity across save diffing utilities and inventory analytics dashboards.
