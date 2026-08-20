---
id: task-420-428-gen3-narrative-extraction
type: TASK
title: Implement Gen 3 Narrative Progression Flag Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-08-14'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '1942354124259222836'
pr_number: null
parent: story-411-420-narrative-progression-flags
tags:
  - extraction
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Narrative Progression Flag Extraction

## Objective
Implement logic to extract and parse narrative/story progression flags from Generation 3 save files (Ruby, Sapphire, Emerald, FireRed, LeafGreen) and determine upcoming major bosses.

## Context
The player's story progression and defeated major bosses are stored in event flags. We need to parse these to track narrative progress.

## Acceptance Criteria
- [ ] Implement parsing for Gen 3 story progression event flags.
- [ ] Implement logic to determine the upcoming major boss based on the parsed progression flags.
- [ ] Add unit tests verifying correct extraction of Gen 3 narrative progression flags.
