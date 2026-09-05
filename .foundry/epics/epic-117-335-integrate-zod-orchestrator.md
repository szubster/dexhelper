---
id: epic-117-335-integrate-zod-orchestrator
type: EPIC
title: Integrate Zod Validation into Foundry Orchestrator
status: COMPLETED
owner_persona: story_owner
created_at: '2026-07-18'
updated_at: '2026-09-03'
depends_on:
  - epic-117-334-define-zod-schema
jules_session_id: null
parent: prd-116-117-zod-schema-validation-orchestrator
tags:
  - foundry
  - orchestrator
  - integration
rejection_reason: ''
locks: []
---

# Integrate Zod Validation into Foundry Orchestrator

## Description
This epic focuses on replacing the manual YAML frontmatter validation logic in `.github/scripts/foundry-orchestrator.ts` with the Zod schema defined in the preceding epic. It must reject malformed nodes strictly and output clear, actionable error messages.

## Acceptance Criteria
- [x] Break down into Stories
- [x] story-335-412-integrate-zod-schema
- [x] story-335-413-zod-validation-error-handling
- [x] story-335-414-zod-orchestrator-e2e
