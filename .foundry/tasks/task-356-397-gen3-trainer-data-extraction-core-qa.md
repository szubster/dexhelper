---
id: task-356-397-gen3-trainer-data-extraction-core-qa
type: TASK
title: QA Core Gen 3 Trainer Data Extraction
status: PENDING
owner_persona: qa
created_at: '2026-08-04'
updated_at: '2026-08-04'
depends_on: ["task-356-396-gen3-trainer-data-extraction-core-impl"]
jules_session_id: null
pr_number: null
parent: story-346-356-gen3-trainer-data-extraction-core
tags:
  - feature
  - gen3
  - trainer
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Core Gen 3 Trainer Data Extraction

## Objective
Verify the implementation of Trainer ID and Secret ID extraction for Gen 3 save files.

## Requirements
- Review the code changes in `src/engine/saveParser/parsers/common.ts` and `src/engine/saveParser/parsers/gen3.ts`.
- Ensure `secretId` is correctly added to the `SaveData` interface and returned by `parseGen3Save`.
- Verify that no regressions were introduced.

## Acceptance Criteria
- [ ] QA: Verify `secretId` is present in `SaveData`.
- [ ] QA: Verify `secretId` is returned by `parseGen3Save`.
- [ ] QA: Verify tests pass (`pnpm lint && pnpm test`).
