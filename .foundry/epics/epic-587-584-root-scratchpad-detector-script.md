---
id: epic-587-584-root-scratchpad-detector-script
type: EPIC
title: "Root Scratchpad Detector Implementation"
status: PENDING
owner_persona: "story_owner"
created_at: "2026-10-17"
updated_at: "2026-10-17"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: prd-531-587-automatic-scratchpad-cleanup-guard
priority: 50
confidence_score: null
tags: ["foundry", "process", "lint"]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Root Scratchpad Detector Implementation

## Objectives
- Implement `.github/scripts/detect-scratchpads.js` (or `.ts`) that scans the repository root for uncommitted, ephemeral files (e.g., `*.sh`, `*.cjs`, `*.js`, `*.md` not in allowed paths like `docs/`).
- The script should return a non-zero exit code if any unauthorized ephemeral files are found, printing their paths to the console.

## Acceptance Criteria
- [ ] Implement `.github/scripts/detect-scratchpads.js` to detect unauthorized scratchpad files at the root.
- [ ] Ensure the script exits with an error code if scratchpads are detected.
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
