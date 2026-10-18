---
id: epic-587-707-playwright-path-ast-analyzer
type: EPIC
title: Epic Playwright Path AST Analyzer
status: READY
owner_persona: story_owner
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-528-587-playwright-relative-path-linter
tags:
  - testing
  - linting
  - ast
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Epic: Playwright Path AST Analyzer

## Context
Absolute navigation paths in Playwright E2E tests break execution when deployed under Vite custom base URL configurations. We need an AST-based static analysis tool to detect and optionally auto-fix absolute paths in `page.goto` and similar navigation calls.

## Requirements
1. Implement a Node.js script using `typescript` or `ts-morph` compiler API to parse TS files in `tests/e2e/` and test helpers.
2. Detect `page.goto(...)` calls where the argument is a string literal starting with a single `/`.
3. Exclude protocol-relative URLs (`//`) and external URLs (`http://`, `https://`).
4. Implement an auto-fix mechanism to rewrite the leading `/` to `./`.

## Acceptance Criteria
- [ ] Break down into Stories
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
