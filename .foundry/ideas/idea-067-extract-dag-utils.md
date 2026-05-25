---
id: idea-067-extract-dag-utils
type: IDEA
title: Extract DAG Utilities to Shared Module
status: PENDING
owner_persona: product_manager
created_at: "2026-05-25"
updated_at: "2026-05-25"
depends_on: []
jules_session_id: null
parent: null
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ""
notes: "Generated autonomously to reduce duplication in orchestration scripts"
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
- [ ] Product Manager: Evaluate this proposal and convert it to a PRD detailing the specific functions to be extracted and the testing strategy.
