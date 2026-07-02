---
id: story-078-123-gen3-parse-battle-points
type: STORY
title: Gen 3 Parse Total Battle Points
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-12'
updated_at: '2026-07-02'
depends_on:
  - story-078-122-gen3-parse-battle-frontier-symbols
jules_session_id: '10222621611499379604'
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

# Gen 3 Parse Total Battle Points

## Description
Extract the total accumulated Battle Points (BP) from SaveBlock2 using `DataView`, based on the offset research in `research-046-140-gen3-battle-frontier`.

## Acceptance Criteria
- [ ] Parse total BP correctly.
- [ ] Implement error handling for out-of-bounds reads.
- [ ] task-123-240-gen3-parse-battle-points-impl
- [ ] task-123-241-gen3-parse-battle-points-qa
