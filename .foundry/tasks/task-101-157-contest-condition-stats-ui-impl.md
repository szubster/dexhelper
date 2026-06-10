---
id: task-101-157-contest-condition-stats-ui-impl
type: TASK
title: Implement ContestConditionStats Component
status: PENDING
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-064-101-contest-condition-stats-ui
tags:
  - feature
  - gen3
  - contests
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement ContestConditionStats Component

## 1. Description
Implement a reusable React component `ContestConditionStats` to display a Pokémon's Contest stats (Cool, Beauty, Cute, Smart, Tough). The component should adhere to the project's tactical hardware/snooping style (e.g., sharp edges, dashed borders, monospaced fonts, no generic soft shadows or rounded corners).

## 2. Requirements
- The component must accept numerical values (0-255) for all five condition categories (Cool, Beauty, Cute, Smart, Tough).
- The visual presentation should be clear and accessible (e.g., a spider graph, bar charts, or a cleanly formatted numerical table). Ensure it matches the aesthetic of the rest of the application.
- The component must handle cases where the data is missing or zero gracefully.
- Write rendering tests to verify the component displays values correctly and handles edge cases.

## 3. Reminders
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 4. Acceptance Criteria
- [ ] Create the `ContestConditionStats` React component.
- [ ] Add rendering tests for the component.
- [ ] Ensure the styling strictly follows the project's tactical style guidelines.
