---
id: research-110-400-investigate-tm-hm-save-parsing-failure
type: RESEARCH
title: Investigate TM/HM Save Parsing Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-05'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: '18338464510116993461'
pr_number: null
parent: prd-105-110-tm-hm-inventory-planner
tags:
  - research
  - failure-analysis
research_references:
  - .foundry/archive/epics/epic-110-306-tm-hm-save-parsing.md
notes: ''
rejection_reason: ''
---

# Investigate TM/HM Save Parsing Failure

## Overview
The original TM/HM save parsing epic (`epic-110-306-tm-hm-save-parsing`) failed and reached its maximum rejection count. This research node is spawned to investigate the root cause of this failure before attempting a V2 implementation.

## Requirements
- Review the auditor and QA journals to understand why the parsing tasks failed.
- Identify missing documentation, incorrect memory offsets, or architectural issues.
- Provide a summary of the failure and actionable recommendations for the V2 parsing Epic.

## Acceptance Criteria
- [x] Root cause of parsing failure identified and documented.

## Research Findings & Recommendations
**Root Cause Analysis:**
1. **Orchestrator Safeguard Failure:** The `epic-110-306-tm-hm-save-parsing` node repeatedly failed and reached its max rejection count because it lacked an `e2e` or `integration` tagged child STORY node. As per the Orchestrator Safeguard rules, an Epic cannot transition to COMPLETED without one. When the Story Owner submitted Empty PRs to transition the Epic, it was rejected.
2. **QA Rejections for Architecture Violations:** Earlier in the pipeline, the Gen 1 implementation (`task-319-322-gen1-tm-hm-parsing-impl`) was rejected by QA because it violated ADR 028 (it used inline magic numbers like `0x27e6` for memory offsets). These code issues were resolved in subsequent iterations, and the code now complies with ADR 028.

**Recommendations for V2:**
- The codebase already contains the correct, compliant parsing logic for Gen 1, Gen 2, and Gen 3.
- The V2 Epic (`epic-110-401-tm-hm-save-parsing-v2`) should be spawned.
- The Story Owner must immediately create an E2E story (e.g., `story-401-402-tm-hm-save-parsing-e2e`) explicitly tagged with `e2e` and add it to the Epic's Acceptance Criteria.
- Once the E2E story is completed, the Story Owner can submit an Empty PR to transition the V2 Epic to COMPLETED.
