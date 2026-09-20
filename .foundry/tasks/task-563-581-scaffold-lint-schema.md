---
id: task-563-581-scaffold-lint-schema
type: TASK
title: Scaffold Schema Linter Script
status: READY
owner_persona: coder
created_at: '2026-09-16T06:16:00Z'
updated_at: '2026-09-16T06:16:00Z'
jules_session_id: null
depends_on: []
parent: story-555-563-lint-schema-file-iteration
tags:
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Scaffold Schema Linter Script

## Objectives
- Create the `.foundry/scripts/lint-schema.ts` file.
- Set up the basic CLI entry point and required imports for file system operations.
- Ensure the script is executable and can be run via `ts-node` or equivalent.

## Acceptance Criteria
- [x] `.foundry/scripts/lint-schema.ts` is created with a basic entry point.
- [x] The script is executable and imports necessary `fs` and `path` modules.
