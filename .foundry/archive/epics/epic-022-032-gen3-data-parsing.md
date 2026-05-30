---
id: epic-022-032-gen3-data-parsing
type: EPIC
title: Gen3 Data Parsing Implementation
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-17'
updated_at: '2026-05-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-053-022-gen3-data-parsing
tags:
  - gen3
  - feature
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Breakdown of the Gen3 data parsing into actionable stories.
---

# Epic: Gen3 Data Parsing Implementation

## Objective
Implement data parsers to handle Gen3 format while ensuring backwards compatibility with Gen 1 and Gen 2 logic. Follow ADR-010 to use the native `DataView` API.

## Requirements
- Setup parsing handlers using `DataView` API for Gen3 formats.
- Add bounds checking that correctly handles out-of-bounds reads gracefully as per ADR-010.
- Verify backwards compatibility for legacy interfaces.

- [x] [story-032-059-gen3-dataview-scaffolding](.foundry/stories/story-032-059-gen3-dataview-scaffolding.md)
- [x] [story-032-060-gen3-bounds-checking](.foundry/stories/story-032-060-gen3-bounds-checking.md)
- [x] [story-032-061-gen3-legacy-compatibility](.foundry/stories/story-032-061-gen3-legacy-compatibility.md)
