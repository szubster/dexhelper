---
id: epic-048-084-gen3-match-call-static-data
type: EPIC
title: 'Epic: Gen 3 Match Call Static Data Generation'
status: PENDING
owner_persona: story_owner
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-077-048-gen3-match-call-tracker
tags:
  - feature
  - gen3
  - tracking
  - data-generation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Match Call Static Data Generation

## Overview
This epic focuses on building the static dataset necessary to enrich the raw Match Call IDs extracted from the save file. We need a performant mapping of the 69 Match Call trainers to their human-readable details, including their changing teams and EV yields across their 5 possible tiers.

## Prerequisites
- Game data sources (e.g., decompilation repos like `pret/pokeemerald`) to extract trainer names, locations, and teams.
- Adherence to ADR 010: Transition to MsgPack for Generation 3 Data.

## Objectives
- Create an ETL script to pull or define the static mapping for the 69 Match Call trainers.
- Structure the dataset to include trainer Name, Location (Route/Cave), and their 5 tiers of teams.
- Calculate and aggregate the total Effort Value (EV) yield for defeating each specific team at each tier.
- Export this static dataset using the highly-compacted MsgPack serialization format to minimize bundle size impact.
- Integrate the dataset into the IndexedDB persistence layer (`PokeDB.ts`) for quick runtime hydration.

## Next Steps
- [ ] Story Owner: Break this Epic down into actionable Stories (e.g., ETL Scripting, EV Calculation Logic, MsgPack Integration).
