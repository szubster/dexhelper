---
id: epic-046-078-gen3-battle-frontier-data-extraction
type: EPIC
title: Gen 3 Battle Frontier Data Extraction
status: PENDING
owner_persona: story_owner
created_at: '2026-06-11'
updated_at: '2026-07-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-074-046-gen3-battle-frontier-tracker
tags:
  - feature
  - gen3
  - endgame
research_references:
  - research-046-140-gen3-battle-frontier
rejection_count: 1
rejection_reason: ''
notes: ''
---
# Epic: Gen 3 Battle Frontier Data Extraction

## Description
Extend the Gen 3 save parser to extract Battle Frontier data using the offsets discovered in the research phase. It must strictly use the `DataView` API as per ADR 010.

## Acceptance Criteria
- [ ] Parse win streaks, max records, and symbol status for all 7 facilities.
- [x] Parse total BP.
- [x] Handle out-of-bounds reads gracefully via `DataView`.
- [x] story-078-121-gen3-parse-battle-frontier-win-streaks
- [x] story-078-122-gen3-parse-battle-frontier-symbols
- [x] story-078-123-gen3-parse-battle-points
- [ ] research-078-150-rs-battle-tower-data

### Auditor Rejection
The node cannot be fully completed because we identified an unresolved gap during verification: Ruby/Sapphire saves technically contain Battle Tower data, but the current Gen 3 parser logic explicitly skips Battle Frontier extraction for anything other than Emerald. A new research node (`research-078-150-rs-battle-tower-data`) has been spawned to investigate the precise offsets and data structure for Ruby/Sapphire Battle Tower streaks/records to determine if they can be incorporated. Please resolve this missing functionality.
