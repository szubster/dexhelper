---
id: adr-010-msgpack-for-gen3-data
type: ADR
title: 'ADR 010: Transition to MsgPack for Generation 3 Data'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-17'
updated_at: '2026-05-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 010: Transition to MsgPack for Generation 3 Data

## Date
2026-05-17

## Status
Accepted

## Context
As documented in the `data_format_strategy.md`, our initial data serialization relied on minified JSON because the dataset size for Gen 1 and Gen 2 was relatively small (~177 KB). However, the strategy explicitly recommended switching to MsgPack when Generation 3 data is added, as the dataset size will grow significantly, and MsgPack offers a ~35% reduction in size with faster parsing compared to `JSON.parse` for complex objects, at the cost of a minimal overhead (+3KB bundle). Since Gen 3 support is now being integrated (Idea 053), it is time to execute this transition to prevent bloating the application payload and to maintain fast parsing performance.

## Decision
We will transition our PokeData storage and parsing layer from JSON to MsgPack (`msgpackr`) as part of the Generation 3 integration. This transition includes updating the generation pipeline and the runtime hydration scripts (`PokeDB.ts`).
