---
id: task-731-736-ast-analyzer-tests
type: TASK
title: AST Analyzer Tests
status: PENDING
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-11-02'
depends_on:
  - task-731-734-ast-analyzer-core-logic
  - task-731-735-ast-analyzer-cli
jules_session_id: null
pr_number: null
parent: story-707-731-ast-analyzer-detection-script
tags:
  - testing
  - linting
  - ast
locks: []
priority: 50
rejection_reason: ''
---

# Task: AST Analyzer Tests

## Requirements
Implement unit tests for the AST analyzer detection script. Ensure that the core AST logic correctly identifies violating `page.goto` strings and correctly ignores valid external, protocol-relative, and relative paths.

## Acceptance Criteria
- [ ] Write unit tests for core logic
- [ ] Write unit tests for edge cases (e.g. `//`, `http://`, `https://`)
