---
id: epic-519-534-enforce-autonomous-policy-git-hook
type: EPIC
title: Enforce Autonomous Execution Policy via Git Hook
status: READY
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-488-519-autonomous-execution-enforcement
tags: [git-hook, compliance]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# EPIC: Enforce Autonomous Execution Policy via Git Hook

## Context
As defined in `prd-488-519-autonomous-execution-enforcement`, we need to implement a mechanism to detect and block agents from committing changes that violate the "Autonomous No-Ask Policy". Agents should never ask for permission or feedback via PR descriptions or commit messages.

## Scope
1.  **Git Hook Implementation**: Implement a client-side Git Hook (e.g., `commit-msg` or `prepare-commit-msg`) using Lefthook to scan commit messages and PR-related files for prohibited conversational phrases ("should I", "do you want me to", "is there anything else", "before I proceed", "should I open a PR").
2.  **Lefthook Integration**: Integrate this new check into the existing `lefthook.yml` configuration so it is executed automatically on `pre-commit` or `commit-msg`.
3.  **Documentation/Reporting**: Ensure the hook provides a clear error message guiding the agent back to autonomous behavior when a violation is detected.

## Out of Scope
- Advanced LLM-based intent analysis; simple regex/phrase matching is sufficient for now.
- Checking live session chat logs (we will focus on the commit/PR artifacts).

## Acceptance Criteria
- [ ] Implement a node script to perform phrase matching against commit messages.
- [ ] Integrate the script into the Lefthook pipeline.
- [ ] Provide clear error messaging upon failure.
