---
id: story-567-569-cva-refactor-tactical-panel-card
type: STORY
title: CVA Refactor Tactical Panel and Card
status: READY
owner_persona: tech_lead
created_at: '2026-09-15'
updated_at: '2026-09-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-565-567-core-components-refactor
tags:
  - refactor
  - styling
  - frontend
  - design-system
research_references:
  - .foundry/research/research-145-001-component-variant-libraries.md
  - .foundry/research/research-145-002-component-theming-mechanisms.md
locks: []
priority: 60
rejection_reason: ''
---

# Story: CVA Refactor Tactical Panel and Card

## Objective
Refactor the `TacticalPanel` and `TacticalCard` components to use `class-variance-authority` (CVA) for variant definitions.

## Scope
- Refactor `TacticalPanel` to use CVA instead of verbose inline classes.
- Refactor `TacticalCard` to use CVA.
- Ensure strict TypeScript typing for all component variants.

## Acceptance Criteria
- [ ] Tech Lead: Break down into Tasks.
