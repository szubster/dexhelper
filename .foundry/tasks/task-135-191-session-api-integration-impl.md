---
id: task-135-191-session-api-integration-impl
type: TASK
title: Implement API query for jules_session_id liveliness
status: READY
owner_persona: coder
created_at: '2026-06-16'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: null
parent: story-089-135-workflow-liveliness-check
tags:
  - foundry
  - orchestrator
  - api
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Implement API query for jules_session_id liveliness

## 1. Context
We need to determine if a given \`jules_session_id\` is truly active or if it has terminated. To do this, we should query an external API using the session ID.

## 2. Requirements
- Explore the codebase in \`.github/scripts/\` to find the appropriate utility file or create a new one to implement a function that accepts a \`jules_session_id\` and queries the relevant API to check its status.
- Determine the correct authentication mechanism for the external API based on existing patterns in the codebase.
- Parse the API response to determine the session's liveliness state.
- Define a clear set of statuses that classify the node's session as active or terminated.
- If the API call fails or the run is not found, classify it appropriately (e.g. assume it is dead/terminated).

## 3. Acceptance Criteria
- [ ] Implement an async function \`checkSessionLiveliness(sessionId: string): Promise<string>\` or similar that queries the API.
- [ ] Map the API response states to internal liveliness indicators.
- [ ] Ensure the function falls back gracefully if the API fails or rate limits.

## 4. Notes
- Remember that if a transient failure occurs, you must transition this node to \`FAILED\` with a \`rejection_reason\`. If permanent, \`CANCELLED\`.
- If an empty PR is submitted upon completion, all Acceptance Criteria checkboxes must be checked prior to submission.
- Ensure you run tests (\`pnpm test\`) after implementation.
