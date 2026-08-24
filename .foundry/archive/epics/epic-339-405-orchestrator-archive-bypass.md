---
id: epic-339-405-orchestrator-archive-bypass
type: EPIC
title: Orchestrator Archive Bypass
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-07'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-129-339-epic-level-distillation-archival
tags:
  - foundry
  - infrastructure
  - performance
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Orchestrator Archive Bypass

## Context
The DAG orchestrator currently traverses the entire `.foundry` directory (excluding `journals` and `docs`). When completed nodes are archived, they will be moved to cold storage (e.g., `.foundry/archive/`). The orchestrator must be updated to skip this archive directory during the discovery phase to maintain performance.

## Objective
Update the `foundry-orchestrator.ts` script to ignore the `.foundry/archive/` directory during its parsing and discovery process.

## Requirements
1. Update `discoverNodeFiles` in `foundry-orchestrator.ts` (and any related utility scripts) to explicitly skip `archive/` directories.
2. Ensure this exclusion logic covers both `.foundry/archive/stories/` and `.foundry/archive/tasks/`.

## Acceptance Criteria
- [x] Implement bypass logic in the orchestrator discovery phase.
- [x] Delegate the generation of the E2E STORY to the `story_owner`.
- [x] story-405-408-orchestrator-archive-bypass-implementation
- [x] story-405-409-orchestrator-archive-bypass-e2e

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
