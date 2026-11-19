---
id: story-522-738-gen3-dataview-relative-offsets
type: STORY
title: Gen 3 Relative Section Offset Resolution
status: READY
owner_persona: tech_lead
created_at: '2026-11-04'
updated_at: '2026-11-04'
depends_on:
  - story-522-737-gen3-dataview-core-class
jules_session_id: null
pr_number: null
parent: epic-158-522-gen3-dataview-extender
tags:
  - dataview
  - gen3
  - save-parser
research_references: []
rejection_reason: ''
locks: []
---

# Story: Gen 3 Relative Section Offset Resolution

## Description
Implement the complex relative section offset resolution logic specific to Generation 3's A/B bank flash memory system within the `Gen3SaveDataReader`.

## Acceptance Criteria
- [ ] Implement A/B bank flash memory detection
- [ ] Develop logic to resolve relative section offsets (SaveBlock1, SaveBlock2)
- [ ] Handle potential edge cases in flash memory layout
- [ ] Write unit tests to verify offset resolution logic
