---
id: task-534-537-create-curator-prompt-qa
type: TASK
title: QA - Verify Curator Agent Base Prompt and Journal
status: READY
owner_persona: qa
created_at: '2026-09-04'
updated_at: '2026-09-05'
depends_on:
  - task-534-536-create-curator-prompt-and-journal
jules_session_id: null
parent: story-530-534-curator-agent-base
tags:
  - foundry
  - personas
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA - Verify Curator Agent Base Prompt and Journal

## Context
Verify the creation of the `curator` persona base prompt and journal directory to ensure it matches the requirements and structure.

## Acceptance Criteria
- [ ] Verify `.foundry/journals/curator/.gitkeep` exists.
- [ ] Verify `.github/agents/curator.md` exists and contains instructions for the Curator to review schema, spawn nodes, and not make code changes.
