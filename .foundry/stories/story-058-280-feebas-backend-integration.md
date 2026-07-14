---
id: story-058-280-feebas-backend-integration
type: STORY
title: Integrate Feebas Utility into Save Parser
status: READY
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-07-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-036-058-feebas-backend-parsing
tags:
  - gen3
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Integrate Feebas Utility into Save Parser

## Objective
Integrate the Feebas seed extraction and tile calculation utilities (`extractFeebasSeed` and `calculateFeebasTiles`) into the main Gen 3 save parsing pipeline and update the `SaveData` schema to store the calculated coordinates.

## Acceptance Criteria
- [ ] Call `extractFeebasSeed` and `calculateFeebasTiles` within `parseGen3` in `src/engine/saveParser/parsers/gen3.ts`.
- [ ] Update the `SaveData` interface in `src/engine/saveParser/parsers/common.ts` to include the Feebas tile coordinates.
- [ ] Map the calculated coordinates to the updated `SaveData` schema during hydration.
- [ ] Add unit/integration tests to verify Feebas data is correctly populated during save parsing.
- [ ] task-280-304-feebas-backend-integration
- [ ] task-280-305-feebas-backend-integration-qa
