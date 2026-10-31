---
id: story-584-714-implement-detect-scratchpads-script
type: STORY
title: Implement detect-scratchpads.js script
status: ACTIVE
owner_persona: tech_lead
created_at: '2025-01-01'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: '1591831788471293334'
pr_number: null
parent: epic-587-584-root-scratchpad-detector-script
tags:
  - scripts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Implement detect-scratchpads.js script

## Objectives
- Create `.github/scripts/detect-scratchpads.js` to scan the repository root for uncommitted, ephemeral files.

## Acceptance Criteria
- [ ] Create `.github/scripts/detect-scratchpads.js`.
- [ ] Scan repository root for uncommitted `*.sh`, `*.cjs`, `*.js`, `*.md`.
- [ ] Ensure non-zero exit code if files are found and print paths.
