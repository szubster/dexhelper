---
id: task-650-747-lazy-load-unown-dex-panel
type: TASK
title: Lazy Load Unown Dex Panel
status: READY
owner_persona: coder
created_at: '2026-10-12T17:00:00Z'
updated_at: '2026-11-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-402-650-update-generation-views
tags:
  - ui
  - gen-specific
  - lazy-loading
research_references: []
rejection_reason: ''
locks: []
---

# Task: Lazy Load Unown Dex Panel

## Description
In `src/components/PokemonDetails.tsx`, the `UnownDexPanel` is imported directly. Update this import to use `React.lazy()` and wrap it in `<LazyLoadWrapper>` as it is only needed when viewing the details of Unown (Pokemon ID 201) in Generation 2.

## Acceptance Criteria
- [ ] Update the import of `UnownDexPanel` in `src/components/PokemonDetails.tsx` to use `React.lazy()`.
- [ ] Ensure the usage of `UnownDexPanel` is wrapped in `<LazyLoadWrapper>` to provide a fallback during lazy loading.
