---
id: task-714-734-type-schema-version-stamping
type: TASK
title: Type Definition for Schema Version Stamping
status: ACTIVE
owner_persona: coder
created_at: '2026-10-21T08:00:00.000Z'
updated_at: '2026-11-02'
depends_on: []
jules_session_id: '8641537243885164195'
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

# TASK: Type Definition for Schema Version Stamping

## Objective
Update the `BaseSaveData` interface to include `schemaVersion`.

## Acceptance Criteria
- [ ] In `src/engine/saveParser/parsers/common.ts`, add `schemaVersion: number` to the `BaseSaveData` interface.
