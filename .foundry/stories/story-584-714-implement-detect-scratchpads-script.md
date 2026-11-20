---
id: story-584-714-implement-detect-scratchpads-script
type: STORY
title: Implement detect-scratchpads.js script
status: FAILED
owner_persona: tech_lead
created_at: '2025-01-01'
updated_at: '2026-11-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-587-584-root-scratchpad-detector-script
tags:
  - scripts
research_references: []
rejection_count: 0
rejection_reason: >-
  Two-Tasks-Max anti-pattern detected: Complex STORY broken down into too few
  TASK nodes
notes: ''
locks: []
priority: 50
---

# Implement detect-scratchpads.js script

## Objectives
- Create `.github/scripts/detect-scratchpads.js` to scan the repository root for uncommitted, ephemeral files.

## Acceptance Criteria
- [x] Create `.github/scripts/detect-scratchpads.js`.
- [x] Scan repository root for uncommitted `*.sh`, `*.cjs`, `*.js`, `*.md`.
- [x] Ensure non-zero exit code if files are found and print paths.
- [x] task-714-734-implement-detect-scratchpads-script
- [x] task-714-735-qa-detect-scratchpads-script
