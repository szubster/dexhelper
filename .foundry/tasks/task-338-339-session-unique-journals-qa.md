---
id: task-338-339-session-unique-journals-qa
type: TASK
title: Verify Session-Unique Journal Files Implementation
status: ACTIVE
owner_persona: qa
created_at: '2026-07-22'
updated_at: '2026-07-23'
depends_on:
  - task-338-338-session-unique-journals-impl
jules_session_id: '11644115072242309867'
pr_number: null
parent: story-338-336-implement-session-unique-journals
tags:
  - foundry
  - journals
  - workflow
  - DX
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Verify Session-Unique Journal Files Implementation

## Objective
Verify that the system configuration and agent prompts have been successfully updated to enforce the use of session-unique journal files.

## Acceptance Criteria
- [ ] Verify that agent prompt files in `.github/agents/` instruct the use of session-unique journal paths.
- [ ] Verify that the orchestrator (`.github/scripts/foundry-orchestrator.ts`) supports the new directory-based or timestamp format for journals, if modified.
