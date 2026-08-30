---
id: epic-340-418-ui-component-splitting
type: EPIC
title: Implement React.lazy code splitting for UI components
status: PENDING
owner_persona: story_owner
created_at: '2026-08-13'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: null
parent: prd-136-340-split-bundles-and-data
tags:
  - performance
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---
# EPIC: Implement React.lazy code splitting for UI components

## Context & Objectives
Components exclusively used for specific generations should not be bundled in the initial load payload.

## Requirements
- Utilize `React.lazy` for UI components that are only relevant to specific generations (e.g. Gen 3 RTC, Contests).

## Acceptance Criteria
- [x] Break down this epic into stories.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
- [ ] story-418-477-lazy-load-gen3-components
- [ ] story-418-478-lazy-load-gen2-components
- [ ] story-418-479-lazy-load-e2e-verification
