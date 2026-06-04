---
id: story-055-096-serialize-gen3-berry-data
type: STORY
title: Serialize Gen 3 Berry Patch Data via MsgPack
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-03'
updated_at: '2026-06-03'
depends_on:
  - .foundry/stories/story-055-095-parse-gen3-berry-data.md
jules_session_id: null
pr_number: null
parent: epic-037-055-gen3-berry-tracker-data-extraction
tags:
  - feature
  - gen3
  - berries
  - engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Serialize Gen 3 Berry Patch Data via MsgPack

## Overview
This Story covers the implementation of the data generation pipeline to serialize the parsed Generation 3 berry patch data into MsgPack format. It follows ADR 010 to use `msgpackr` for serialization.

## Details
* Take the structured berry data output from the DataView parser.
* Integrate the data into the main `generate-pokedata` build script (or equivalent build step).
* Serialize the structured berry objects using the `msgpackr` library configuration (`useRecords: true`).
* Update the runtime `PokeDB.ts` hydration logic to parse the new berry structures correctly.

## Acceptance Criteria
- [ ] Add the parsed berry data to the PokeData generation script output.
- [ ] Ensure the generation step serializes the output payload using `msgpackr`.
- [ ] Implement reading of the serialized berry data in the `PokeDB` module using `msgpackr`.