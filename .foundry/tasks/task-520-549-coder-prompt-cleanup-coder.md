---
id: task-520-549-coder-prompt-cleanup-coder
type: TASK
title: Clean up Coder Persona Prompt
status: READY
owner_persona: coder
created_at: '2026-09-06'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: null
rejection_reason: ''
rejection_count: 0
parent: story-521-520-prompt-cleanup-tasks
tags:
  - foundry
  - agents
  - prompts
notes: ''
locks: []
research_references: []
---

# Clean up Coder Persona Prompt

## Description
Remove redundant Late Binding and failure handling policies from the `.github/agents/coder.md` file. This information is already covered in `core_policies.md`, so removing it reduces prompt bloat and adheres to optimization rules.

## Acceptance Criteria
- [ ] Remove redundant Late Binding and failure handling policies from `.github/agents/coder.md`.