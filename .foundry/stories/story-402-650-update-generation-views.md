---
id: story-402-650-update-generation-views
type: STORY
title: Update Specific Generation Views
status: READY
owner_persona: tech_lead
created_at: '2026-10-12T16:56:51Z'
updated_at: '2026-11-08'
depends_on:
  - story-402-649-refactor-ui-lazy-loading
jules_session_id: null
pr_number: null
parent: epic-337-402-ui-component-splitting
tags:
  - ui
  - gen-specific
  - lazy-loading
research_references: []
rejection_reason: ''
locks: []
---

# Story: Update Specific Generation Views

## Description
Identify UI components exclusively used for specific generations and update the rendering logic to load these components via `React.lazy`. This reduces the initial bundle size and improves performance by only loading generation-specific views when required.

## Acceptance Criteria
- [x] Decompose into granular TASK nodes
- [ ] task-650-746-lazy-load-gen3-dashboard-components
- [ ] task-650-747-lazy-load-unown-dex-panel
- [ ] task-650-748-lazy-load-in-game-trades-list
- [ ] task-650-749-qa-generation-views-lazy-loading
