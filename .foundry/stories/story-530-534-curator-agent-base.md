---
id: story-530-534-curator-agent-base
type: STORY
title: Create Curator Agent Base Prompt and Journal
status: READY
owner_persona: tech_lead
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
parent: epic-518-530-curator-persona-implementation
tags:
  - foundry
  - personas
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Create Curator Agent Base Prompt and Journal

## Summary
Create the default journal directory `.foundry/journals/curator/` and the base prompt file `.github/agents/generic/curator.md` (which might just be `.github/agents/curator.md` given standard paths).
Implement base instructions detailing responsibilities and node spawning procedures. Ensure the Curator is constrained from making direct code changes.

## Acceptance Criteria
- [x] Create `.foundry/journals/curator/` directory with a `.gitkeep` or initial markdown
- [x] Create `.github/agents/curator.md` with base instructions

- [ ] task-534-536-create-curator-prompt-and-journal
- [ ] task-534-537-create-curator-prompt-qa
