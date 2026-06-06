---
id: story-055-095-gen3-berry-patch-parsing
type: STORY
title: Gen 3 Berry Patch Parsing
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-06'
updated_at: '2026-06-06'
depends_on: []
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

# Story: Gen 3 Berry Patch Parsing

## Overview
This Story breaks down the Berry Patch data extraction defined in Epic 055 into technical tasks.

## Acceptance Criteria
- [ ] Implement `DataView`-based parsing logic for Gen 3 berry patch data.
- [ ] Handle bounds checking gracefully (e.g., throwing and catching `RangeError` on out-of-bounds reads).
- [ ] Extract map location, berry ID, growth stage, and time metadata.
- [ ] Serialize the extracted data using `msgpackr` and integrate with the runtime data API.
