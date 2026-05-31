---
id: prd-063-034-permanent-failure-dashboard
type: PRD
title: Permanent Failure Dashboard View
status: READY
owner_persona: epic_planner
created_at: '2026-05-22'
updated_at: '2026-05-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-063-permanent-failure-dashboard
tags:
  - foundry
  - ui
  - dashboard
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# PRD: Permanent Failure Dashboard View

## Context
While analyzing recent runs, it was observed that tasks like `task-062-100-gen3-locations-script-impl.md` can fail permanently (reaching Max Rejection Count) and enter an "Impossible Loop" where the parent node needs to be awakened. Currently, there is no easy way for the team (or the Tech Lead) to see at a glance which nodes have failed permanently.

## Proposal
Create a dedicated "Permanent Failures" view or filter within the DAG Dashboard.
- The UI should highlight nodes that have a `status: FAILED` and `rejection_count` equal to or greater than the maximum threshold.
- This will allow the Tech Lead or Product Manager to quickly identify deadlocks and spawn the necessary `RESEARCH` nodes to resolve them.

## Next Steps
- [x] Epic Planner: Create Epics for the permanent failure dashboard feature.

### Downstream Epics
- `.foundry/epics/epic-034-046-dag-data-parsing-rejection-count.md`
- `.foundry/epics/epic-034-047-permanent-failure-dashboard-ui.md`
