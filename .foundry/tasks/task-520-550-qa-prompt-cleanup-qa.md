---
id: task-520-550-qa-prompt-cleanup-qa
type: TASK
title: Clean up QA Persona Prompt
status: READY
owner_persona: qa
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

# Clean up QA Persona Prompt

## Description
Remove redundant Late Binding and failure handling policies from the `.github/agents/qa.md` file. This information is already covered in `core_policies.md`, so removing it reduces prompt bloat and adheres to optimization rules.

## Acceptance Criteria
- [ ] Remove redundant Late Binding and failure handling policies from `.github/agents/qa.md`.