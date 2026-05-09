---
id: story-030-046-branch-identification
type: STORY
title: Branch Identification Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-05-09'
updated_at: '2026-05-09'
depends_on: []
jules_session_id: '15090545915880835362'
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
- [ ] Logic exists to successfully identify branches corresponding to `FAILED` or `CANCELLED` Foundry nodes.
- [ ] Safety checks prevent deletion of `main`, active PR branches, or branches associated with `PENDING`, `READY`, `ACTIVE`, or `COMPLETED` nodes.
- [ ] Tests verify the branch identification logic (with mocked Git/GitHub API calls).
