---
id: story-405-408-orchestrator-archive-bypass-implementation
type: STORY
title: Orchestrator Archive Bypass Implementation
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-08'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: '3717664814262300051'
pr_number: null
parent: epic-339-405-orchestrator-archive-bypass
tags:
  - foundry
  - infrastructure
  - performance
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Orchestrator Archive Bypass Implementation

## Objective
Implement logic in `discoverNodeFiles` in `.github/scripts/foundry-orchestrator.ts` to ignore the `.foundry/archive/` directory during its parsing and discovery process.

## Acceptance Criteria
- [x] Update `discoverNodeFiles` to skip `archive/` directories.
- [x] Ensure this exclusion logic covers both `.foundry/archive/stories/` and `.foundry/archive/tasks/`.
- [x] task-408-415-orchestrator-archive-bypass-implementation
