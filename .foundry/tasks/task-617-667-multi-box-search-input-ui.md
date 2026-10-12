---
id: task-617-667-multi-box-search-input-ui
type: TASK
title: Multi-Box Search Input UI Component
status: READY
owner_persona: coder
created_at: '2026-09-23'
updated_at: '2026-10-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-576-617-multi-box-search-ui-components
tags:
  - dexhelper
  - feature
  - search
  - pc-box
  - react
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
confidence_score: null
---

# Task: Multi-Box Search Input UI Component

## Context
As part of the Multi-Box Search and Filtering system, we need to implement a global text input field for searching Pokemon across boxes.

## Objectives
- Implement a React component for the global search input text field.
- Adhere to the "tactical hardware/snooping" aesthetic outlined in ADR 008 (sharp edges, dashed borders, monospaced fonts, `@utility` tactical primitives from `src/index.css`).

## Acceptance Criteria
- [ ] Search input component is implemented.
- [ ] Component is properly styled according to ADR 008.
- [ ] Component has appropriate Vitest unit tests verifying rendering and user interactions using `vitest-browser-react`.
