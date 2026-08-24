---
id: task-443-478-adr-008-ui-compliance-linter-tests
type: TASK
title: Implement Unit Tests for ADR 008 Linter
status: PENDING
owner_persona: coder
created_at: '2026-08-24'
updated_at: '2026-08-24'
depends_on:
  - task-443-477-adr-008-ui-compliance-linter-logic
jules_session_id: null
pr_number: null
parent: story-417-443-adr-008-ui-compliance-linter
tags:
  - foundry
  - linter
  - compliance
  - adr
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Unit Tests for ADR 008 Linter

## Objective
Implement unit tests using `vitest` for the `scripts/verify-adr-compliance.ts` script.

## Technical Requirements
- Create unit tests for the core logic implemented in `task-443-477-adr-008-ui-compliance-linter-logic`.
- Provide mock file contents with forbidden classes (`rounded-t`, `rounded-lg`, etc.) and ensure the linter correctly identifies them.
- Provide mock file contents with compliant classes (`rounded-none`, `border-dashed`) and ensure the linter passes them without errors.
- Run tests using the `vitest` framework.

## Acceptance Criteria
- [ ] Implement unit tests for detecting forbidden classes.
- [ ] Implement unit tests for allowing compliant classes.
- [ ] Tests must pass successfully using `vitest run`.
