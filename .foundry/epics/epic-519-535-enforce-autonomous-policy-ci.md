---
id: epic-519-535-enforce-autonomous-policy-ci
type: EPIC
title: Enforce Autonomous Execution Policy via CI Checks
status: READY
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-488-519-autonomous-execution-enforcement
tags: [ci, compliance]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# EPIC: Enforce Autonomous Execution Policy via CI Checks

## Context
While the Git hook (epic-519-534) provides fast feedback, we need a robust CI check to ensure violations of the "Autonomous No-Ask Policy" do not slip through if the hook is bypassed or if PR descriptions are modified post-commit.

## Scope
1.  **CI Action**: Create or update a GitHub Action workflow to scan Pull Request descriptions and titles for prohibited phrases ("should I", "do you want me to", "is there anything else", "before I proceed", "should I open a PR").
2.  **Orchestrator Fallback**: Ensure the orchestrator or CI correctly fails the build, marking the node as FAILED or flagging the PR, if these phrases are detected, forcing the agent into a resurrection loop or correction.

## Out of Scope
- Checking commit histories within the CI action (the Git hook handles commits; this focuses on PR bodies).

## Acceptance Criteria
- [ ] Implement a GitHub Action to scan PR descriptions and titles for trigger phrases.
- [ ] Ensure the action fails the build and provides clear feedback on violation.
