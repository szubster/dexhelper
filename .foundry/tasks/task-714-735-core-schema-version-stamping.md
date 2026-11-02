---
id: task-714-735-core-schema-version-stamping
type: TASK
title: Core Logic for Schema Version Stamping
status: READY
owner_persona: coder
created_at: '2026-10-21T08:00:00.000Z'
updated_at: '2026-10-21T08:00:00.000Z'
depends_on:
  - task-714-734-type-schema-version-stamping
jules_session_id: null
pr_number: null
parent: story-694-714-intercept-file-loading-stamping
tags:
  - save-engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# TASK: Core Logic for Schema Version Stamping

## Objective
Update the generation-specific parsers to stamp the parsed save data with `schemaVersion: 1`.

## Acceptance Criteria
- [ ] In `src/engine/saveParser/parsers/gen1.ts`, update `parseGen1` to return `schemaVersion: 1`.
- [ ] In `src/engine/saveParser/parsers/gen2.ts`, update `parseGen2` to return `schemaVersion: 1`.
- [ ] In `src/engine/saveParser/parsers/gen3.ts`, update `parseGen3` to return `schemaVersion: 1`.
