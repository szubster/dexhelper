---
id: epic-587-584-playwright-browser-guard
type: EPIC
title: Playwright Browser Guard Implementation
status: READY
owner_persona: story_owner
created_at: "2026-10-17"
updated_at: "2026-10-17"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-536-587-playwright-browsers-preinstall-guard
tags:
  - testing
  - playwright
  - vitest
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
confidence_score: null
locks: []
priority: 80
---

# EPIC: Playwright Browser Guard Implementation

## Overview
Based on `prd-536-587-playwright-browsers-preinstall-guard`, this Epic covers the implementation of a script to check for Playwright browser executables. It also includes the integration of this script into the Vitest testing lifecycle to gracefully handle missing binaries, preventing unhandled exceptions like `browserType.launch: Executable doesn't exist` during local test runs or CI execution without automatically attempting to install them.

## Technical Scope
1. **Pre-install Verification Script:** Create a lightweight Node.js script (e.g., `scripts/check-playwright-browsers.ts`) that verifies the presence of Playwright browser binaries in the standard cache locations or via Playwright's own APIs (e.g., by testing if a lightweight browser launch succeeds or by analyzing `npx playwright info`).
2. **Vitest Integration:** Hook this script into the testing process. This could involve using a global setup file in Vitest (`vitest.config.ts`), or wrapping the `pnpm test` command. If binaries are missing, the test runner must gracefully skip browser tests or warn without crashing the entire test suite.
3. **Graceful Fallback:** Ensure that missing binaries result in skipped tests (or a clear warning) rather than an unhandled exception crashing the process.
4. **E2E/Integration Verification:** An integration test must verify this behavior (simulating a missing binary state if possible, or confirming the guard passes when binaries are present).

## Acceptance Criteria
- [ ] Break down into Stories.
- [ ] Ensure a final STORY dedicated exclusively to Integration and E2E Verification is generated.
