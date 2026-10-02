---
id: idea-533-save-parser-constant-extraction-linter
type: IDEA
title: 'Automated Save Parser Magic Constant Extraction Linter'
status: READY
owner_persona: product_manager
created_at: '2026-10-02'
updated_at: '2026-10-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - linter
  - save-parser
  - adr028
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Automated Save Parser Magic Constant Extraction Linter

## Context
Recent QA journals and task rejections (e.g. `task-520-550-refactor-gen2-parser-impl`) highlight recurring violations of Section 13 ("Save File Parsing & Extraction Guidelines") and ADR 028 ("No Magic Numbers"). Coders routinely leave unextracted inline magic numbers (such as box capacities, pocket sizes, bit shifts, and party limits) in save file parsers inside `src/engine/saveParser/`. These issues are currently only detected downstream during QA validation, causing avoidable rejection loops and slowing down pipeline throughput.

## Proposal
Introduce an automated linter rule or pre-commit validator (e.g., an ESLint/Oxlint rule or a standalone script in `scripts/check-save-parser-constants.ts`) that scans save parser files in `src/engine/saveParser/` for hardcoded numeric literals outside of designated constant declaration files. This shifts compliance verification left to `pnpm lint` and pre-commit hooks.

## Value Proposition
- Eliminates QA rejections caused by unextracted magic numbers in save file parsers.
- Enforces system-wide adherence to Section 13 and ADR 028 automatically.
- Improves save parser code maintainability and readability.

## Next Steps
- [ ] prd-533-save-parser-constant-extraction-linter
