---
id: task-522-652-gen2-bug-catching-contest-dvs-stats-impl
type: TASK
title: Gen 2 Bug-Catching Contest DVs and Stats extraction Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-06'
depends_on:
  - research-522-654-gen2-bug-catching-contest-dvs-offsets
jules_session_id: '2868385110318197172'
pr_number: null
parent: story-512-522-gen2-bug-catching-contest-dvs
tags:
  - gen2
  - backend
  - save-extraction
research_references: []
confidence_score: 100
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Bug-Catching Contest DVs and Stats Extraction

## Description
This task involves expanding the `BugCatchingContestData` interface and extraction logic to include hidden values (DVs), held item, and calculates actual stats for the currently caught Bug-Catching Contest Pokémon.

## Acceptance Criteria
- [x] Update `BugCatchingContestData` interface in `src/engine/saveParser/parsers/common.ts` to include `dvs` (Attack, Defense, Speed, Special), `heldItem`, and `stats` (Attack, Defense, Speed, Special Attack, Special Defense).
- [x] Update `extractBugCatchingContestData` in `src/engine/saveParser/gen2/extractors.ts` to parse the new fields from the save block based on proper offsets.
- [x] Update `extractBugCatchingContestData` unit tests in `src/engine/saveParser/gen2/extractors.test.ts` to include the new properties.
