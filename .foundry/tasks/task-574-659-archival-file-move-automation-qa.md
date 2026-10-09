---
id: task-574-659-archival-file-move-automation-qa
type: TASK
title: Archival File Move Automation QA
status: ACTIVE
owner_persona: qa
created_at: '2026-10-03T19:01:53.934Z'
updated_at: '2026-10-09'
depends_on:
  - task-574-658-archival-file-move-automation-coder
  - task-574-660-archival-file-move-automation-tests
jules_session_id: '4649838138811104808'
pr_number: null
parent: story-550-574-archival-file-move-automation
tags:
  - foundry
  - infrastructure
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Archival File Move Automation QA

## Objective
Verify the implementation of systematic file move to `.foundry/archive/*` preserves subdirectories for terminal trees and tests pass correctly.

## Acceptance Criteria
- [ ] Verify `archiveChildNodes` properly moves files and preserves subdirectories.
- [ ] Verify tests pass successfully.
