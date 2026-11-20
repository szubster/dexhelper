---
id: story-517-528-wip-documentation-e2e
type: STORY
title: E2E Verification for WIP Documentation
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-02'
updated_at: '2026-11-09'
depends_on:
  - story-517-527-markdown-banner
jules_session_id: '2251073746214121810'
pr_number: null
parent: epic-346-517-wip-documentation
tags:
  - e2e
  - integration
  - documentation
rejection_reason: ''
locks: []
---

## Description
This story is dedicated exclusively to Integration and E2E Verification for the WIP documentation features. It ensures that the schema updates and the Markdown banner generation work correctly end-to-end within the Foundry tooling.

## Acceptance Criteria
- [ ] Write integration tests verifying that `DRAFT` and `WIP` statuses are correctly parsed by the schema validator
- [ ] Write E2E tests verifying that the warning banner is successfully rendered/injected in documentation nodes
- [x] Break down into Tasks
- [ ] task-528-690-wip-schema-integration-tests
- [ ] task-528-691-wip-schema-integration-qa
- [x] task-528-692-wip-banner-e2e-tests
- [x] task-528-693-wip-banner-e2e-qa
- [x] research-528-712-investigate-wip-banner-e2e-failure
- [x] task-528-713-wip-banner-e2e-tests-retry
- [x] task-528-714-wip-banner-e2e-qa-retry
- [ ] research-528-747-investigate-wip-banner-retry-failure
- [ ] task-528-748-wip-banner-e2e-tests-retry-v2
- [ ] task-528-749-wip-banner-e2e-qa-retry-v2
