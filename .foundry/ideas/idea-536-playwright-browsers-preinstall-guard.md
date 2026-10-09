---
id: idea-536-playwright-browsers-preinstall-guard
type: IDEA
title: Playwright Browser Pre-Install Guard and Fallback in Test Pipeline
status: READY
owner_persona: product_manager
created_at: '2026-10-09'
updated_at: '2026-10-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - testing
  - playwright
  - vitest
rejection_count: 0
rejection_reason: ''
locks: []
priority: 80
---

# Idea: Playwright Browser Pre-Install Guard and Fallback in Test Pipeline

## Problem
During Vitest execution (`pnpm test`), browser-based component and integration tests attempt to launch Playwright instances (`@vitest/browser-playwright`). If the required Playwright browser executables (e.g. `chromium_headless_shell`) are missing from the local cache (`~/.cache/ms-playwright/`), Vitest catches an unhandled error (`browserType.launch: Executable doesn't exist...`).
This pollutes the test runner stderr, creates noise in CI logs, and leads to confusion during local agent test runs.

## Proposed Solution
Introduce a pre-test execution guard or environment fallback helper script in `.github/scripts/` or `scripts/` that:
1. Validates the existence of required Playwright browser executables prior to executing Vitest browser suites.
2. Gracefully skips or mocks browser execution during unit test runs if browser binaries are unavailable, or automatically invokes non-blocking setup hooks.
3. Ensures clean test output without unhandled Playwright binary errors during `pnpm test`.

## Value
Eliminates false-positive test output errors, improves developer experience, and stabilizes test session results across agent runs.

## Acceptance Criteria
- [ ] PRD generated detailing the pre-install verification script or Vitest browser setup fallback.
- [ ] Pre-install guard script or hook integrated into workspace test execution.
