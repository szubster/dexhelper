---
id: prd-536-587-playwright-browsers-preinstall-guard
type: PRD
title: Playwright Browser Pre-Install Guard and Fallback in Test Pipeline
status: READY
owner_persona: epic_planner
created_at: "2026-10-13"
updated_at: "2026-10-13"
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-536-playwright-browsers-preinstall-guard
tags:
  - testing
  - playwright
  - vitest
rejection_count: 0
rejection_reason: ""
locks: []
priority: 80
---

# PRD: Playwright Browser Pre-Install Guard and Fallback in Test Pipeline

## Overview
Vitest's browser tests (`@vitest/browser-playwright`) will fail with an unhandled exception (`browserType.launch: Executable doesn't exist`) if Playwright browser executables are not found in the local cache. This feature will introduce a script to check for these executables and seamlessly execute alternative tests, fallback hooks, or skip the browser suites altogether when they are missing. This improves the developer/agent experience and stabilizes CI pipelines.

## Target Persona / Use Case
- **AI Agents / Developers:** Local test runs (`pnpm test`) won't be littered with noise or false-negative exits due to missing binaries.
- **CI Environments:** Safer, cleaner test execution in environments that might not have or need the full Playwright browser suite for unit testing.

## Features
1. **Pre-install Verification Script:** A lightweight script (e.g., in `.github/scripts/` or `scripts/`) to determine the availability of Playwright executables.
2. **Vitest Hook/Integration:** Integration into the `pnpm test` lifecycle (or Vitest config) to gracefully handle missing binaries.
3. **Graceful Fallback:** If binaries are missing, the test suite should ideally skip the `browser` tests or provide a clean, non-crashing output without the unhandled Playwright binary error.

## Technical Considerations
- Should evaluate `npx playwright info` or directly check cache locations (like `~/.cache/ms-playwright/`).
- Needs to integrate neatly with the existing Vitest configuration (possibly via a global setup file or a wrapper script in `package.json`).
- Must not automatically attempt to `pnpm exec playwright install` as per system policies.

## Acceptance Criteria
- [ ] Create `EPIC` to outline the implementation of the pre-install guard.
