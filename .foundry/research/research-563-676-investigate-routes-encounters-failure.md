---
id: research-563-676-investigate-routes-encounters-failure
type: RESEARCH
title: 'Investigate Routes, Encounters, and Drop Rates Data Fetching Failure'
status: READY
owner_persona: researcher
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-555-563-routes-encounters-drop-rates
tags:
  - dexhelper
  - data
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Research: Investigate Routes, Encounters, and Drop Rates Data Fetching Failure

## Context
The previous task (`task-563-667-routes-encounters-data-fetching-impl`) failed permanently due to an "Autonomous No-Ask Policy Violation" (Session entered AWAITING_USER_FEEDBACK). This triggered the impossible loop for the parent story.

## Requirements
- Investigate the root cause of the previous failure. Did the coder get stuck due to a lack of documentation on drop rates? Are there missing offsets for hold item probabilities in Gen 3?
- Document the exact offsets, equations, or API structures required for calculating and fetching hold item drop rates and their specific encounters.
- Provide clear instructions for the coder to implement the data fetching logic without needing to ask the user.

## Acceptance Criteria
- [x] researcher: Investigate the cause of failure.
- [x] researcher: Document data sources, equations, and offsets required for implementation.

### Research Findings & Implementation Instructions

**1. Root Cause of Failure**
The previous task failed due to an "Autonomous No-Ask Policy Violation." The coder likely got stuck because they lacked the specific data source locations or formulas for encounter and drop rates and attempted to ask the user for clarification.

**2. Data Sources**
- **Static Base Data:** The encounter and drop rate definitions are built via `scripts/generate-pokedata.ts` and output to `public/data/` (or parsed from `encounters.jsonl`, `locations.jsonl`).
- **Hold Item Offsets (Gen 3):** Described in `.foundry/docs/knowledge_base/gen3_wild_encounter_offsets.md`. The base item potentials are defined in `itemCommon` and `itemRare`.
- **Hold Item Offsets (Gen 2):** Described in `.foundry/docs/knowledge_base/gen2_wild_encounter_offsets.md`.

**3. Equations & Drop Rates (Gen 3)**
The baseline drop rates are:
- No Item: 50%
- Common Item (`itemCommon`): 50%
- Rare Item (`itemRare`): 5%
If `itemCommon` == `itemRare` and not `ITEM_NONE`, it is 100%.

**Compound Eyes Ability Effect:**
If the player's lead Pokémon has the ability **Compound Eyes** (not an Egg), the probabilities change to:
- No Item: 20%
- Common Item: 60%
- Rare Item: 20%

**4. Equations & Drop Rates (Gen 2)**
The baseline drop rates are:
- No Item: 75%
- Item 1 (Common): 23%
- Item 2 (Rare): 2%

**5. Instructions for Coder**
- Fetch the item from the appropriate runtime data store/hooks using the `itemId`.
- Identify all Pokémon species that can hold the specific item.
- Aggregate their encounter data across routes using the static data.
- Build a utility to calculate the effective drop rate, ensuring to account for the Compound Eyes ability modifier in Generation 3.
- Map the output to a clear array structure (`route`, `pokemon`, `chance`, `dropRate`, `effectiveDropRate`).
