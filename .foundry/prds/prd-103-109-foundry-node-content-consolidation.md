---
id: prd-103-109-foundry-node-content-consolidation
type: PRD
title: Foundry Node and Prompt Content Consolidation
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on:
  - task-103-304-propose-dynamic-policy-injection-adr
jules_session_id: null
pr_number: null
parent: idea-103-foundry-node-content-consolidation
tags:
  - foundry
  - agents
  - meta
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Foundry Node and Prompt Content Consolidation

## 1. Context & Motivation
A significant amount of content in Foundry nodes (TASKS, STORIES) and persona prompts is redundant. This includes boilerplate reminders about transient failures, empty PR policies, and environment setup instructions. This duplication leads to "prompt rot", increases token usage, and makes it difficult to update policies consistently across the system.

## 2. Product Requirements
We need to consolidate repeated content into centralized locations and use dynamic policy injection (defined by the Architect in `task-103-304-propose-dynamic-policy-injection-adr`) to streamline nodes.

- **Centralized Policies**: Move common instructions and reminders to centralized documentation or configuration.
- **Dynamic Injection**: Implement the mechanism proposed in the ADR to inject these policies into nodes or agent contexts dynamically.
- **Clean Node Templates**: Update the node templates to remove the boilerplate and rely on the new injection mechanism.

## 3. Scope & Constraints
- Must depend on the outcome of `task-103-304-propose-dynamic-policy-injection-adr.md`.
- Should reduce token usage and improve prompt maintainability.

## 4. Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into manageable Epics based on the Architect's ADR.
