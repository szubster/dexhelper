---
id: prd-488-519-autonomous-execution-enforcement
type: PRD
title: Automated Detection of Autonomous Execution Violations
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '280645881883016539'
pr_number: null
parent: idea-488-autonomous-execution-enforcement
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Automated Detection of Autonomous Execution Violations

## Objective
Enforce the "Autonomous No-Ask Policy" by automatically detecting and rejecting sessions where agents ask for user permission or feedback instead of executing autonomously.

## Requirements
1. The system must analyze agent activity (e.g., commit messages, PR descriptions, or session logs) for prohibited phrases.
2. Prohibited phrases include, but are not limited to: "should I", "do you want me to", "is there anything else", "before I proceed", "should I open a PR".
3. Upon detecting a violation, the system must fail the node or block the submission, forcing the agent to try again autonomously.
4. The system should provide clear feedback on the violation to correct the agent's behavior.

## Out of Scope
- Implementing custom LLM-based intent analysis (stick to simple phrase matching or git hooks first).

## Acceptance Criteria
- [ ] Implement detection logic (e.g., git hook, orchestrator check, or GitHub Action) for prohibited phrases.
- [ ] Define a list of trigger phrases based on core policies.
- [ ] Implement the rejection mechanism (e.g., failing a CI check or blocking a commit) when a violation is detected.
- [ ] epic-519-534-enforce-autonomous-policy-git-hook
- [ ] epic-519-535-enforce-autonomous-policy-ci
- [ ] epic-519-536-enforce-autonomous-policy-e2e
