---
id: task-406-527-gen3-rematch-ui-impl
type: TASK
title: Implement Gen 3 NPC Rematch Status UI
status: PENDING
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-05'
depends_on:
  - task-406-526-gen3-rematch-parser-impl
jules_session_id: null
pr_number: null
parent: story-397-406-gen3-npc-rematch-status
tags:
  - task
  - gen3
  - secret-base
  - rematch
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# TASK: Implement Gen 3 NPC Rematch Status UI

## Context
Following the implementation of the parsing logic for Gen 3 NPC rematch statuses, we need a UI component to display and track this daily rematch availability.

## Objectives
- Implement React UI components to display the rematch status for NPC trainers found in Secret Bases.
- Follow the Tactical Hardware Aesthetic guidelines (ADR 008) (e.g., `rounded-none`, `border-dashed`, monospaced fonts).
- Integrate the UI component into the existing Secret Base or Mixed Record viewer hierarchy.

## Acceptance Criteria
- [ ] Implement the UI components for displaying rematch status.
- [ ] Style the components according to ADR 008.
- [ ] Write unit tests using `vitest-browser-react` for the UI component.
