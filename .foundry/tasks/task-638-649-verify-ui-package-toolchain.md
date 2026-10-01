---
id: task-638-649-verify-ui-package-toolchain
type: TASK
title: Verify and QA Toolchain for @dexhelper/ui
status: READY
owner_persona: qa
created_at: '2026-09-30'
updated_at: '2026-09-30'
depends_on:
  - task-638-648-setup-ui-package-toolchain
jules_session_id: null
pr_number: null
parent: story-527-638-setup-ui-package
tags:
  - architecture
  - monorepo
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Verify and QA Toolchain for @dexhelper/ui

## Objective
Verify that the `@dexhelper/ui` package's build process generates the correct output and is properly linked in the workspace.

## Context
QA needs to ensure the setup allows consuming the UI package in the main application without issues, and that the typescript compilation and vite bundling works as expected.

## Acceptance Criteria
- [ ] Ensure `pnpm build` in `packages/ui` runs successfully.
- [ ] Verify that the generated output from Vite library mode is correct.
- [ ] Check if `eslint` / `biome` linting passes in the new package.
- [ ] Document any required changes to the main application to resolve `packages/ui` (if not natively handled by pnpm workspace).
