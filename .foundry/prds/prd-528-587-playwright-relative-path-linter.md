---
id: prd-528-587-playwright-relative-path-linter
type: PRD
title: PRD Playwright Relative Path Navigation Linter Rule
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-10-15'
updated_at: '2026-10-18'
depends_on: []
jules_session_id: '14095990097843965610'
pr_number: null
parent: idea-528-playwright-relative-path-linter
tags:
  - testing
  - playwright
  - linting
  - quality
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# PRD: Playwright Relative Path Navigation Linter Rule

## 1. Context & Problem Statement
In recent development runs, QA persona verification sessions rejected task submissions because developers used absolute navigation paths (e.g. `page.goto('/dashboard')`) in Playwright E2E tests and code examples. Absolute paths break E2E test execution when deployed under Vite custom base URL configurations. While this rule is documented in `.foundry/docs/knowledge_base/agents/core_policies.md`, relying on manual review by QA causes costly rejection loops.

## 2. Proposed Idea
Create a custom ESLint / Biome / Oxlint rule or AST-based check that scans `tests/e2e/**/*.spec.ts` (and relevant testing helpers) during pre-commit / `pnpm lint`. The rule will detect absolute paths in Playwright navigation calls and optionally support auto-fixing by prefixing single-leading-slash routes with `.`.

## 3. Product Requirements
1. The custom lint rule or AST-based check must run during `pnpm lint` and pre-commit hooks.
2. It must target `tests/e2e/**/*.spec.ts` and related test helper files.
3. It must detect any `page.goto(...)` or custom navigation helper calls where the path argument starts with a single `/`.
4. It must exclude protocol-relative URLs (`//`) and fully qualified external URLs (`http://`, `https://`).
5. It must produce an actionable error message reminding developers to use relative navigation paths (e.g., `./dashboard`).
6. It should optionally support an auto-fix capability that rewrites absolute paths starting with `/` to start with `./`.

## 4. Expected Impact
- Eliminates QA rejections and resurrection cycles caused by Playwright absolute path usage.
- Shifts policy enforcement left, catching the error at the pre-commit stage instead of post-PR QA review.
- Ensures seamless test execution regardless of Vite base URL deployment configurations.

## Acceptance Criteria
- [x] Break down into Epics
- [ ] epic-587-707-playwright-path-ast-analyzer
- [ ] epic-587-708-playwright-path-linter-integration
