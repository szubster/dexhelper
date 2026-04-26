---
id: "story-008-024-update-status-on-merge"
type: "STORY"
title: "Update Node Status on PR Merge"
status: "ACTIVE"
owner_persona: "tech_lead"
created_at: "2026-04-25"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: "13164530238462003388"
parent: ".foundry/epics/epic-008-atomic-handoff-orchestrator.md"
---

# Update Node Status on PR Merge

## Context
The orchestrator must correctly mark nodes as `COMPLETED` when their respective GitHub PR is merged, ensuring that the DAG can progress automatically.

## Acceptance Criteria
- [ ] The GitHub Action workflow or orchestrator script correctly identifies when a PR is merged.
- [ ] The node associated with the merged PR is transitioned to `COMPLETED` status.
- [ ] Tests verify that the node status updates correctly upon PR merge.
