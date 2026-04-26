---
id: task-017-032-qa-impossible-loop
type: TASK
title: "QA Impossible Loop Orchestrator Logic"
status: READY
owner_persona: qa
created_at: "2026-04-25"
updated_at: "2026-04-26"
depends_on:
  - .foundry/tasks/task-017-031-implement-impossible-loop.md
jules_session_id: null
parent: .foundry/stories/story-011-017-impossible-loop.md
---

# QA Impossible Loop Orchestrator Logic

## Details
Verify that `foundry-orchestrator.test.ts` correctly tests the new "Impossible Loop" logic implemented in `foundry-orchestrator.ts`.

## Acceptance Criteria
- [ ] `foundry-orchestrator.test.ts` includes tests for detecting a `FAILED` node with a `rejection_reason`.
- [ ] `foundry-orchestrator.test.ts` includes tests verifying the parent node is transitioned to `ACTIVE`.
- [ ] `foundry-orchestrator.test.ts` includes tests verifying that an orchestrator flags a failure if no parent exists.
