---
id: task-116-169-verify-late-binding-impl
type: TASK
title: Implement Verification for Late-Binding Logic
status: READY
owner_persona: coder
created_at: '2026-06-12'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-049-116-verify-late-binding-logic
tags:
  - foundry
  - process
  - orchestrator
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Verification for Late-Binding Logic

## Context
The orchestrator natively supports late-binding stories, meaning a `PENDING` parent node that already has children will not block those children from starting. This is implemented in `.github/scripts/foundry-orchestrator.ts`, specifically via the exception for children of PENDING parents, where it doesn't block if `parentStatus === 'PENDING' && parentChildren.length > 0`. There's also `Late-Binding Parent Waking Up` logic where the parent can be promoted if all children are completed.

We need to review and verify this logic comprehensively, ensuring solid test coverage in `.github/scripts/foundry-orchestrator.test.ts`.

## Goal
Verify the late-binding logic in the orchestrator and add any missing test cases or correct edge cases where the orchestrator might deadlock or behave incorrectly for late-binding.

## Constraints
- **CRITICAL**: If you permanently fail or abort this task, you MUST update the YAML frontmatter `status` to `FAILED` or `CANCELLED` and provide a `rejection_reason`. DO NOT check off the acceptance criteria checkboxes.
- **CRITICAL**: If you submit an empty PR because the logic is already sound and tests are adequate, you MUST check off all Acceptance Criteria checkboxes before submitting. Submitting an empty PR with unchecked boxes violates ADR 007 and ADR 009.
- Ensure test changes are robust and maintain current testing patterns. Do not modify global graph state tests without extreme caution.

## Acceptance Criteria
- [x] Review late-binding logic (`Late-Binding Parent` handling, exceptions for PENDING parents) in `.github/scripts/foundry-orchestrator.ts`.
- [x] Add or verify comprehensive test cases for late-binding logic in `.github/scripts/foundry-orchestrator.test.ts`.
- [x] Ensure `pnpm test` passes.
