---
id: task-475-537-verify-orchestrator-tests
type: TASK
title: Verify DAG Orchestrator Test Suite
status: READY
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-334-475-prompt-rules-integration-e2e
tags:
  - testing
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Verify DAG Orchestrator Test Suite

## Context & Objectives
This task fulfills the requirement of `story-334-475-prompt-rules-integration-e2e` to ensure that recent changes to persona prompts (`tech_lead.md`, `coder.md`, `qa.md`) and `core_policies.md` do not break the DAG Orchestrator's specific test suite (e.g. phase 4.8 mapping validation).

## Requirements
- Navigate to `.github/scripts`.
- Install dependencies (`pnpm install`).
- Execute the orchestrator test suite (`npx vitest`).
- If any test fails (e.g., prompt parsing issues due to the recent additions), investigate and fix the orchestrator script or the prompt files to ensure compliance.

## Acceptance Criteria
- [ ] The orchestrator test suite (`cd .github/scripts && npx vitest`) successfully executes and passes.
