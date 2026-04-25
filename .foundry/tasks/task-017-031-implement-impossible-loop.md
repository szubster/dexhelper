---
id: task-017-031-implement-impossible-loop
type: TASK
title: "Implement Impossible Loop in Orchestrator"
status: "ACTIVE"
owner_persona: coder
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on:
  - .foundry/tasks/task-017-030-update-schema-rejection-reason.md
jules_session_id: "1689474346637975995"
parent: .foundry/stories/story-011-017-impossible-loop.md
---

# Implement Impossible Loop in Orchestrator

## Details
Update `foundry-orchestrator.ts` to implement the "Impossible Loop". The orchestrator must detect nodes that are in `FAILED` status and have a `rejection_reason`.

## Acceptance Criteria
- [x] The orchestrator detects nodes that are `FAILED` and contain a `rejection_reason` in their frontmatter.
- [x] Upon detecting such a node, the orchestrator "wakes up" the parent node (transitions it to `ACTIVE`) if one exists.
- [x] If no parent exists, the orchestrator flags the node for the `tpm` to create a feedback `IDEA` for the PM/CEO.
