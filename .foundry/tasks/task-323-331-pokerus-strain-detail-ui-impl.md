---
id: task-323-331-pokerus-strain-detail-ui-impl
type: TASK
title: Implement Pokerus Strain Detail UI
status: PENDING
owner_persona: coder
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-322-323-pokerus-strain-detail-ui
tags:
  - pokerus
  - ui
  - implementation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Pokerus Strain Detail UI

## Objective
Implement the UI component for displaying the specific Pokerus strain data in the detailed view of a Pokémon.

## Context
As part of the Pokerus visualization effort, the detail view needs to show the exact strain when a Pokemon is infected or cured. The UI must follow the "tactical hardware" aesthetic (ADR 008, 024).

## Constraints
- The UI must only display the strain if the Pokémon's Pokerus status is "Infected" or "Cured".
- Must use Tailwind v4 `@utility` classes for styling where appropriate.
- Adhere to the "tactical hardware" aesthetic: sharp edges (`rounded-none`), dashed borders (`border-dashed`), monospaced telemetry fonts (`font-mono`).

## Acceptance Criteria
- [ ] Implement `PokerusStrainDetail` component (or update existing detail component).
- [ ] Render `pokerus.strain` value conditionally based on `pokerus.status` ("Infected" or "Cured").
- [ ] Apply "tactical hardware" styling (`rounded-none`, `border-dashed`, `font-mono`, etc.).
- [ ] Verify functionality with unit/component tests.

## Reminders for Coder
- **Transient Failures:** Update YAML frontmatter to `status: FAILED` with a `rejection_reason` if retry needed.
- **Permanent Failures:** Update YAML frontmatter to `status: CANCELLED` with a `rejection_reason` if impossible.
- **Empty PRs:** Check off all Acceptance Criteria before submitting an empty PR for already complete tasks.
