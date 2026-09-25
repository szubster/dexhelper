---
id: epic-565-567-core-components-refactor
type: EPIC
title: Core Components CVA Refactor
status: COMPLETED
owner_persona: story_owner
created_at: '2026-09-14'
updated_at: '2026-09-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-523-565-component-variants-theming-consolidation-refactor
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
---

# Epic: Core Components CVA Refactor

## Objective
Refactor core tactical components to use CVA for variant definitions.

## Scope
- Refactor TacticalPanel, TacticalCard, TacticalButton, TacticalBadge, TacticalInput, TacticalSegmentedControl, TacticalSelect, and TacticalMultiSelectControl.
- Replace verbose inline classes and inconsistent style mappings with CVA.
- Ensure strict TypeScript typing for all component variants.

## Acceptance Criteria
- [x] Story Owner: Break down this Epic into Stories.
- [x] story-567-569-cva-refactor-tactical-panel-card
- [x] story-567-570-cva-refactor-tactical-button-badge
- [x] story-567-571-cva-refactor-tactical-inputs
- [x] story-567-572-cva-refactor-e2e-verification
