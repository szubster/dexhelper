---
id: idea-059-orchestrator-auto-cancel-orphaned-nodes
type: IDEA
title: Auto-Cancel Orphaned PENDING Nodes in Orchestrator
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-20'
updated_at: '2026-05-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - dag
  - orchestrator
  - cancellation
research_references: []
notes: ''
rejection_reason: ''
---

# Auto-Cancel Orphaned PENDING Nodes in Orchestrator

## Description
Currently, when a child node (like an implementation TASK) permanently fails by reaching its Max Rejection Count, the Orchestrator's "Impossible Loop" wakes up the parent node (e.g., STORY). The parent must then spawn a RESEARCH node and new implementation tasks.

However, any sibling QA tasks that depended on the permanently failed implementation task become "orphaned" in a `PENDING` state. Manually finding and updating the markdown of these orphaned QA nodes places an unnecessary burden on the planning personas (`tech_lead` and `story_owner`) and clutters the DAG.

We should enhance the Foundry Orchestrator (`.github/scripts/foundry-orchestrator.ts`) to automatically detect these orphaned `PENDING` nodes.

## Proposed Solution
If a node enters the `FAILED` state with `rejection_reason: 'Max rejection count reached'`, the orchestrator should automatically transition any `PENDING` node that lists the failed node in its `depends_on` array to `CANCELLED`. This cascading cancellation should log an appropriate reason (e.g., "Cancelled due to permanent failure of dependency").

## Acceptance Criteria
- [x] Orchestrator detects `PENDING` nodes depending on a permanently failed node (`Max rejection count reached`).
- [x] Orchestrator automatically transitions these orphaned nodes to `CANCELLED`.
- [x] The `foundry-orchestrator.test.ts` includes a unit test for this behavior.

### Generated Nodes
- .foundry/prds/prd-059-028-orchestrator-auto-cancel-orphaned-nodes.md
