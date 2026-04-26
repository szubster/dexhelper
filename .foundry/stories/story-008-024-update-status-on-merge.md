---
id: "story-008-024-update-status-on-merge"
type: "STORY"
title: "Update Node Status on PR Merge"
status: "COMPLETED"
owner_persona: "tech_lead"
created_at: "2026-04-25"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/epics/epic-008-atomic-handoff-orchestrator.md"
---

# Update Node Status on PR Merge

## Context
The orchestrator must correctly mark nodes as `COMPLETED` when their respective GitHub PR is merged, ensuring that the DAG can progress automatically.

## Acceptance Criteria
- [x] The GitHub Action workflow or orchestrator script correctly identifies when a PR is merged.
- [x] The node associated with the merged PR is transitioned to `COMPLETED` status.
- [x] Tests verify that the node status updates correctly upon PR merge.

### Generated Tasks
- `.foundry/tasks/task-024-041-update-status-on-merge.md`
- `.foundry/tasks/task-024-042-qa-update-status-on-merge.md`
