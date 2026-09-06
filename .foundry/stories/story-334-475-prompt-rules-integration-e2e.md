---
id: story-334-475-prompt-rules-integration-e2e
type: STORY
title: Prompt Rules Integration and E2E Verification
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-25'
updated_at: '2026-09-04'
depends_on:
  - story-334-474-centralize-failure-handling-instructions
jules_session_id: '13567594762323729953'
pr_number: null
parent: epic-117-334-centralize-prompt-rules
tags:
  - foundry
  - agents
  - prompts
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Prompt Rules Integration and E2E Verification

## 1. Context & Objectives
This story is the final step of `epic-117-334-centralize-prompt-rules`. It ensures that the changes made to `tech_lead.md`, `coder.md`, `qa.md`, and `core_policies.md` do not break the orchestrator or any prompt validation checks (like the phase 4.8 mapping validation). This fulfills the Orchestrator Safeguard (E2E/Integration Requirement).

## 2. Requirements
- Run the full suite of testing commands (`pnpm lint`, `pnpm test`, `xvfb-run -a pnpm test:e2e`).
- Verify that the central system tests for the DAG Orchestrator (`.github/scripts/foundry-orchestrator.ts`) still pass by running `cd .github/scripts && pnpm install && npx vitest`.

## 3. Acceptance Criteria
- [ ] task-475-536-verify-core-tests
- [ ] task-475-537-verify-orchestrator-tests
- [ ] All linting, unit testing, and E2E testing commands successfully execute and pass.
- [ ] The orchestrator's specific test suite (`cd .github/scripts && npx vitest`) executes and passes.
