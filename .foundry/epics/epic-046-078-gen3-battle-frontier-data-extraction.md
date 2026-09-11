---
id: epic-046-078-gen3-battle-frontier-data-extraction
type: EPIC
title: Gen 3 Battle Frontier Data Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-11'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: '9562732056147911685'
pr_number: null
parent: prd-074-046-gen3-battle-frontier-tracker
tags:
  - feature
  - gen3
  - endgame
research_references:
  - research-046-140-gen3-battle-frontier
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---
# Epic: Gen 3 Battle Frontier Data Extraction

## Description
Extend the Gen 3 save parser to extract Battle Frontier data using the offsets discovered in the research phase. It must strictly use the `DataView` API as per ADR 010.

## Acceptance Criteria
- [x] Parse win streaks, max records, and symbol status for all 7 facilities.
- [x] Parse total BP.
- [x] Handle out-of-bounds reads gracefully via `DataView`.
- [x] story-078-121-gen3-parse-battle-frontier-win-streaks
- [x] story-078-122-gen3-parse-battle-frontier-symbols
- [x] story-078-123-gen3-parse-battle-points
- [x] research-078-150-rs-battle-tower-data
- [ ] story-078-558-rs-battle-tower-data-parsing
- [ ] story-078-559-battle-frontier-data-e2e-verification
