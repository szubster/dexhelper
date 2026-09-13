---
id: task-536-563-gen3-berry-map-location
type: TASK
title: Map Gen 3 Berry Trees to Locations
status: PENDING
owner_persona: coder
created_at: "2026-09-04"
updated_at: "2026-09-04"
depends_on:
  - task-536-562-gen3-berry-parsing-logic
jules_session_id: null
locks: []
pr_number: null
parent: story-513-536-gen3-berry-dataview-parsing
tags:
  - gen3
  - mapping
research_references:
  - .foundry/docs/knowledge_base/gen3_berry_patch_offsets.md
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Map Gen 3 Berry Trees to Locations

## Overview
Implement the mapping from the `BerryTree` array index to its hardcoded map location in the game (e.g., Route 102, Route 103, etc.).

## Acceptance Criteria
- [ ] Create a mapping structure (e.g., array or object) that translates the berry tree array index (0-127) to a string or object representing its map location (route name, city name, etc.).
- [ ] Integrate this mapping into the parsed berry tree data structure, so each parsed berry patch includes its location information.
- [ ] Fallback or handle cases gracefully if an unexpected index is queried.
