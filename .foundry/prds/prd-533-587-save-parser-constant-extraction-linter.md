---
id: prd-533-587-save-parser-constant-extraction-linter
type: PRD
title: Automated Save Parser Magic Constant Extraction Linter
status: READY
owner_persona: epic_planner
created_at: '2026-10-16T18:48:27.600Z'
updated_at: '2026-10-20'
depends_on: []
jules_session_id: null
parent: idea-533-save-parser-constant-extraction-linter
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# PRD: Automated Save Parser Magic Constant Extraction Linter

## Context & Motivation
Recent QA journals and task rejections (e.g., `task-520-550-refactor-gen2-parser-impl`) highlight recurring violations of Section 13 ("Save File Parsing & Extraction Guidelines") and ADR 028 ("No Magic Numbers"). Coders routinely leave unextracted inline magic numbers (such as box capacities, pocket sizes, bit shifts, and party limits) in save file parsers inside `src/engine/saveParser/`. These issues are currently only detected downstream during QA validation, causing avoidable rejection loops and slowing down pipeline throughput.

## Scope
1. Introduce or configure a linter rule (e.g., an ESLint/Oxlint/Biome rule or a standalone script in `scripts/`) that scans save parser files for hardcoded numeric literals used in bitwise operations or offsets outside of designated constant files.
2. The rule must explicitly flag the usage of magic numbers related to bitwise operations or buffer offsets.
3. Integrate the check into the existing `pnpm lint` command or pre-commit hooks to shift compliance verification left.

## Value Proposition
- Eliminates QA rejections caused by unextracted magic numbers in save file parsers.
- Enforces system-wide adherence to Section 13 and ADR 028 automatically.
- Improves save parser code maintainability and readability.

## Acceptance Criteria
- [ ] epic-587-584-save-parser-constant-extraction-linter
