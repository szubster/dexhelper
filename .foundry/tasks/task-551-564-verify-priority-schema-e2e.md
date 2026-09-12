---
id: task-551-564-verify-priority-schema-e2e
type: TASK
title: Implement and Verify Priority Field Sorting
status: READY
owner_persona: coder
created_at: '2026-09-09'
updated_at: '2026-09-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-530-551-integration-e2e-verification
tags:
  - e2e
  - integration
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Priority Field Sorting E2E Verification

## Description
This task acts as an E2E verification step to guarantee that the newly added `priority` field in the node schema integrates smoothly with the orchestrator, and that no logic is broken during processing or validation.
The implementation of the `priority` field logic itself is assumed to have been handled by its prerequisite story.

## Acceptance Criteria
- [ ] Write E2E integration tests in `.github/scripts/schema-e2e.test.ts` or `.github/scripts/foundry-orchestrator.test.ts` as appropriate.
- [ ] Verify that orchestrator flows behave correctly with nodes lacking a `priority` field (testing backward compatibility and defaults).
- [ ] Verify that orchestrator flows accurately parse and handle nodes containing valid and invalid `priority` values.
