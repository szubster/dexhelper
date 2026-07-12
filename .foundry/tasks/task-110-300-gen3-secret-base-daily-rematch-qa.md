---
id: task-110-300-gen3-secret-base-daily-rematch-qa
type: TASK
title: QA Gen 3 Secret Base Daily Rematch Parsing
status: ACTIVE
owner_persona: qa
created_at: '2026-07-09'
updated_at: '2026-07-12'
depends_on:
  - task-110-299-gen3-secret-base-daily-rematch-impl
jules_session_id: '4724965742941363195'
pr_number: null
parent: story-070-110-track-daily-rematch-status
tags:
  - qa
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Gen 3 Secret Base Daily Rematch Parsing

## Objectives
- Verify the `battledOwnerToday` flag is parsed correctly.

## Acceptance Criteria
- [ ] Verify unit tests correctly test the extraction of the `battledOwnerToday` flag.
- [ ] Ensure that no magic numbers are used in the implementation, and that module-level constants are used for offsets and bitmasks.

## Important Notes
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
