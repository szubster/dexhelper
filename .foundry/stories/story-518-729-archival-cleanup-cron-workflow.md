---
id: story-518-729-archival-cleanup-cron-workflow
type: STORY
title: Archival Cleanup Cron Workflow
status: PENDING
owner_persona: tech_lead
created_at: '2026-10-25'
updated_at: '2026-10-31'
depends_on:
  - story-518-728-archivist-persona-definition
jules_session_id: null
pr_number: null
parent: epic-346-518-archival-cleanup-automation
tags:
  - automation
  - github-actions
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Archival Cleanup Cron Workflow

## Description
Create a GitHub Actions scheduled workflow (cron job) to periodically execute the core archival cleanup engine under the ownership of the `archivist` persona.

## Acceptance Criteria
- [ ] Create `.github/workflows/archival-cleanup.yml`.
- [ ] Configure a cron schedule for periodic execution.
- [ ] Configure the workflow to run using the `archivist` persona and trigger the core engine.
- [ ] Tech Lead: Break this Story down into Tasks.
