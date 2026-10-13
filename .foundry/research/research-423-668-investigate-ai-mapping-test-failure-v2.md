---
id: research-423-668-investigate-ai-mapping-test-failure-v2
type: RESEARCH
title: Investigate Gen 3 AI Script Mapping E2E Test Failure (Retry)
status: ACTIVE
owner_persona: researcher
created_at: '2026-10-06'
updated_at: '2026-10-09'
depends_on: []
jules_session_id: '12732370451240089722'
pr_number: null
parent: story-411-423-gen3-ai-data-extraction-e2e
tags:
  - gen3
  - ai
  - e2e
  - research
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Gen 3 AI Script Mapping E2E Test Failure (Retry)

## Objective
Investigate the root cause behind the repeated failure of the AI mapping E2E tests and previous research attempts.

## Scope
- Analyze the previous implementations and test execution logs to identify why AI script mapping assertions are failing in the UI.
- Propose a reliable approach or fix for asserting AI script and level mapping in Playwright.

## Findings
The previous E2E implementation task failed because the mock fixture provided for Gen 3 AI extraction (`emerald.sav`) does not actually generate the required "AI script" or "AI level" data within the UI during test execution.
Specifically, the test `tests/e2e/gen3_ai_data_extraction.spec.ts` attempts to verify Opponent and Trainer data, but the UI does not render mapping fields for AI scripts unless the underlying mock API explicitly intercepts and provides those details.

## Solution
To solve this issue, the mock environment setup in the E2E test needs to intercept the AI Assistant API requests and explicitly return the required AI script mapping and level data for opponents in the response payload. The E2E tests must be updated to:
1. Intercept network requests to the relevant AI assistant endpoints.
2. Return a mocked JSON response containing the mapped AI script and AI level.
3. Assert that the UI correctly displays these fields.

## Acceptance Criteria
- [x] Root cause of the E2E test failure is identified and documented.
- [x] A reliable solution or fix is proposed for asserting the AI mapping in the UI.
