---
id: task-534-536-create-curator-prompt-and-journal
type: TASK
title: Create Curator Agent Base Prompt and Journal
status: COMPLETED
owner_persona: coder
created_at: '2026-09-04'
updated_at: '2026-09-05'
depends_on: []
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

# Create Curator Agent Base Prompt and Journal

## Context
The Foundry requires a new `curator` persona to manage and review schema nodes. This task creates the base prompt definition for the Curator and sets up its journal directory.

## Acceptance Criteria
- [x] Create `.foundry/journals/curator/` directory with a `.gitkeep` file.
- [x] Create `.github/agents/curator.md` with base instructions for the `curator` persona. The instructions must detail responsibilities, node spawning procedures, and constrain the Curator from making direct code changes.
