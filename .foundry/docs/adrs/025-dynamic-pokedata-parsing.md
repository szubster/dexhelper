---
id: adr-049-025-dynamic-pokedata-parsing
type: ADR
title: Dynamic PokeData Parsing Architecture
status: PENDING
owner_persona: architect
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-077-049-dynamic-pokedata-parsing
tags:
  - refactor
  - build
  - db
  - adr
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR: Dynamic PokeData Parsing Architecture

## Background
We are moving away from manually compiled data tables for move PPs and valid item lists. The goal is to generate this data dynamically at build time (e.g., via `scripts/generate-pokedata.ts`) and store it as `.jsonl` files (e.g., `items.jsonl`, `moves.jsonl`). This task is to write the Architectural Decision Record (ADR) that will guide this transition.

## Goals
Write an ADR that details:
1. The exact data structures (schema) for the generated `moves.jsonl` and `items.jsonl` files.
2. The architectural approach for integrating this dynamic generation into the existing build pipeline (`scripts/generate-pokedata.ts`).
3. How the Vite plugin will securely and efficiently bundle these `.jsonl` files for the client side.
4. Any constraints or potential issues regarding differences across generations (e.g., Gen 1 vs. Gen 2 PP limits).

## Acceptance Criteria
- [ ] Determine and document the precise data structure for the `moves.jsonl` and `items.jsonl` records.
- [ ] Document how generation logic will handle generation discrepancies (e.g. PP limits).
