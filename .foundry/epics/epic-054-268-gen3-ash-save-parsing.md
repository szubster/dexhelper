---
id: epic-054-268-gen3-ash-save-parsing
type: EPIC
title: 'Epic: Gen 3 Volcanic Ash Save Parsing'
status: PENDING
owner_persona: story_owner
created_at: '2026-07-17'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-089-054-gen3-ash-gathering-tracker
tags:
  - gen3
  - save-parsing
  - ash
research_references:
  - .foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Volcanic Ash Save Parsing

## Objective
Extract the Volcanic Ash count (step counter) from Gen 3 save files (Ruby, Sapphire, Emerald) utilizing the exact memory offsets documented in \`.foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md\`.

## Architectural Constraints
- **DataView API:** All parsing logic MUST utilize the \`DataView\` API to enforce bounds checking and prevent silent failures, as mandated by ADR 010.
- **Relative Offsets:** The parsing implementation must calculate offsets relative to the dynamically resolved \`section1Offset\` rather than using absolute hardcoded offsets.

## Technical Requirements
- Implement extraction logic for the Volcanic Ash count based on the player's save version (Ruby/Sapphire vs Emerald).
- Expand the \`PokeData\` save parsing output to include the \`volcanicAsh\` count property for Gen 3 states.

## Acceptance Criteria
- [x] Break down this Epic into corresponding STORY nodes.
- [x] [story-268-331-gen3-ash-dataview-extraction-relative](.foundry/archive/story-268-331-gen3-ash-dataview-extraction-relative.md)
- [ ] [story-268-348-gen3-ash-integration](.foundry/stories/story-268-348-gen3-ash-integration.md)
