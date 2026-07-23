---
id: task-336-343-journal-automerge-retry-qa
type: TASK
title: Verify Journal Automerge Implementation
status: PENDING
owner_persona: qa
created_at: '2026-07-23'
updated_at: '2026-07-23'
depends_on:
  - task-336-342-journal-automerge-retry-impl
jules_session_id: null
pr_number: null
parent: story-338-336-implement-session-unique-journals
tags:
  - foundry
  - journals
  - workflow
  - automerge
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# TASK: Verify Journal Automerge Implementation

## Objective
Verify that the GitHub Actions configuration has been successfully updated to automatically merge pull requests containing only journal entry updates.

## Acceptance Criteria
- [ ] Verify that the automerge workflow correctly triggers and merges PRs when the only changes are to files in `.foundry/journals/`.
- [ ] Verify that the automerge workflow correctly triggers and merges PRs containing a combination of both journal file changes and checkbox updates.
- [ ] Verify that the automerge workflow does NOT merge PRs with code changes or other substantial markdown edits outside of the journals directory.
