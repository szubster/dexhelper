---
id: epic-519-536-enforce-autonomous-policy-e2e
type: EPIC
title: E2E Verification for Autonomous Policy Enforcement
status: PENDING
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: [epic-519-534-enforce-autonomous-policy-git-hook, epic-519-535-enforce-autonomous-policy-ci]
jules_session_id: null
pr_number: null
parent: prd-488-519-autonomous-execution-enforcement
tags: [e2e, integration]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# EPIC: E2E Verification for Autonomous Policy Enforcement

## Context
Per Orchestrator Safeguard requirements, every EPIC decomposition must include a final STORY/EPIC dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).

## Scope
1.  **Integration Testing**: Verify that both the Lefthook commit-message Git hook and the GitHub Action PR-description checker work correctly and together.
2.  **Test Cases**: Create automated or manual test scripts to attempt a commit/PR with prohibited phrases and assert that they are blocked, and then attempt clean ones and assert they pass.

## Acceptance Criteria
- [ ] Verify Git hook blocks prohibited commit messages.
- [ ] Verify CI action blocks prohibited PR descriptions.
