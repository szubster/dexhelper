---
id: epic-587-708-playwright-path-linter-integration
type: EPIC
title: Epic Playwright Path Linter Integration
status: PENDING
owner_persona: story_owner
created_at: '2026-10-18'
updated_at: '2026-10-27'
depends_on:
  - epic-587-707-playwright-path-ast-analyzer
jules_session_id: null
pr_number: null
parent: prd-528-587-playwright-relative-path-linter
tags:
  - testing
  - linting
  - ci
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Epic: Playwright Path Linter Integration

## Context
With the Playwright AST analyzer implemented, we need to integrate it into our continuous integration pipeline and pre-commit hooks to enforce the relative path policy proactively.

## Requirements
1. Integrate the analyzer into the `pnpm lint` command suite in `package.json` (e.g., as `lint:playwright-paths`).
2. Integrate the analyzer into `lefthook` pre-commit checks.
3. Run the auto-fixer on the existing codebase to resolve any current violations.
4. Ensure the linting step fails appropriately with an actionable error message when unresolved absolute paths are detected.

## Acceptance Criteria
- [ ] Break down into Stories
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
