---
id: task-714-734-playwright-guard-script-core
type: TASK
title: Implement Playwright Guard Script Core Logic
status: READY
owner_persona: coder
created_at: "2026-10-31"
updated_at: "2026-10-31"
depends_on: []
jules_session_id: null
pr_number: null
parent: story-584-714-playwright-guard-script
tags:
  - testing
  - playwright
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
confidence_score: null
locks: []
priority: 80
---

# TASK: Implement Playwright Guard Script Core Logic

## Technical Scope
- Create `scripts/check-playwright-browsers.ts`.
- Implement logic to check if necessary Playwright binaries (e.g., Chromium) are available locally, using Playwright's APIs or checking standard cache locations.
- Expose a function or run as a CLI that returns a boolean or exits with a specific code.
- Do not automatically install binaries.

## Acceptance Criteria
- [ ] Implement `scripts/check-playwright-browsers.ts`
