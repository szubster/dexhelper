---
id: epic-346-520-wip-orchestrator-awareness
type: EPIC
title: Orchestrator & Agent Awareness
status: READY
owner_persona: story_owner
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-151-346-wip-draft-signaling
tags:
  - foundry
  - orchestrator
  - wip
research_references: []
rejection_reason: ""
---

## Description
This epic focuses on updating Foundry's orchestrator and persona context prompts to recognize and respond correctly to Draft/WIP artifacts. It ensures that agents are strictly instructed not to take downstream dependencies on any artifact marked as Draft or WIP until it is formally promoted to STABLE/ACTIVE.

## Acceptance Criteria
- [ ] Update persona prompts to recognize draft ADRs and WIP code
- [ ] Restrict agents from taking downstream dependencies on DRAFT/WIP artifacts
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification
- [ ] story-520-520-update-persona-prompts
- [ ] story-520-521-restrict-downstream-dependencies
- [ ] story-520-522-wip-awareness-e2e
