---
id: task-253-260-shiny-carrier-ui-badge-impl
type: TASK
title: Implement Shiny Carrier UI Badge
status: PENDING
owner_persona: coder
created_at: '2026-07-02'
updated_at: '2026-07-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-045-253-shiny-carrier-ui-badge
tags:
  - feature
  - breeding
  - gen2
  - frontend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Shiny Carrier UI Badge

## Objective
Implement a distinct UI badge/indicator for "Shiny Carrier" Pokémon in PC boxes and detailed views, ensuring it is visually distinct from the actual "Shiny" indicator.

## Requirements
- Create or update the badge component for Shiny Carriers.
- Integrate the badge into the PC Box view and Pokémon Detailed view.
- Follow the tactical hardware/snooping aesthetic (ADR 008): `rounded-none`, `border-dashed`, monospaced fonts. Do not use rounded corners.
- Ensure the visual distinction between Shiny Carriers and actual Shiny Pokémon is clear.

## Acceptance Criteria
- [ ] Badge component implemented and styled correctly according to ADR 008.
- [ ] Badge integrated into PC Box view.
- [ ] Badge integrated into Pokémon Detailed view.

## Reminders
- If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail the task, update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When implementing save file parsing, memory offsets must be defined as reusable constants at the module level (no inline magic numbers).
