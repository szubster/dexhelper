---
id: epic-337-402-ui-component-splitting
type: EPIC
title: UI Component Splitting by Game Generation
status: PENDING
owner_persona: story_owner
created_at: '2026-08-05'
updated_at: '2026-08-05'
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
---
# Epic: UI Component Splitting by Game Generation

## Context
From PRD `prd-117-337-split-bundles-and-data`: Implement generation-based splitting for UI components. UI components exclusively used for specific generations must be loaded via `React.lazy`.

## Requirements
- Identify UI components exclusively used for specific generations.
- Update UI rendering logic to load these components via `React.lazy`.

## Acceptance Criteria
- [ ] Story for refactoring UI components to support lazy loading
- [ ] Story for updating specific generation views
- [ ] Story dedicated exclusively to Integration and E2E Verification
