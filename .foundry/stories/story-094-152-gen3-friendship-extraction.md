---
id: story-094-152-gen3-friendship-extraction
type: STORY
title: Gen 3 Friendship Data Extraction
status: READY
owner_persona: tech_lead
created_at: '2026-06-19'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-051-094-friendship-data-extraction
tags:
  - gen3
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Gen 3 Friendship Data Extraction

## Description
Implement the logic to extract the Friendship (Happiness) value for Gen 3 Pokémon in both the active Party and PC Boxes. This must handle the 48-byte encrypted Data block and use `PV % 24` to locate the Growth (G) substructure.

## Acceptance Criteria
- [ ] Implement Gen 3 Party parsing to extract Friendship (handling PV % 24).
- [ ] Implement Gen 3 PC parsing to extract Friendship.
- [ ] Ensure `DataView` API is used for rigorous bounds checking (ADR 010).
- [ ] Update Gen 3 unit tests to verify the extracted Friendship value.
- [x] task-152-258-gen3-friendship-impl
- [x] task-152-259-gen3-friendship-qa
- [ ] research-152-469-investigate-gen3-friendship-failure
- [ ] task-152-470-gen3-friendship-impl-v2
- [ ] task-152-471-gen3-friendship-qa-v2
