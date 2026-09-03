---
id: story-418-516-orchestrator-prompt-resolution
type: STORY
title: Orchestrator Prompt Resolution Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-02'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '898579983370846154'
pr_number: null
parent: epic-343-418-orchestrator-integration
tags:
  - foundry
  - orchestrator
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Orchestrator Prompt Resolution Logic

## Description
Implement the logic in `.github/scripts/foundry-orchestrator.ts` to dynamically map node properties such as `tags` and `owner_persona` to specific prompt fragments, and construct the composite prompt.

## Acceptance Criteria
- [ ] Implement mapping from `owner_persona` to the base prompt fragment.
- [ ] Implement mapping from `tags` to specific context prompt fragments.
- [ ] Construct the composite prompt by combining the base prompt, context layers, and core policies.
- [ ] Decompose into actionable TASK nodes.
