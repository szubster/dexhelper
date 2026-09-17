---
id: epic-565-567-core-components-refactor
type: EPIC
title: Core Components CVA Refactor
status: PENDING
owner_persona: story_owner
created_at: '2026-09-14'
updated_at: '2026-09-15'
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
locks: []
priority: 60
rejection_reason: ''
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
- [ ] story-567-569-cva-refactor-tactical-panel-card
- [ ] story-567-570-cva-refactor-tactical-button-badge
- [ ] story-567-571-cva-refactor-tactical-inputs
- [ ] story-567-572-cva-refactor-e2e-verification
