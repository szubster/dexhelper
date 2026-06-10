---
id: prd-072-045-strict-macro-node-completion
type: PRD
title: Strict Macro Node Completion Enforcement
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-072-strict-macro-node-completion
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Strict Macro Node Completion Enforcement

## Context
Macro generation nodes (like `IDEA` or `PRD` nodes) are currently transitioning to `VERIFYING` prematurely. They transition right after spawning their first set of child nodes, despite those children (and their descendants) still being in `PENDING` or `ACTIVE` states.

## Objective
Enforce the rule that a macro node (IDEA, PRD, EPIC, STORY) MUST NOT be verified until its functional requirements are implemented and merged by its downstream child tasks. All generated descendant nodes must fully transition to `COMPLETED` before the parent can be transitioned to `COMPLETED`.

## Requirements
1.  **DAG Orchestrator Updates**: Update `.github/scripts/foundry-orchestrator.ts` to implement strict hierarchical completion checks. A node cannot transition to `VERIFYING` or `COMPLETED` if any of its generated child nodes (identified via the `parent` field of those children, or via references in the markdown body) are not `COMPLETED`.
2.  **Documentation Updates**: Update schema rules, `the-foundry-architecture.md` (ADR 001), and any relevant knowledge base articles to explicitly outline this new behavior.

## Acceptance Criteria
- [x] Epic Planner: Break down this PRD into Epics.


### Generated Epics
- [ ] .foundry/epics/epic-045-070-orchestrator-strict-completion.md
- [ ] .foundry/epics/epic-045-071-documentation-macro-node-completion.md
