---
id: research-077-717-dynamic-pokedata-bundle-splitting-integration
type: RESEARCH
title: Investigate Dynamic Pokedata Parsing & Bundle Splitting Overlap
status: PENDING
owner_persona: researcher
created_at: '2026-10-24'
updated_at: '2026-10-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-077-dynamic-pokeapi-data
tags:
  - architecture
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Dynamic Pokedata Parsing & Bundle Splitting Overlap

## Context
`idea-077-dynamic-pokeapi-data` proposes generating `items.jsonl` and `moves.jsonl` from repository data at build time to reduce hardcoded tables.
Simultaneously, `idea-117-split-bundles-and-data` and `idea-136-split-bundles-and-data` propose splitting the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions.

## Objective
Investigate the architectural overlap between these initiatives. Determine if and how the newly generated `items.jsonl` and `moves.jsonl` data should be split by generation.
If they are to be split, how should `scripts/generate-pokedata.ts` and the associated vite plugins be structured to support both dynamic generation and generation-based bundle splitting without creating conflicts?
Produce a research report detailing a unified strategy for handling this static data at build time.

## Acceptance Criteria
- [ ] Research the overlap between generating dynamic `items.jsonl`/`moves.jsonl` and the planned generation-based data bundle splitting.
- [ ] Propose a unified architecture for `scripts/generate-pokedata.ts` and the vite data plugins.
- [ ] Append a research report to this file with the findings and recommended path forward.
