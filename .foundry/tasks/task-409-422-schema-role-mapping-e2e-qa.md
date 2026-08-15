---
id: task-409-422-schema-role-mapping-e2e-qa
type: TASK
title: Schema Role and Status Mapping E2E Verification
status: ACTIVE
owner_persona: qa
created_at: '2026-08-13'
updated_at: '2026-08-15'
depends_on:
  - task-408-418-schema-role-mapping-qa
  - task-408-419-schema-status-mapping-qa
jules_session_id: '5603568255521294227'
pr_number: null
parent: story-405-409-schema-role-mapping-e2e
tags:
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Schema Role and Status Mapping E2E Verification

## Objective
Verify that the schema mappings have been applied successfully and don't introduce any logical regression or break internal tools.

## Technical Specifications
- Verify that the `owner_persona` field in all node types correctly utilizes the mapped Gen 1 roles (if they replaced the original roles) or verify they still use the original 13 roles while the documentation reflects the mapping.
- Verify that the `status` field still correctly transitions through the defined DAG lifecycle without breaking the orchestrator logic.
- E2E testing to ensure internal tools or GitHub actions (like `foundry-orchestrator.ts`) still parse the nodes correctly without validation errors due to the updated schema documentation.

## Acceptance Criteria
- [x] QA: Verify `schema.md` changes don't cause orchestrator parse failures on new nodes.
- [x] QA: Run all orchestrator unit tests (`cd .github/scripts && pnpm install && npx vitest`) and confirm they pass.
