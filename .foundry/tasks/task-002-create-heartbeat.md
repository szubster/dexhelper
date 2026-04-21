---
id: task-002-create-heartbeat
type: TASK
title: "Session Heartbeat & Stale Node Detection"
status: ACTIVE
owner_persona: tech_lead
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/tasks/task-001-create-engine-yaml.md
jules_session_id: "4392356162765776613"
pr_number: null
parent: .foundry/stories/story-001-matrix-runner.md
---

# Session Heartbeat & Stale Node Detection

Logic to monitor `ACTIVE` nodes and detect "zombie" sessions where the GitHub Action run has failed or been cancelled without updating the node status.

## Acceptance Criteria
- [ ] A script (or addition to the orchestrator) that lists all `ACTIVE` nodes.
- [ ] Uses the Jules API to check the status of `jules_session_id`.
- [ ] If the Jules session is in a terminal state (e.g., `FAILED`, `COMPLETED`) and the node is still `ACTIVE`, transition it to `FAILED`.
- [ ] Log stale transitions to the `tpm` journal.

## Technical Notes
- Requires fetching `https://jules.googleapis.com/v1alpha/sessions/<id>` with `X-Goog-Api-Key`.
- Should run frequently (e.g., every 15-30 minutes).
