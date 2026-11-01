---
id: story-401-649-dynamic-import-save-parsers
type: STORY
title: 'Story: Dynamic Import Save Parsers'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-10-12T07:40:28.000Z'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-337-401-engine-code-splitting
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: ''
locks: []
---

# Story: Dynamic Import Save Parsers

## Description
Move generation-specific Save Parsers behind dynamic imports. This will help split bundles and reduce initial payload.

## Acceptance Criteria
- [x] Break down this Story into coder TASK nodes for implementation.
- [x] task-649-694-impl-dynamic-import-gen1-parser
- [x] task-649-695-impl-dynamic-import-gen2-parser
- [x] task-649-696-impl-dynamic-import-gen3-parser
- [x] task-649-697-qa-dynamic-import-save-parsers
