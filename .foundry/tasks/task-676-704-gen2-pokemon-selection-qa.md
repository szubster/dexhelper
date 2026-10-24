---
id: task-676-704-gen2-pokemon-selection-qa
type: TASK
title: Gen 2 Pokemon Selection Interface - QA
status: PENDING
owner_persona: qa
created_at: '2026-10-15'
updated_at: '2026-10-15'
depends_on:
  - task-676-703-gen2-pokemon-selection-ui
jules_session_id: null
pr_number: null
parent: story-310-676-pokemon-selection-interface
priority: 50
confidence_score: null
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
---

# Gen 2 Pokemon Selection Interface - QA

## Objective
Verify the implementation of the Gen 2 Pokémon Selection Interface, including both state management and UI components.

## Technical Requirements
- [ ] Verify that the application correctly hooks into the global Gen 2 save file storage (PC and Party).
- [ ] Verify the accuracy of the displayed species, gender (derived from Attack DV), and DVs (especially Defense and Special).
- [ ] Verify the tactical hardware aesthetic according to ADR 008, ensuring sharp edges, dashed borders, monospaced fonts, and correct use of `@utility` primitives.
- [ ] Verify that tests (unit, browser, and Playwright E2E) exist, pass locally, and properly target the UI without relying solely on manual DOM injections.
- [ ] Run `pnpm lint && pnpm test` and `xvfb-run -a pnpm test:e2e` and verify a clean system state.
