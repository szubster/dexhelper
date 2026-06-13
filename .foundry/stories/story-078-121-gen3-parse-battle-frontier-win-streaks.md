---
id: story-078-121-gen3-parse-battle-frontier-win-streaks
type: STORY
title: Gen 3 Parse Battle Frontier Win Streaks
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on:
  - research-046-140-gen3-battle-frontier
jules_session_id: null
pr_number: null
parent: epic-046-078-gen3-battle-frontier-data-extraction
tags:
  - feature
  - gen3
  - endgame
research_references:
  - research-046-140-gen3-battle-frontier
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Parse Battle Frontier Win Streaks

## Description
Based on the offset research in `research-046-140-gen3-battle-frontier`, extract the current and max win streaks for the 7 Battle Frontier facilities from SaveBlock2 using `DataView`.

## Acceptance Criteria
- [ ] Extract current win streaks for Tower, Dome, Palace, Arena, Factory, Pike, and Pyramid.
- [ ] Extract max win records for all 7 facilities.
- [ ] Implement error handling for out-of-bounds reads.
