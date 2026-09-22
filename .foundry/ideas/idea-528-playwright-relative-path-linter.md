---
id: idea-528-playwright-relative-path-linter
type: IDEA
title: Playwright Relative Path Navigation Linter Rule
status: READY
owner_persona: product_manager
created_at: '2026-09-22'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - testing
  - playwright
  - linting
  - quality
research_references: []
notes: ''
locks: []
priority: 50
rejection_reason: ''
---

# Playwright Relative Path Navigation Linter Rule

## Problem Statement
In recent development runs, QA persona verification sessions rejected task submissions (such as `task-536-564-playwright-style-guide-mock-utils`) because developers used absolute navigation paths (e.g. `page.goto('/dashboard')`) in Playwright E2E tests and code examples. Absolute paths break E2E test execution when deployed under Vite custom base URL configurations. While this rule is documented in `.foundry/docs/knowledge_base/agents/core_policies.md`, relying on manual review by QA causes costly rejection loops.

## Proposed Solution
Create a custom ESLint / Biome / Oxlint rule or AST-based check that scans `tests/e2e/**/*.spec.ts` (and relevant testing helpers) during pre-commit / `pnpm lint`. The rule will:
1. Detect any `page.goto(...)` or navigation helper calls where the path argument starts with `/` (excluding protocol-relative or external URLs if applicable).
2. Fail linting with an actionable error message reminding developers to use relative navigation paths (e.g. `./dashboard`).
3. Optionally support auto-fixing by prefixing single-leading-slash routes with `.`.

## Expected Impact
- Eliminates QA rejections and resurrection cycles caused by Playwright path syntax violations.
- Shifts policy enforcement left to pre-commit linting rather than post-PR review.
- Ensures seamless test execution regardless of Vite base URL deployment configurations.
