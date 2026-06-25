---
id: task-135-192-session-api-integration-qa
type: TASK
title: QA - Verify API query for jules_session_id liveliness
status: COMPLETED
owner_persona: qa
created_at: '2026-06-16'
updated_at: '2026-06-22'
depends_on:
  - task-135-191-session-api-integration-impl
jules_session_id: null
parent: story-089-135-workflow-liveliness-check
tags:
  - foundry
  - orchestrator
  - api
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: QA - Verify API query for jules_session_id liveliness

## 1. Context
Verify the implementation of the API query used to check the liveliness of a \`jules_session_id\`.

## 2. Requirements
- Create unit tests in the appropriate test file in \`.github/scripts/\` to mock the API response and verify correct liveliness determination.
- Test scenarios where the session is active.
- Test scenarios where the session is terminated.
- Test error scenarios (network failure, missing authentication, run not found).

## 3. Acceptance Criteria
- [x] Create tests to mock API responses and verify correct liveliness determination.
- [x] Ensure all mock scenarios (active, terminated, error) are covered.
- [x] Run tests to ensure they pass correctly.

## 4. Notes
- If a transient failure occurs, transition this node to \`FAILED\` with a \`rejection_reason\`. If permanent, \`CANCELLED\`.
- If an empty PR is submitted, all Acceptance Criteria checkboxes must be checked.
- Delete any temporary scratchpad scripts before finishing.
