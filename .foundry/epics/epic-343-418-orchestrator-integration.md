---
id: epic-343-418-orchestrator-integration
type: EPIC
title: Orchestrator Integration for Prompt Resolution
status: READY
owner_persona: story_owner
created_at: '2026-08-14'
updated_at: '2026-08-31'
depends_on:
  - epic-343-417-prompt-fragment-layering
jules_session_id: null
pr_number: null
parent: prd-137-343-decouple-persona-prompts
tags:
  - foundry
  - orchestrator
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Orchestrator Integration for Prompt Resolution

## Description
This Epic addresses updating the Foundry Orchestrator to integrate the new prompt fragment layering system. The orchestrator needs to dynamically resolve and assemble the appropriate prompt fragments based on the node's tags, assigned persona, and context before dispatching a session to a Jules agent.

## Scope
- Update `.github/scripts/foundry-orchestrator.ts` to utilize the prompt fragment engine.
- Implement logic to map node properties (like `tags` or `owner_persona`) to specific prompt fragments.
- Ensure the orchestrator handles missing or conflicting fragments gracefully (e.g., falling back to defaults or logging warnings instead of crashing).

## Prerequisites
- Requires completion of the prompt fragment layering system (`epic-343-417-prompt-fragment-layering.md`).

## Acceptance Criteria
- [ ] Orchestrator dynamically resolves and constructs composite prompts based on node context.
- [ ] Fallback mechanisms are implemented for missing prompt layers.
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
