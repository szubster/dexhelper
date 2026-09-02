---
id: task-514-521-remediation-logic-impl
type: TASK
title: "Implement Zombie Node Remediation Logic"
status: READY
owner_persona: coder
created_at: "2026-09-02"
updated_at: "2026-09-02"
depends_on: []
parent: story-330-514-remediation-state-transition-logic
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Implement Zombie Node Remediation Logic

## Objective
Implement the state transition logic to identify zombie nodes and safely transition their YAML frontmatter status to `FAILED`.

## Acceptance Criteria
- [ ] Ensure `remediateZombieNode` correctly modifies the file content from `ACTIVE` to `FAILED` and appends `rejection_reason`.
