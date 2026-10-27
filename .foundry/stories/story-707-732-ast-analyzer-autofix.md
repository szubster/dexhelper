---
id: story-707-732-ast-analyzer-autofix
type: STORY
title: Story Playwright Path AST Autofix
status: READY
owner_persona: tech_lead
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on:
  - story-707-731-ast-analyzer-detection-script
jules_session_id: null
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

# Story: Playwright Path AST Autofix

## Requirements
Implement an auto-fix mechanism in the AST analyzer script to rewrite the leading `/` to `./` in detected `page.goto(...)` calls.

## Acceptance Criteria
- [ ] Break down into Tasks
