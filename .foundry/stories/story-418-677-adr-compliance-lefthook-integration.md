---
id: story-418-677-adr-compliance-lefthook-integration
type: STORY
title: Integrate ADR Compliance with Lefthook
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-10-16T21:05:41.924Z'
updated_at: '2026-10-18'
depends_on: []
parent: epic-142-418-automated-adr-compliance-ci-integration
jules_session_id: '6350678618330210587'
pr_number: null
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
---

# Integrate ADR Compliance with Lefthook

## Problem Definition
To ensure code compliance before it is committed, the ADR compliance checks need to be integrated into `lefthook.yml` to run automatically as a pre-commit hook.

## Proposed Solution
- Update `lefthook.yml` to include a new pre-commit command that runs the ADR compliance script.
- Make sure the script handles staged files properly or runs against the entire codebase depending on its design.

## Acceptance Criteria
- [ ] Decompose this story into actionable TASK nodes.
