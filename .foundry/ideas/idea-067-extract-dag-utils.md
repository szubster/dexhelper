---
id: idea-067-extract-dag-utils
type: IDEA
title: Extract DAG Utilities to Shared Module
status: COMPLETED
owner_persona: auditor
created_at: '2026-05-25'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
parent: null
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 1
rejection_reason: ''
notes: Generated autonomously to reduce duplication in orchestration scripts
---

# Extract DAG Utilities to Shared Module

## Context
As the Foundry engine has grown, complex logic related to DAG resolution (e.g., parsing nodes, building reverse dependency graphs, and transitioning nodes) has been duplicated across multiple scripts within `.github/scripts/`, most notably between `foundry-orchestrator.ts` and `foundry-heartbeat.ts`. This duplication increases maintenance overhead and the risk of divergent behaviour (such as the recent Impossible Loop handling discrepancies).

## Proposal
Create a shared utility module (e.g., `dag-utils.ts`) within the `.github/scripts/` directory to encapsulate core DAG operations.
Operations to extract include:
- Building reverse dependency graphs.
- Identifying and traversing orphaned nodes.
- Standardizing the `transitionNodeToFailed`, `transitionNodeToCompleted`, and `transitionNodeToReady` functions to ensure they uniformly apply ADR 006 (`gray-matter`) and appropriately append metadata like `rejection_reason`.

## Next Steps
- [x] Product Manager: Evaluate this proposal and convert it to a PRD detailing the specific functions to be extracted and the testing strategy.

## References
- [prd-067-036-extract-dag-utils.md](./.foundry/prds/prd-067-036-extract-dag-utils.md)

### Auditor Rejection
The child PRD (`prd-067-036-extract-dag-utils`) was permanently CANCELLED because one of its child epics (`epic-036-053-shared-dag-utilities`) reached the max rejection count and permanently failed. Therefore, the functional requirements of this IDEA node were not fully implemented.

The Product Manager must apply the Impossible Loop Policy to handle the permanent failure of the child node.
