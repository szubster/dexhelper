---
id: task-334-386-cross-gen-sorting-adapters-impl
type: TASK
title: Implement Cross-Generation Sorting Adapters
status: READY
owner_persona: coder
created_at: '2026-08-02'
updated_at: '2026-08-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-136-334-sorting-cross-gen-considerations-retry
tags:
  - feature
  - gen1
  - gen2
  - gen3
  - sorting
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Cross-Generation Sorting Adapters

## Context
While `PokeData` provides a unified interface, certain properties require specific handling across generations to prevent sorting failures or incorrect layouts. We need to implement Generation-specific Regional Dex adapters for sorting and handle type differences and missing properties robustly.

## Requirements
1. **Regional Dex Adapters:**
   - Update `DexNumberSorter` in `src/engine/sorting/StandardSorters.ts` to support specific regional dex mappings for Gen 1 (Kanto), Gen 2 (Johto), and Gen 3 (Hoenn/Kanto depending on game version).
   - If a regional dex is specified but the specific generation's mapping is not yet fully available, provide a clean fallback or mapping (e.g., Kanto for Gen 1, Johto for Gen 2, Hoenn for Gen 3 RSE).
2. **Type Differences & Missing Properties:**
   - Ensure `TypeSorter` correctly handles Gen 1 type differences (e.g., Magnemite missing Steel type) if data mapping does not already normalize this. Implement a check based on the save's generation if needed.
   - Implement robust handling for null/undefined properties that may be missing in older generations (e.g., missing nicknames, modern properties missing in Gen 1/2) in all core sorters.
3. **Save File Parsing Guidelines:**
   - Strictly adhere to **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md` when interacting with any generation-specific data extraction.
4. **Testing:**
   - Write comprehensive unit tests in `src/engine/sorting/StandardSorters.test.ts` to cover cross-generation edge cases, type differences, and regional variants.

## Acceptance Criteria
- [ ] `DexNumberSorter` implements Generation-specific Regional Dex adapters (Gen 1 Kanto, Gen 2 Johto, Gen 3 Hoenn/Kanto).
- [ ] `TypeSorter` correctly handles Gen 1 type differences.
- [ ] All standard sorters implement robust handling for null/undefined properties across older generations.
- [ ] Unit tests are written to cover all cross-generation edge cases and pass successfully.
- [ ] Ensure `pnpm lint` and `pnpm test` pass.
