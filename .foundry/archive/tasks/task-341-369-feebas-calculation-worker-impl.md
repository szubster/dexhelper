---
id: task-341-369-feebas-calculation-worker-impl
type: TASK
title: Implement Feebas Web Worker
status: COMPLETED
owner_persona: coder
created_at: '2026-07-31'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen3
  - backend
  - performance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Feebas Web Worker

## Objective
Implement asynchronous or web-worker based calculation for the Feebas tiles during Gen 3 save file hydration, moving the heavy `calculateFeebasTiles` logic out of the synchronous parsing function to avoid blocking the main UI thread.

## Background
According to ADR 020 (`020-feebas-visualization-architecture.md`), Feebas tiles are calculated via a Linear Congruential Generator (LCG) loop. To ensure maximum performance during hydration, this calculation should be offloaded to a Web Worker, decoupling it from the synchronous save file parsing pipeline.

## Acceptance Criteria
- [x] Create a new Web Worker script (e.g. `src/engine/saveParser/parsers/feebas.worker.ts`) that imports and calls `calculateFeebasTiles(seed)`.
- [x] Refactor the parsing logic in `src/engine/saveParser/parsers/gen3.ts` to NO LONGER block synchronously on `calculateFeebasTiles`. Instead, it should just extract the 16-bit seed (using `extractFeebasSeed`) and either return it, or the higher-level caller/hydration pipeline should handle dispatching the seed to the Web Worker and awaiting the tiles.
- [x] Ensure that all guidelines from Section 13 ("Save File Parsing & Extraction Guidelines") in `.foundry/docs/schema.md` are strictly adhered to (no magic numbers, proper relative offsets, explicit bitwise mapping).
- [x] Ensure `src/engine/saveParser/parsers/gen3.test.ts` is updated and all tests continue to pass.
