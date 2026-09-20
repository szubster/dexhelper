---
id: task-569-578-cva-refactor-tactical-panel-card
type: TASK
title: CVA Refactor Tactical Panel and Card
status: ACTIVE
owner_persona: coder
created_at: '$(date -u +"%Y-%m-%dT%H:%M:%SZ")'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: '10588505382578138742'
pr_number: null
parent: story-567-569-cva-refactor-tactical-panel-card
tags:
  - refactor
  - styling
  - frontend
  - design-system
research_references:
  - .foundry/research/research-145-001-component-variant-libraries.md
  - .foundry/research/research-145-002-component-theming-mechanisms.md
rejection_reason: ''
locks: []
priority: 60
rejection_count: 1
---

# Task: CVA Refactor Tactical Panel and Card

## Objective
Refactor the `TacticalPanel` and `TacticalCard` components to use `class-variance-authority` (CVA) for variant definitions.

## Requirements
- Install `class-variance-authority` as a dependency.
- Refactor `TacticalPanel` to use CVA instead of verbose inline classes. Ensure the variants `emerald`, `amber`, `red`, `purple`, `blue`, `pink`, `white`, `default`, and `cyan` are correctly implemented.
- Refactor `TacticalCard` to use CVA. Ensure the variants `default`, `emerald`, `amber`, `storage-default`, `storage-emerald`, `storage-amber`, `storage-red`, and `storage-cyan` are correctly implemented.
- Ensure strict TypeScript typing for all component variants.
- Ensure tests still pass (update if necessary).

## Acceptance Criteria
- [x] `class-variance-authority` is installed.
- [x] `TacticalPanel` is refactored to use CVA.
- [x] `TacticalCard` is refactored to use CVA.
- [x] All unit and e2e tests pass.
