---
id: story-094-152-gen3-friendship-extraction
type: STORY
title: Gen 3 Friendship Data Extraction
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-19'
updated_at: '2026-09-08'
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
locks: []
---
# Gen 3 Friendship Data Extraction

## Description
Implement the logic to extract the Friendship (Happiness) value for Gen 3 Pokémon in both the active Party and PC Boxes. This must handle the 48-byte encrypted Data block and use `PV % 24` to locate the Growth (G) substructure.

## Acceptance Criteria
- [x] Implement Gen 3 Party parsing to extract Friendship (handling PV % 24).
- [x] Implement Gen 3 PC parsing to extract Friendship.
- [x] Ensure `DataView` API is used for rigorous bounds checking (ADR 010).
- [x] Update Gen 3 unit tests to verify the extracted Friendship value.
- [x] task-152-258-gen3-friendship-impl
- [x] task-152-259-gen3-friendship-qa
- [x] research-152-469-investigate-gen3-friendship-failure
- [x] task-152-470-gen3-friendship-impl-v2
- [x] task-152-471-gen3-friendship-qa-v2

- [x] research-152-516-investigate-task-470-failure
- [x] task-152-517-gen3-friendship-impl-v3
- [x] task-152-518-gen3-friendship-qa-v3
