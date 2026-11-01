---
id: task-676-703-gen2-pokemon-selection-ui
type: TASK
title: Gen 2 Pokemon Selection Interface - UI Components
status: FAILED
owner_persona: coder
created_at: '2026-10-15'
updated_at: '2026-11-01'
depends_on:
  - task-676-702-gen2-pokemon-selection-state
jules_session_id: null
pr_number: null
parent: story-310-676-pokemon-selection-interface
tags:
  - gen2
  - breeding
  - ui
research_references:
  - .foundry/archive/docs/adrs/024-tailwind-v4-utility-consolidation.md
  - .foundry/docs/knowledge_base/tailwind_v4_utilities.md
rejection_count: 0
system_failure_count: 0
rejection_reason: 'Autonomous No-Ask Policy Violation: Session entered AWAITING_USER_FEEDBACK'
notes: ''
locks: []
priority: 50
---

# Gen 2 Pokemon Selection Interface - UI Components

## Objective
Implement the UI components for selecting two Pokémon from the parsed Gen 2 save file storage (PC or Party) to evaluate for shiny breeding. This builds upon the state management implemented in task-676-702-gen2-pokemon-selection-state.

## Acceptance Criteria
- Consume the state exposed by the state layer (implemented in task-676-702).
- Build a user interface allowing the selection of two Pokémon from the user's parsed Gen 2 storage.
- Display relevant base stats for the selection, including species, gender (calculated from Attack DV), and current DVs (Defense and Special are critical).
- **Tactical Styling**: Adhere strictly to the "tactical hardware" aesthetic. Use Tailwind v4 `@utility` classes (e.g., `tactical-panel`) for consistent styling, incorporating dashed borders (`border-dashed`), sharp corners (`rounded-none`), and monospaced typography (`font-mono`).

## Acceptance Criteria
- [ ] React components implementing the UI.
- [ ] Browser tests using `vitest-browser-react` validating rendering and selection logic.
- [ ] Playwright E2E tests validating the full integration.
