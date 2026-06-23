---
id: task-109-214-orchestrator-hierarchical-completion-tests-impl
type: TASK
title: Add Unit Tests for Hierarchical Completion Logic
status: READY
owner_persona: coder
created_at: '2026-06-22'
updated_at: '2026-06-23'
depends_on: []
parent: story-070-109-orchestrator-hierarchical-completion-tests
jules_session_id: null
rejection_reason: ''
---

# Add Unit Tests for Hierarchical Completion Logic

## Objective
Add tests in `.github/scripts/foundry-orchestrator.test.ts` to ensure the new hierarchical completion validations work correctly and do not break existing functionality, particularly focusing on markdown references acting as parent-child links.

## Context
See `.foundry/docs/knowledge_base/foundry/orchestrator/hierarchical-completion.md` and `.foundry/docs/schema.md` for architecture details. Remember to check off checkboxes on empty PRs.

**Critical Agent Directives:**
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- Since this is a low-risk task, you are designated to self-verify. You must document your verification steps in your task journal (`.foundry/journals/coder.md`).

## Requirements
1. **Markdown Link Child Tests**:
   - Write a unit test ensuring that a parent node containing a markdown link to another node correctly treats the linked node as its child.
   - Test that the parent node correctly suspends from `ACTIVE` to `PENDING` if the markdown-referenced child is incomplete.
2. **Regression Testing**:
   - Verify that existing hierarchy checks (via `parent` field) continue to function identically.

## Acceptance Criteria
- [ ] Test added for hierarchical completion block via markdown reference.
- [ ] Test added for late-binding exception handling nodes referenced via markdown.
