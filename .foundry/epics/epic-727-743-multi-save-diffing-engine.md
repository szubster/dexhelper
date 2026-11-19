---
id: epic-727-743-multi-save-diffing-engine
type: EPIC
title: Multi-Save Matrix Comparison Engine
status: READY
owner_persona: story_owner
created_at: '2026-11-01'
updated_at: '2026-11-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-540-727-multi-save-diffing-and-trade-simulation
tags:
  - diffing
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# EPIC: Multi-Save Matrix Comparison Engine

## Description
Develop the `MultiSaveDiffEngine` to accept multiple parsed save payloads across Gen 1, 2, and 3. It will compute set intersections across Living Dex progress, missing version exclusives, item inventory gaps, and missing moves/TMs, and output a unified `MultiSaveComparisonMatrix` with structured trade recommendations.

## Acceptance Criteria
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
