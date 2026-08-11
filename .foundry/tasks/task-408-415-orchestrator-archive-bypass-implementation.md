---
id: task-408-415-orchestrator-archive-bypass-implementation
type: TASK
title: Orchestrator Archive Bypass Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-10'
updated_at: '2026-08-11'
depends_on: []
jules_session_id: '13843471647610493611'
pr_number: null
parent: story-405-408-orchestrator-archive-bypass-implementation
tags:
  - foundry
  - infrastructure
  - performance
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Orchestrator Archive Bypass Implementation

## Context
The Foundry DAG Orchestrator currently traverses the entire `.foundry` directory structure, which includes the `archive` directory. The archive directory contains thousands of files, slowing down the Orchestrator's discovery phase and wasting resources. The objective is to update `discoverNodeFiles` in `.github/scripts/foundry-orchestrator.ts` to skip the `archive` directory entirely.

## Requirements
Update `discoverNodeFiles` in `.github/scripts/foundry-orchestrator.ts` to skip `archive` directories. Specifically, update the directory skip logic in the `if (entry.isDirectory())` block to also skip `entry.name === 'archive'`.

## Acceptance Criteria
- [ ] Update `discoverNodeFiles` to skip `archive/` directories.
- [ ] Ensure this exclusion logic covers both `.foundry/archive/stories/` and `.foundry/archive/tasks/`.
