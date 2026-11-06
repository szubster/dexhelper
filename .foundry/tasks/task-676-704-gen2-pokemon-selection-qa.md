---
id: task-676-704-gen2-pokemon-selection-qa
type: TASK
title: Gen 2 Pokemon Selection Interface - QA
status: ACTIVE
owner_persona: qa
created_at: '2026-10-15'
updated_at: '2026-11-06'
depends_on:
  - task-676-703-gen2-pokemon-selection-ui
jules_session_id: '7565226884570152733'
pr_number: null
parent: story-310-676-pokemon-selection-interface
tags:
  - gen2
  - breeding
  - ui
  - qa
research_references:
  - .foundry/archive/docs/adrs/024-tailwind-v4-utility-consolidation.md
  - .foundry/docs/knowledge_base/tailwind_v4_utilities.md
rejection_count: 0
system_failure_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Gen 2 Pokemon Selection Interface - QA

## Objective
Verify the implementation of the Gen 2 Pokémon Selection Interface, including both state management and UI components.

## Acceptance Criteria
- [x] Verify that the application correctly hooks into the global Gen 2 save file storage (PC and Party).
- [x] Verify the accuracy of the displayed species, gender (derived from Attack DV), and DVs (especially Defense and Special).
- [x] Verify the tactical hardware aesthetic according to ADR 008, ensuring sharp edges, dashed borders, monospaced fonts, and correct use of `@utility` primitives.
- [x] Verify that tests (unit, browser, and Playwright E2E) exist, pass locally, and properly target the UI without relying solely on manual DOM injections.
- [x] Run `pnpm lint && pnpm test` and `xvfb-run -a pnpm test:e2e` and verify a clean system state.
