---
id: research-563-704-investigate-routes-encounters-failure-v2
type: RESEARCH
title: 'Investigate Routes, Encounters, and Drop Rates Data Fetching Failure (v2)'
status: READY
owner_persona: researcher
created_at: '2026-10-18'
updated_at: '2026-10-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-555-563-routes-encounters-drop-rates
tags:
  - dexhelper
  - data
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Research: Investigate Routes, Encounters, and Drop Rates Data Fetching Failure (v2)

## Context
The previous task (`task-563-677-routes-encounters-data-fetching-retry`) failed permanently. We are spawning a new research node to investigate the failure before retrying the implementation tasks again.

## Requirements
- Investigate the root cause of the previous failure.
- Document the exact offsets, equations, or API structures required for calculating and fetching hold item drop rates and their specific encounters.
- Provide clear instructions for the coder to implement the data fetching logic without needing to ask the user.

## Acceptance Criteria
- [x] researcher: Investigate the cause of failure.
- [x] researcher: Document data sources, equations, and offsets required for implementation.

### Research Findings & Implementation Instructions

**1. Root Cause of Failure**
The previous task failed permanently due to repeated `[ACKNOWLEDGED] Autonomous No-Ask Policy Violation: Session entered AWAITING_USER_FEEDBACK` errors. This is a false permanent failure. The coder likely got stuck because they lacked the specific data source locations or formulas for encounter and drop rates and attempted to ask the user for clarification.

**2. Data Sources**
- **Static Base Data:** The encounter and drop rate definitions are built via `scripts/generate-pokedata.ts` and output to `data/db/` (specifically `encounters.jsonl`, `locations.jsonl`). `PokeDB` reads from IndexedDB for these datasets.
- **Hold Item Offsets (Gen 3):** Defined in `.foundry/docs/knowledge_base/gen3_wild_encounter_offsets.md`.
- **Hold Item Offsets (Gen 2):** Defined in `.foundry/docs/knowledge_base/gen2_wild_encounter_offsets.md`.

**3. Equations & Drop Rates (Gen 3)**
The baseline drop rates are:
- No Item: 50%
- Common Item (`itemCommon`): 50%
- Rare Item (`itemRare`): 5%
If `itemCommon` == `itemRare` and not `ITEM_NONE`, it is 100%.

**Compound Eyes Ability Effect (Gen 3):**
If the player's lead Pokémon has the ability **Compound Eyes** (not an Egg), the probabilities change to:
- No Item: 20%
- Common Item: 60%
- Rare Item: 20%

**4. Equations & Drop Rates (Gen 2)**
The baseline drop rates are:
- No Item: 75%
- Item 1 (Common): 23%
- Item 2 (Rare): 2%
There is a 25% chance of getting any item. If successful, there is an 8% chance to get Item 2 (8% of 25% = 2%). Otherwise, you get Item 1.

**5. Instructions for Coder**
- Do NOT ask questions. Use the static data from `encounters.jsonl` loaded into `PokeDB` or via `dexDataLoader.encounters`.
- Fetch the item from the appropriate runtime data store/hooks using the `itemId`.
- Identify all Pokémon species that can hold the specific item.
- Aggregate their encounter data across routes using the static data.
- Build a utility to calculate the effective drop rate, incorporating the equations documented above.
- Map the output to a clear array structure (e.g., `route`, `pokemon`, `chance`, `dropRate`, `effectiveDropRate`).
