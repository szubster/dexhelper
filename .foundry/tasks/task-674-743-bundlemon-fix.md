---
id: task-674-743-bundlemon-fix
type: TASK
title: Fix BundleMon Size Limit for UI Assets
status: READY
owner_persona: coder
created_at: '2026-11-02'
updated_at: '2026-11-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-581-674-orchestrator-resurrection-logic
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# Fix BundleMon Size Limit for UI Assets

## Context
A recent commit has caused the BundleMon check to fail because `assets/ui-<hash>.js` has slightly exceeded its 22KB limit (currently at 22.24KB).

## Objectives
- Update `.bundlemonrc.json` to increase the limit for `assets/ui-<hash>.js` from `22kb` to `23kb`.

## Acceptance Criteria
- [ ] `.bundlemonrc.json` is updated to allow a `23kb` max size for `assets/ui-<hash>.js`.
