---
id: research-128-210-item-list-parsing-failure
type: RESEARCH
title: Investigate Item List Parsing Failure
status: PENDING
owner_persona: researcher
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-087-128-dynamic-item-list-parsing
tags:
  - refactor
  - build
  - db
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate Item List Parsing Failure

## Context
The implementation task `task-128-181-implement-item-list-parsing` failed permanently due to reaching the maximum rejection count. The QA persona rejected the implementation because the coder neglected to update `vite-plugins/pokedata-plugin.ts` to include `items.jsonl` in the generated msgpack bundle payload, violating `ADR-049-025`.

## Findings
ADR-049-025 explicitly specifies the following architectural requirement:

> **Vite Plugin Integration (`vite-plugins/pokedata-plugin.ts`)**:
> - The plugin will be updated to read `moves.jsonl` and `items.jsonl` alongside the existing data files.
> - These new datasets will be included in the final `msgpackr` payload (`pokedata.msgpack`).
> - The `msgpackr` options (`useRecords: true`, `variableMapSize: true`) will effectively compress the structural keys (e.g., `p`, `acc`, `pp`) across the thousands of move and item entries.

The generation script (`scripts/generate-pokedata.ts`) successfully produced the `data/db/items.jsonl` payload. However, without updating the Vite plugin, the client application cannot ingest the dynamically generated data.

## Actionable Requirements for Retrying Implementation
When retrying the implementation, the coder MUST ensure both of these conditions are met:
1.  **Data Generation**: The `scripts/generate-pokedata.ts` file must be updated to correctly extract and compact item data into `data/db/items.jsonl`.
2.  **Client Ingestion**: The `vite-plugins/pokedata-plugin.ts` file must be updated to read `items.jsonl` and include it in the `pokedata.msgpack` bundle payload.

## Acceptance Criteria
- [ ] Document the root cause of the permanent failure.
- [ ] Detail the necessary components that must be modified to satisfy ADR-049-025.
