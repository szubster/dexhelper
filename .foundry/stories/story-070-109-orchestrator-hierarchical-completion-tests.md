---
id: story-070-109-orchestrator-hierarchical-completion-tests
type: STORY
title: Add Unit Tests for Hierarchical Completion Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-22'
depends_on:
  - story-070-108-orchestrator-hierarchical-completion-logic
jules_session_id: '2438222667916874118'
pr_number: null
parent: epic-045-070-orchestrator-strict-completion
tags:
  - orchestrator
  - architecture
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Add Unit Tests for Hierarchical Completion Logic

## Objective
Add tests in `.github/scripts/foundry-orchestrator.test.ts` to ensure the new hierarchical completion validations work correctly and do not break existing functionality, particularly focusing on markdown references acting as parent-child links.

## Requirements
1. **Markdown Link Child Tests**:
   - Write a unit test ensuring that a parent node containing a markdown link to another node correctly treats the linked node as its child.
   - Test that the parent node correctly suspends from `ACTIVE` to `PENDING` if the markdown-referenced child is incomplete.
2. **Regression Testing**:
   - Verify that existing hierarchy checks (via `parent` field) continue to function identically.

## Acceptance Criteria
- [ ] Test added for hierarchical completion block via markdown reference.
- [ ] Test added for late-binding exception handling nodes referenced via markdown.
