---
id: story-089-135-workflow-liveliness-check
type: STORY
title: Workflow Liveliness Check
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-050-089-zombie-node-detection-engine
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Workflow Liveliness Check

## 1. Context
To confirm if an `ACTIVE` node is truly a "zombie", we must cross-reference its validated `jules_session_id` against an external source of truth to check if the session is still running or has terminated (success, failure, or cancelled).

## 2. Requirements
- Implement an API integration (e.g., GitHub Actions API or equivalent) to query the status of a given `jules_session_id`.
- Parse the API response to determine the session's liveliness state.
- Define a clear set of statuses that classify the node's session as active or terminated.

## 3. Acceptance Criteria
- [ ] Implement API query logic using the provided `jules_session_id`.
- [ ] Map the API response states to internal liveliness indicators.
- [ ] Create tests to mock API responses and verify correct liveliness determination.

## 4. Next Steps
- [ ] Break down into Tasks.
