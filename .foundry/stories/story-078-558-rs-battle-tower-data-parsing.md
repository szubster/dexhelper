---
id: story-078-558-rs-battle-tower-data-parsing
type: STORY
title: Ruby/Sapphire Battle Tower Data Parsing
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-08'
updated_at: '2026-09-11'
depends_on:
  - research-078-150-rs-battle-tower-data
jules_session_id: '7184228237724110027'
pr_number: null
parent: epic-046-078-gen3-battle-frontier-data-extraction
tags:
  - feature
  - gen3
  - endgame
research_references:
  - research-078-150-rs-battle-tower-data
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Ruby/Sapphire Battle Tower Data Parsing

## Description
Implement the extraction of Battle Tower win streaks and records for Ruby/Sapphire saves using `DataView`. As discovered in `.foundry/research/research-078-150-rs-battle-tower-data.md`, this requires a distinct parser block as the structure and offsets are different from Emerald.

## Acceptance Criteria
- [ ] Implement data extraction for Level 50 and Level 100 win streaks in Ruby/Sapphire.
- [ ] Implement data extraction for Level 50 and Level 100 max win records in Ruby/Sapphire.
- [ ] Gracefully integrate this parsing logic alongside the existing Emerald Battle Frontier parser.
- [ ] Ensure out-of-bounds reads are handled gracefully via `DataView`.
