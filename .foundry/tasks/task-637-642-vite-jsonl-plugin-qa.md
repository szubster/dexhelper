---
id: task-637-642-vite-jsonl-plugin-qa
type: TASK
title: QA Vite Plugin Update for JSONL Data
status: READY
owner_persona: qa
created_at: '2026-09-30'
updated_at: '2026-10-02'
depends_on:
  - task-637-641-vite-jsonl-plugin-impl
jules_session_id: null
pr_number: null
parent: story-088-637-vite-jsonl-plugin-update
tags:
  - build
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
confidence_score: null
---

# QA Vite Plugin Update for JSONL Data

## Background
The coder has implemented updates to the Vite plugin to correctly resolve, bundle, and serve `moves.jsonl` and `items.jsonl`.

## Instructions
1. Review `vite-plugins/pokedata-plugin.ts`.
2. Verify that `moves.jsonl` and `items.jsonl` are correctly processed and included in the output bundle data (`exportData`) output into `pokedata-core.msgpack`.
3. Verify that the build succeeds and the files are served correctly in development and production environments.

## Acceptance Criteria
- [ ] Confirmed `vite-plugins/pokedata-plugin.ts` properly resolves, bundles, and serves `.jsonl` data.
- [ ] Confirmed tests and build pass successfully.
