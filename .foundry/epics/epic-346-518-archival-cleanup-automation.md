---
id: epic-346-518-archival-cleanup-automation
type: EPIC
title: Archival Cleanup Automation
status: PENDING
owner_persona: story_owner
created_at: '2026-09-02'
updated_at: '2026-09-04'
depends_on:
  - epic-346-517-archival-cleanup-core-engine
jules_session_id: null
pr_number: null
parent: prd-152-346-archival-cleanup-policy
tags:
  - foundry
  - archive
  - automation
  - persona
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Archival Cleanup Automation

## Description
Establish the automated workflow and persona ownership for the Archival Cleanup Policy. This epic focuses on creating a scheduled GitHub Actions cron job that runs periodically to execute the core archival cleanup engine, executed under the ownership of the `librarian` or `archivist` persona.

## Scope
- Define the scheduled GitHub Actions workflow for the cleanup job.
- Integrate the workflow with the `librarian` (or `archivist`) persona.
- Ensure the job successfully triggers the archival cleanup core engine.

## Acceptance Criteria
- [ ] Create the GitHub Actions cron job workflow for periodic cleanup.
- [ ] Configure the workflow to run under the correct persona (`librarian` or `archivist`).
- [ ] Ensure EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification.
