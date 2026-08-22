---
id: epic-048-083-gen3-match-call-save-parsing
type: EPIC
title: 'Epic: Gen 3 Match Call Save Parsing'
status: FAILED
owner_persona: story_owner
created_at: '2026-06-13'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-077-048-gen3-match-call-tracker
tags:
  - feature
  - gen3
  - tracking
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: 'Merged with unfulfilled acceptance criteria: Missing E2E/integration story'
notes: ''
---

# Epic: Gen 3 Match Call Save Parsing

## Overview
This epic covers the extraction of PokéNav Match Call data from Gen 3 Pokémon Emerald `.sav` files. The goal is to accurately read the Match Call block, resolve the hidden "ready for rematch" flags, and identify the current tier (1-5) for each of the 69 registered trainers.

## Prerequisites
- Knowledge of Gen 3 save file structure, particularly the PokéNav Match Call block offsets.
- Adherence to ADR 010: Gen3 Data Parsing Strategy (must use `DataView` API and bounds checking).

## Objectives
- Isolate the memory region responsible for Match Call data within the Emerald save format.
- Implement robust parsing logic using the `DataView` API to extract the 69 Match Call trainer states.
- Resolve the specific bitflags that indicate whether a trainer is ready for a rematch.
- Determine the current rematch tier (1 through 5) for each trainer based on their historical progress.
- Expose this extracted state gracefully to the rest of the application via the `SaveData` schema.

## Next Steps
- [x] Story Owner: Break this Epic down into actionable Stories (e.g., Memory Offset Discovery, `DataView` Implementation, Schema Integration).
- [x] story-083-125-gen3-match-call-memory-offset-discovery
- [x] story-083-126-gen3-match-call-dataview-implementation
- [x] story-083-127-gen3-match-call-schema-integration
