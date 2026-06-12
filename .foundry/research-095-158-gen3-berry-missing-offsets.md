---
id: research-095-158-gen3-berry-missing-offsets
type: RESEARCH
title: Investigate Missing Gen 3 Berry Patch Offsets (Map ID, Time Planted, Last Watered)
status: READY
owner_persona: researcher
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - research
  - gen3
  - berries
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Missing Gen 3 Berry Patch Offsets

## Context
During the implementation of `task-095-157-gen3-berry-dataview-parsing`, the PRD required the extraction of `map ID`, `time planted`, and `last watered time` for berry patches.
However, the knowledge base (`gen3_berry_patch_offsets.md`) only documents `berry ID`, `stage`, `stopGrowth`, `minutesUntilNextStage`, `berryYield`, `regrowthCount`, and `watered` stages. The exact memory offsets and block structures for the requested fields are missing.

## Requirements
- Investigate where `map ID`, `time planted`, and `last watered time` are stored in the Gen 3 save format.
- Document the exact byte offsets, types, and bitwise logic necessary to extract these fields.
- Determine if `map ID` is implicit (based on the array index) or stored explicitly.
- Determine if `time planted` and `last watered time` can be derived from existing fields or are stored separately.
