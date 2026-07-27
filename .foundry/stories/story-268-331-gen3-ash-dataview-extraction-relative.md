---
id: story-268-331-gen3-ash-dataview-extraction-relative
type: STORY
title: 'Story: Gen 3 Volcanic Ash Relative Offset Extraction'
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-18'
updated_at: '2026-07-27'
depends_on: []
jules_session_id: '8593193548737036325'
pr_number: null
parent: epic-054-268-gen3-ash-save-parsing
tags:
  - gen3
  - ash
  - save-parsing
research_references:
  - .foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Volcanic Ash Relative Offset Extraction

## Objective
Implement extraction of the Volcanic Ash count from Gen 3 save files using dynamic relative offsets calculated from the `section1Offset`.

## Architectural Constraints
- MUST utilize the `DataView` API for extraction (ADR 010).
- MUST NOT use hardcoded absolute offsets because of the Gen 3 A/B bank rotation system.
- The extraction logic must consult the offsets in `.foundry/docs/knowledge_base/gen3_ash_gathering_offsets.md` to determine the correct offset relative to the dynamically resolved `section1Offset` for each game version (Ruby/Sapphire vs Emerald).

## Acceptance Criteria
- [x] Break down this Story into TASK nodes outlining constants definition and actual extraction logic.
- [ ] task-331-333-gen3-ash-extraction-impl
- [ ] task-331-346-gen3-ash-extraction-impl
