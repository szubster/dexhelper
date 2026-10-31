---
id: epic-703-698-ast-linter-ci-integration
type: EPIC
title: AST Linter Reporting and CI Integration
status: PENDING
owner_persona: story_owner
created_at: '2026-10-23'
updated_at: '2026-10-23'
depends_on:
  - epic-703-697-ast-linter-wiring-verification
jules_session_id: null
pr_number: null
parent: prd-538-703-ast-linter-context-wiring
tags:
  - react
  - linter
  - context
  - architecture
  - integration
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# EPIC: AST Linter Reporting and CI Integration

## Objective
Develop reporting mechanisms for un-wired Context Providers, integrate the static analysis rule into the build verification/linting pipeline, and ensure end-to-end verification.

## Requirements
1. Generate clear, actionable reports or lint errors when un-wired Context Providers are detected.
2. Integrate the AST linter utility into the standard project linting command (e.g., `pnpm lint`) or CI pipeline.
3. Provide end-to-end verification (E2E/Integration) to ensure the linter correctly flags unwired providers and passes correctly wired ones.

## Acceptance Criteria
- [ ] Break down into Story.
