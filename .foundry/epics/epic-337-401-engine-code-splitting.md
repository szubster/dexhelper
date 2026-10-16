---
id: epic-337-401-engine-code-splitting
type: EPIC
title: Engine Code Splitting by Game Generation
status: PENDING
owner_persona: story_owner
created_at: '2026-08-05'
updated_at: '2026-10-16'
depends_on:
  - epic-337-400-data-splitting
jules_session_id: null
pr_number: null
parent: prd-117-337-split-bundles-and-data
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: ''
locks: []
---
# Epic: Engine Code Splitting by Game Generation

## Context
From PRD `prd-117-337-split-bundles-and-data`: Implement generation-based splitting for JavaScript engine logic. Move generation-specific logic behind dynamic imports (Save Parsers, Assistant Strategies).

## Requirements
- Move generation-specific Save Parsers behind dynamic imports.
- Move generation-specific Assistant Strategies behind dynamic imports.

## Acceptance Criteria
- [x] Story for dynamic importing save parsers
- [x] Story for dynamic importing assistant strategies
- [x] Story dedicated exclusively to Integration and E2E Verification
- [ ] story-401-649-dynamic-import-save-parsers
- [ ] story-401-650-dynamic-import-assistant-strategies
- [ ] story-401-651-engine-code-splitting-e2e
