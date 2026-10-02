---
id: research-406-638-investigate-gen3-rematch-e2e-failure
type: RESEARCH
title: Investigate Gen 3 Rematch E2E Failure
status: READY
owner_persona: researcher
created_at: '2026-09-22'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-397-406-gen3-npc-rematch-status
tags:
  - research
  - gen3
  - rematch
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# RESEARCH: Investigate Gen 3 Rematch E2E Failure

## Context
The Playwright E2E tests for the Gen 3 NPC Rematch feature (`task-406-528-gen3-rematch-e2e-impl`) failed permanently by reaching the max rejection count. We need to investigate the root cause of this failure before attempting a retry.

## Objectives
- Review the test logs, implementation (`task-406-527-gen3-rematch-ui-impl`), and previous QA attempts.
- Identify why the E2E tests failed (e.g., UI rendering issues, timeout, selector issues, missing setup).
- Provide actionable findings and instructions for the follow-up tasks to implement the retry correctly.

## Acceptance Criteria
- [x] Determine the root cause of the E2E test failure.
- [x] Document the findings clearly in this node.

## Findings
The Playwright E2E tests for the Gen 3 NPC Rematch feature (`task-406-528-gen3-rematch-e2e-impl`) failed due to an issue with the test data (`tests/fixtures/emerald.sav`) not satisfying the component's rendering conditions.

The `Gen3SecretBaseDashboard` component (`src/components/dashboard/secret-base/Gen3SecretBaseDashboard.tsx`) includes the following early return logic:

```typescript
if (saveData.generation !== 3 || !saveData.gen3SecretBases || saveData.gen3SecretBases.length === 0) {
  return null;
}
```

When parsing the `emerald.sav` fixture, the `gen3SecretBases` array is correctly initialized but is empty (`[]`). Because of this, the component returns `null` and never renders the `"SECRET BASE REMATCHES"` text on the DOM. Consequently, the Playwright locator `.getByText(/SECRET BASE REMATCHES/i)` times out and fails.

### Actionable Fix Instructions
To resolve this issue, the follow-up E2E implementation task MUST inject mock state with valid `gen3SecretBases` directly into the globally exposed Zustand store before executing the assertion.

For example, using the `page.evaluate()` block:

```typescript
await page.evaluate(() => {
  const store = (window as typeof window & { __store: () => any }).__store();
  store.setSaveData({
    ...store.saveData,
    gen3SecretBases: [
      {
        trainerName: 'MOCK TRAINER',
        battledOwnerToday: false,
      }
    ],
    gen3TrainerRematchFlags: [1]
  });
});
```
