---
id: adr-049-025-dynamic-pokedata-parsing
type: ADR
title: Dynamic PokeData Parsing Architecture
status: ACTIVE
owner_persona: architect
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '11621008747326650951'
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

## Schema for Generated Files

### `moves.jsonl`

The generated `moves.jsonl` will contain compact versions of PokeAPI's move data. To minimize payload size, default or empty values will be omitted. The data structure per move will be:

*   `id`: `number` (The PokeAPI ID of the move)
*   `name`: `string` (The display name of the move)
*   `type`: `number` (The type ID, mapped from `type.name`)
*   `p` (power): `number | undefined` (Base power; omitted if 0 or null)
*   `acc` (accuracy): `number | undefined` (Base accuracy; omitted if null or 100)
*   `pp`: `number` (Base PP of the move)
*   `dmg_class`: `number` (Damage class ID: 1 for physical, 2 for special, 3 for status)
*   `effect`: `number | undefined` (Effect chance/ID, if applicable)

### `items.jsonl`

The generated `items.jsonl` will contain compact versions of PokeAPI's item data.

*   `id`: `number` (The PokeAPI ID of the item)
*   `name`: `string` (The display name of the item)
*   `cost`: `number | undefined` (Cost in PokeMarts; omitted if 0)
*   `category`: `number` (Item category ID, mapped from `category.name`)
*   `fling_p` (fling_power): `number | undefined` (Power when used with Fling)
*   `effect`: `string | undefined` (Short effect description, if applicable)
*   `sprite`: `string | undefined` (Item sprite filename/URL, if applicable)

## Architectural Approach

1.  **Generation Logic (`scripts/generate-pokedata.ts`)**:
    *   The ETL pipeline will be extended to fetch and parse `move` and `item` resources from the locally cloned PokeAPI dataset.
    *   Similar to the `compact()` function used for Pokemon metadata and encounters, a compaction pass will be applied to strip out nulls, undefined values, and defaults (e.g., accuracy 100).
    *   The processed data will be written to `moves.jsonl` and `items.jsonl` in the `data/db` output directory.

2.  **Vite Plugin Integration (`vite-plugins/pokedata-plugin.ts`)**:
    *   The plugin will be updated to read `moves.jsonl` and `items.jsonl` alongside the existing data files.
    *   These new datasets will be included in the final `msgpackr` payload (`pokedata.msgpack`).
    *   The `msgpackr` options (`useRecords: true`, `variableMapSize: true`) will effectively compress the structural keys (e.g., `p`, `acc`, `pp`) across the thousands of move and item entries.

3.  **Client-Side Integration (`src/db/PokeDB.ts`)**:
    *   Two new object stores, `moves` and `items`, will be added to `DB_CONFIG.STORES` and the `PokeDBSchema`.
    *   During the `syncData` process, the application will iterate over the decoded `moves` and `items` arrays from the msgpack payload.
    *   The compact representations will be inflated (restoring defaults like accuracy 100) before being stored in IndexedDB.

## Constraints and Discrepancies

*   **PP Limits**: The base `pp` value is the starting point. Max PP limits are deterministically calculable: each PP Up increases the PP by 20% of the base value, up to a maximum of 3 PP Ups (or 1 PP Max), resulting in a max PP of `base_pp * 1.6`. The generation logic should only store the base `pp`; the client runtime will calculate the max PP dynamically when needed.
*   **Generation Differences**: Certain items or moves may have different effects, powers, or availability depending on the generation. The generation script must leverage the `past_values` or `version_group_details` arrays from PokeAPI to store generation-specific overrides if the current target context (Gen 1-3) differs from the latest generation data. For simplicity in the initial implementation, we will prioritize Gen 1-3 accurate stats where available, or fallback to the latest stats if historical data is missing or uniform.

## Acceptance Criteria
- [x] Determine and document the precise data structure for the `moves.jsonl` and `items.jsonl` records.
- [x] Document how generation logic will handle generation discrepancies (e.g. PP limits).
