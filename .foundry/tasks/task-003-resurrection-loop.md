---
id: task-003-resurrection-loop
type: TASK
title: "Resurrection Loop & Rejection Handling"
status: PENDING
owner_persona: tech_lead
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/tasks/task-002-create-heartbeat.md
jules_session_id: null
pr_number: null
parent: .foundry/stories/story-001-matrix-runner.md
---

# Resurrection Loop & Rejection Handling

Logic to recover from failures (detected by Heartbeat) and handle PR rejections (manual CEO action).

## Acceptance Criteria
- [ ] Logic to identify `FAILED` nodes.
- [ ] Increment the `rejection_count` on each "resurrection".
- [ ] Capture the last failure reason (from GH Action logs or PR comments) and inject into the node's `notes`.
- [ ] Transition the node back to `READY` (if dependencies are still met) to allow the Engine to pick it up again.

## Technical Notes
- The "Resurrection Loop" is a key part of the autonomous factory's self-healing capabilities.
- Special care should be taken to avoid infinite loops on "unfixable" nodes (e.g., alert `agile_coach` after 3+ rejections).
