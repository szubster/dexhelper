---
id: story-330-514-remediation-state-transition-logic
type: STORY
title: Zombie Node Remediation State Transition Logic
status: READY
owner_persona: tech_lead
created_at: '2026-09-01'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-050-330-zombie-node-remediation-logic
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Zombie Node Remediation State Transition Logic

## Description
Implement the core logic to identify zombie nodes (nodes stuck in the `ACTIVE` state) and safely transition their YAML frontmatter status to `FAILED`. This involves updating the markdown file's state to prevent DAG deadlocks. Also ensure robust unit testing for this functionality.

## Acceptance Criteria
- [ ] Implement state transition logic to modify `status` to `FAILED` in the markdown files safely.
- [ ] Ensure robust unit test coverage for the remediation functionality.
- [x] Break down into Tasks.
- [ ] task-514-526-remediation-state-transition-logic-impl
- [ ] task-514-527-remediation-state-transition-logic-tests
- [ ] task-514-528-remediation-state-transition-logic-qa
