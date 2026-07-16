---
id: task-254-260-shiny-carrier-breeding-view-impl
type: TASK
title: Implement Shiny Carrier Breeding View
status: FAILED
owner_persona: coder
created_at: '2026-07-02'
updated_at: '2026-07-16'
depends_on: []
jules_session_id: '1387029238596306939'
pr_number: null
parent: story-045-254-shiny-carrier-breeding-view
tags:
  - feature
  - breeding
  - gen2
  - frontend
research_references: []
rejection_count: 1
rejection_reason: >-
  Zombie node detected: Session 1387029238596306939 is TERMINATED without
  resolving the node
notes: ''
---

# Implement Shiny Carrier Breeding View

## Objective
Implement the UI view for the breeding suggestions and shiny carrier pairs.

## Scope
- Implement a new view or section (e.g., in a sidebar or a dedicated tab) for Breeding Suggestions.
- Fetch and display the optimal breeding pairs involving Shiny Carriers from the backend.
- Present the pairs clearly, indicating the parents and their respective box locations.
- Ensure the UI components adhere to the tactical hardware aesthetic (`rounded-none`, `border-dashed`, monospaced fonts).
- Follow all ADRs, including ADR 008, and use custom `@utility` primitives in `src/index.css` as per ADR 024.

## Technical Contract
1. If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
2. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
3. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
4. When implementing save file parsing or data definitions, you must explicitly define and use reusable constants for memory offsets, lengths, bit locations, and shifts at the module level, strictly avoiding inline magic numbers.
5. Create UI components with tactical aesthetics (`rounded-none`, `border-dashed`, monospaced fonts).

## Acceptance Criteria
- [x] Implement the Breeding Suggestions UI.
- [x] Display optimal breeding pairs prioritizing Shiny Carriers.
- [x] Indicate parents and box locations.
- [x] Component conforms to the tactical hardware aesthetic.
- [x] Include explicit integration steps and tests for rendering the component.
