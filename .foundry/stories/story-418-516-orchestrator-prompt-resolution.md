---
id: story-418-516-orchestrator-prompt-resolution
type: STORY
title: Orchestrator Prompt Resolution Logic
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-02'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
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
- [x] Decompose into actionable TASK nodes.
- [ ] task-516-528-owner-persona-mapping-impl
- [ ] task-516-529-context-tags-mapping-impl
- [ ] task-516-530-prompt-resolution-tests
- [ ] task-516-531-prompt-resolution-qa
