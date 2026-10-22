---
id: task-649-694-impl-dynamic-import-gen1-parser
type: TASK
title: Implement Dynamic Import for Gen 1 Parser
status: ACTIVE
owner_persona: coder
created_at: '2026-10-17T02:26:24.000Z'
updated_at: '2026-10-22'
depends_on: []
jules_session_id: '15880125893208114635'
pr_number: null
parent: story-401-649-dynamic-import-save-parsers
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: ''
locks: []
---

# Implement Dynamic Import for Gen 1 Parser

## Description
Move the generation 1 specific Save Parser behind dynamic imports. This will help split bundles and reduce initial payload.

## Acceptance Criteria
- [ ] Move generation 1 specific Save Parser behind dynamic imports in `src/engine/saveParser/index.ts`.
