---
id: task-731-734-ast-analyzer-core-logic
type: TASK
title: AST Analyzer Core Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-11-02'
depends_on: []
jules_session_id: '7777229208254947407'
pr_number: null
parent: story-707-731-ast-analyzer-detection-script
priority: 50
confidence_score: null
tags:
  - testing
  - linting
  - ast
rejection_reason: ''
---

# Task: AST Analyzer Core Logic

## Requirements
Implement the core logic using `typescript` or `ts-morph` compiler API. The logic should parse TS files, traverse the AST to find `page.goto(...)` calls, and check if the argument is a string literal starting with a single `/`, while excluding protocol-relative (`//`) and external URLs (`http://`, `https://`).

## Acceptance Criteria
- [ ] Implement core AST parsing logic
- [ ] Logic correctly filters and detects `page.goto` calls matching the criteria
