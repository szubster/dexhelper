---
id: idea-536-save-parser-data-view-bounds-validation-linter
type: IDEA
title: Automated Save Parser DataView Bounds Validation Linter Rule
status: READY
owner_persona: product_manager
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - linter
  - save-parser
  - adr028
  - DX
  - quality
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
confidence_score: 95
---

# Idea: Automated Save Parser DataView Bounds Validation Linter Rule

## Context & Problem Statement
In `src/engine/saveParser/`, Pokemon save file binary buffers (Gen 1-3) are parsed using `DataView` or typed arrays (`Uint8Array`). Section 13 of `.foundry/docs/schema.md` ("Save File Parsing & Extraction Guidelines") explicitly mandates that all save parsing extractions must handle potential out-of-bounds byte reads and catch `RangeError` or validate offset boundaries prior to bitwise reading.

However, during parser expansion or bug fixes, developers sometimes call `DataView.getUint8()`, `getUint16()`, or `getUint32()` with computed offset expressions without pre-verifying that `offset + length <= buffer.byteLength`. Unhandled `RangeError` exceptions thrown deep within binary buffer extractions cause generic parsing crashes rather than graceful error handling or partial save file diagnostics.

## Proposed Solution
Introduce a static analysis linter check integrated into `pnpm lint` (or a custom ESLint / AST linter script in `scripts/linters/`) that targets files within `src/engine/saveParser/`:
1. **AST DataView Pattern Detection**: Scan AST nodes in save parser files for calls to `DataView` getter methods (`getUint8`, `getUint16`, `getUint32`, `getFloat32`, etc.).
2. **Bounds Guard Enforcement**: Flag any direct `DataView` read call where the target offset/slice calculation is not wrapped inside a `try...catch (RangeError)` block or guarded by an explicit `offset + byteSize <= view.byteLength` boundary check or helper utility (e.g. `SaveDataReader`).
3. **Automated Auto-Fix / Guidance**: Provide explicit error messages referencing Section 13 of `.foundry/docs/schema.md` and recommend safe reader wrappers.

## Value Proposition
- **Shift-Left DX & Reliability**: Prevents runtime `RangeError` crashes on truncated or custom `.sav` files prior to QA verification.
- **Enforces Section 13 Architectural Mandates**: Automatically checks compliance with Section 13 of `.foundry/docs/schema.md`.
- **Reduces QA Rejection Loops**: Eliminates transient QA rejections caused by un-guarded binary buffer access in save parsing modules.

## Acceptance Criteria
- [ ] PRD drafted detailing AST rules and target patterns for DataView bounds validation in `src/engine/saveParser/`.
- [ ] Linter script or ESLint rule implemented in static analysis pipeline (`pnpm lint`).
- [ ] Automated tests added verifying that un-guarded `DataView` calls in save parser code trigger linter warnings/errors.
