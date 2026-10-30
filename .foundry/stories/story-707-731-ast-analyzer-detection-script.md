---
id: story-707-731-ast-analyzer-detection-script
type: STORY
title: Story Playwright Path AST Detection Script
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-10-18'
updated_at: '2026-10-30'
depends_on: []
jules_session_id: '1317540692338740427'
pr_number: null
parent: epic-587-707-playwright-path-ast-analyzer
tags:
  - testing
  - linting
  - ast
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Playwright Path AST Detection Script

## Requirements
Implement a Node.js script using `typescript` or `ts-morph` compiler API to parse TS files in `tests/e2e/` and test helpers. Detect `page.goto(...)` calls where the argument is a string literal starting with a single `/`. Exclude protocol-relative URLs (`//`) and external URLs (`http://`, `https://`).

## Acceptance Criteria
- [ ] Break down into Tasks
