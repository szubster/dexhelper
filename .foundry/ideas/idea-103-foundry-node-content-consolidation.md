---
id: idea-103-foundry-node-content-consolidation
type: IDEA
title: Foundry Node and Prompt Content Consolidation
status: PENDING
owner_persona: product_manager
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - agents
  - meta
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Foundry Node and Prompt Content Consolidation

## Context
A significant amount of content in Foundry nodes (TASKS, STORIES) and persona prompts is redundant. This includes boilerplate reminders about transient failures, empty PR policies, and environment setup instructions. This duplication leads to "prompt rot", increases token usage, and makes it difficult to update policies consistently across the system.

## Proposal
Analyze and consolidate repeated content into centralized locations.
- Identify common "Mandates", "Reminders", and "Instructions" that appear across multiple TASK and STORY nodes.
- Leverage `.foundry/docs/knowledge_base/agents/core_policies.md` more effectively by referencing it instead of duplicating its content in every agent prompt.
- Create a shared "Node Templates" or "Policy Injection" mechanism so that the Orchestrator or PM agents can insert these rules dynamically or by reference.
- Ensure that meta-agents like the Agile Coach and Strategist are tasked with maintaining this consolidation to prevent future bloat.

## Impact
- **Maintainability:** Policy updates only need to happen in one place.
- **Efficiency:** Reduced token count for agent sessions.
- **Consistency:** All agents and nodes adhere to the same version of the rules.

## Next Steps
- [x] Product Manager: Audit current TASK/STORY templates for redundancy.
- [ ] Agile Coach: Update persona prompts to use centralized policy references.
- [ ] Architect: Propose a technical mechanism for dynamic policy injection into Foundry nodes.

## Acceptance Criteria
- [ ] task-103-304-propose-dynamic-policy-injection-adr
- [ ] prd-103-109-foundry-node-content-consolidation

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
