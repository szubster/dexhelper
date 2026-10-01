---
id: epic-519-527-extract-ui-components
type: EPIC
title: Phase 4 - Extract Shared UI Component Library
status: PENDING
owner_persona: story_owner
created_at: '2026-09-03'
updated_at: '2026-10-01'
depends_on:
  - epic-519-524-workspace-infrastructure
jules_session_id: null
pr_number: null
parent: prd-157-519-pnpm-workspaces-architecture
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Phase 4 - Extract Shared UI Component Library

This epic focuses on moving generic UI components, design tokens, and hooks into the `packages/ui` directory.

## Objectives
- Relocate generic React components and visual primitives into `@dexhelper/ui`.
- Set up necessary bundling and styling configuration for the UI package.

## Acceptance Criteria
- [ ] story-527-638-setup-ui-package
- [ ] story-527-639-migrate-tactical-primitives
- [ ] story-527-640-migrate-complex-components
- [ ] story-527-641-migrate-decorations
- [ ] story-527-642-refactor-app-imports
- [ ] story-527-643-ui-e2e-verification
- [x] Break this epic down into stories for migrating the UI component library.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification
