---
id: task-731-735-ast-analyzer-cli
type: TASK
title: AST Analyzer CLI Script
status: PENDING
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-11-02'
depends_on:
  - task-731-734-ast-analyzer-core-logic
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

# Task: AST Analyzer CLI Script

## Requirements
Implement a Node.js CLI script that utilizes the core logic implemented in `task-731-734`. The script should parse all `.ts` files in `tests/e2e/` and test helpers, execute the AST detection, and output the detected calls.

## Acceptance Criteria
- [ ] Create executable CLI wrapper
- [ ] Properly scan `tests/e2e/` and helper directories
