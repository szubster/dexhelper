---
id: story-418-516-orchestrator-prompt-resolution
type: STORY
title: "Orchestrator Prompt Resolution Logic"
status: PENDING
owner_persona: tech_lead
created_at: "2026-09-02"
updated_at: "2026-09-02"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: epic-343-418-orchestrator-integration
tags:
  - foundry
  - orchestrator
  - integration
research_references: []
experiment_variants: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Orchestrator Prompt Resolution Logic

## Description
Implement the logic in `.github/scripts/foundry-orchestrator.ts` to dynamically map node properties such as `tags` and `owner_persona` to specific prompt fragments, and construct the composite prompt.

## Acceptance Criteria
- [ ] Implement mapping from `owner_persona` to the base prompt fragment.
- [ ] Implement mapping from `tags` to specific context prompt fragments.
- [ ] Construct the composite prompt by combining the base prompt, context layers, and core policies.
- [ ] Decompose into actionable TASK nodes.
