---
id: story-518-730-archival-cleanup-automation-e2e
type: STORY
title: Archival Cleanup Automation E2E Verification
status: PENDING
owner_persona: tech_lead
created_at: '2026-10-25'
updated_at: '2026-10-31'
depends_on:
  - story-518-729-archival-cleanup-cron-workflow
jules_session_id: null
pr_number: null
parent: epic-346-518-archival-cleanup-automation
tags:
  - e2e
  - integration
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Archival Cleanup Automation E2E Verification

## Description
Integration and E2E verification of the new Archival Cleanup automation workflow, ensuring that the cron job functions properly in CI and the `archivist` persona successfully runs the core cleanup engine without errors.

## Acceptance Criteria
- [ ] Create an integration test or verification task to confirm the GitHub Actions workflow syntax and persona interaction.
- [ ] Ensure no false positives occur during the automation execution.
- [ ] Tech Lead: Break this Story down into Tasks.
