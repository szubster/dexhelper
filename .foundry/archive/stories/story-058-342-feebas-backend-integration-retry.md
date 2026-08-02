---
id: story-058-342-feebas-backend-integration-retry
type: STORY
title: Integrate Feebas Utility into Save Parser (Retry)
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-25'
updated_at: '2026-08-01'
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

# Integrate Feebas Utility into Save Parser (Retry)

## Objective
Re-verify and ensure complete integration of the Feebas seed extraction and tile calculation utilities into the main Gen 3 save parsing pipeline, as the previous integration story was archived but the epic still demands it.

## Acceptance Criteria
- [x] Verify `extractFeebasSeed` and `calculateFeebasTiles` are called correctly within `parseGen3`.
- [x] Ensure the calculated coordinates are mapped to the updated `SaveData` schema during hydration.

- [x] .foundry/archive/tasks/task-342-369-feebas-coordinates-impl.md
- [x] .foundry/archive/tasks/task-342-370-feebas-coordinates-qa.md
