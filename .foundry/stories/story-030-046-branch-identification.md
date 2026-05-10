---
id: story-030-046-branch-identification
type: STORY
title: Branch Identification Logic
status: "COMPLETED"
owner_persona: tech_lead
created_at: '2026-05-09'
updated_at: "2026-05-10"
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-019-030-automated-branch-cleanup
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Branch Identification Logic

## Objective
Implement logic to safely identify branches associated with `FAILED` or `CANCELLED` task nodes.

## Acceptance Criteria
- [x] Logic exists to successfully identify branches corresponding to `FAILED` or `CANCELLED` Foundry nodes.
- [x] Safety checks prevent deletion of `main`, active PR branches, or branches associated with `PENDING`, `READY`, `ACTIVE`, or `COMPLETED` nodes.
- [x] Tests verify the branch identification logic (with mocked Git/GitHub API calls).


### Tasks
- [.foundry/tasks/task-046-073-implement-branch-identification.md](.foundry/tasks/task-046-073-implement-branch-identification.md)
- [.foundry/tasks/task-046-074-qa-branch-identification.md](.foundry/tasks/task-046-074-qa-branch-identification.md)
