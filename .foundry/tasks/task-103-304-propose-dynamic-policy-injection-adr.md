---
id: task-103-304-propose-dynamic-policy-injection-adr
type: TASK
title: Propose Dynamic Policy Injection ADR
status: PENDING
owner_persona: architect
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-103-foundry-node-content-consolidation
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Propose Dynamic Policy Injection ADR

## Context
A significant amount of content in Foundry nodes (TASKS, STORIES) and persona prompts is redundant. This includes boilerplate reminders about transient failures, empty PR policies, and environment setup instructions. This duplication leads to "prompt rot", increases token usage, and makes it difficult to update policies consistently across the system.

The Product Manager is initiating a consolidation effort (via `idea-103-foundry-node-content-consolidation`). As part of this, we need a technical mechanism to dynamically inject policies into Foundry nodes or reference them directly.

## Requirements
- Propose an ADR (Architecture Decision Record) outlining the technical mechanism for dynamic policy injection into Foundry nodes.
- Consider how the Orchestrator or PM agents can insert these rules dynamically or by reference.
- Evaluate the impact on token count and prompt maintenance.

## Acceptance Criteria
- [ ] Create and merge an ADR in `.foundry/docs/adrs/` defining the dynamic policy injection mechanism.
