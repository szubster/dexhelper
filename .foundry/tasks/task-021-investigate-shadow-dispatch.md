---
id: task-021-investigate-shadow-dispatch
type: TASK
title: "Document Shadow Dispatch Verification Findings"
status: "FAILED"
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-004-shadow-dispatch-verification.md
tags: ["orchestrator", "concurrency", "investigation"]
rejection_count: 0
notes: ""
---

# Task: Document Shadow Dispatch Verification Findings

## Context & Findings
The story requested an investigation into whether "Shadow Dispatch" is actually a problem in practice, given the orchestrator's concurrency and locking mechanisms.
Initial architectural review by the Tech Lead suggests that Shadow Dispatch is implicitly prevented:
1. The `foundry-engine.yml` workflow explicitly transitions nodes to `ACTIVE` and pushes this state directly to the `main` branch immediately after spawning a session.
2. Therefore, `main` does not lack visibility into the `ACTIVE` state. The orchestrator (running on `main`) will correctly see the node as `ACTIVE` and will not re-dispatch it in subsequent runs.
3. The only potential for duplicate dispatch is if two `foundry-engine.yml` workflows run concurrently and evaluate the node's state before either pushes the `ACTIVE` transition. This can be resolved trivially using GitHub Actions `concurrency` groups (e.g., `concurrency: group: foundry-engine`), rendering a complex GitHub PR inspection system unnecessary.

## Acceptance Criteria
- [ ] Verify the Tech Lead's findings regarding the `foundry-engine.yml` concurrency behavior.
- [ ] Update the acceptance criteria checkboxes in `.foundry/stories/story-004-shadow-dispatch-verification.md` to marked as completed.
- [ ] Append a summary of these findings to the bottom of the `.foundry/stories/story-004-shadow-dispatch-verification.md` body.
- [ ] Conclude in the documentation whether full implementation of GitHub PR inspection and Session Verification is actually necessary.
