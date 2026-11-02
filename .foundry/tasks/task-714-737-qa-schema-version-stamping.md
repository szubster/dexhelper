---
id: task-714-737-qa-schema-version-stamping
type: TASK
title: QA Schema Version Stamping
status: READY
owner_persona: qa
created_at: '2026-10-21T08:00:00.000Z'
updated_at: '2026-10-21T08:00:00.000Z'
depends_on:
  - task-714-736-test-schema-version-stamping
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

# TASK: QA Schema Version Stamping

## Objective
Verify the implementation of schema version stamping in the save file parsers.

## Acceptance Criteria
- [ ] Verify `BaseSaveData` includes `schemaVersion: number`.
- [ ] Verify `parseGen1`, `parseGen2`, and `parseGen3` return `schemaVersion: 1`.
- [ ] Verify unit tests correctly test `schemaVersion`.
- [ ] Run `pnpm lint && pnpm test` to ensure all tests pass.
