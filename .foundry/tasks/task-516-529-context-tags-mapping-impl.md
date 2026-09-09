---
id: task-516-529-context-tags-mapping-impl
type: TASK
title: Implement Context Tags Mapping & Composite Construction
status: COMPLETED
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-09'
depends_on:
  - task-516-528-owner-persona-mapping-impl
jules_session_id: null
pr_number: null
parent: story-418-516-orchestrator-prompt-resolution
tags:
  - foundry
  - orchestrator
  - prompt-resolution
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Implement Context Tags Mapping & Composite Construction

## Description
Implement the logic to dynamically map `tags` and `layers` to specific prompt context fragments and construct the final composite prompt, appending the core policies.

## Acceptance Criteria
- [x] Parse `tags` and `layers` from the node frontmatter.
- [x] Load corresponding specific context fragments from `.github/agents/specific/`.
- [x] Combine the base prompt, specific context layers, and the core system policies (`core_policies.md` or `core_principles.md`).
- [x] Return the fully constructed composite prompt string.
