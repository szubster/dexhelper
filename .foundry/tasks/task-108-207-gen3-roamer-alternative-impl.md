---
id: task-108-207-gen3-roamer-alternative-impl
type: TASK
title: Implement Gen 3 Roamer Alternative Strategy
status: PENDING
owner_persona: coder
created_at: '2026-06-19'
updated_at: '2026-06-19'
depends_on:
  - research-108-206-gen3-roamer-ewram-investigation
jules_session_id: null
pr_number: null
parent: story-072-108-gen3-roamer-location-extraction
tags:
  - gen3
  - roamer
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Roamer Alternative Strategy

## Objective
Implement alternative tracking or extraction logic based on the research findings.

## Description
The original objective of extracting the roamer's current map location failed because it was discovered that the exact coordinates are stored strictly in EWRAM and not serialized in the save file. This task involves implementing an alternative solution (such as extracting other available data, or gracefully falling back in the UI) based on the findings from the research task `research-108-206`.

**CRITICAL INSTRUCTIONS:**
- If you find that this task is impossible to complete or if you permanently fail, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. Do NOT set it to `COMPLETED` manually.
- If you submit an empty PR because the logic already exists, you MUST check all Acceptance Criteria checkboxes before doing so.

## Acceptance Criteria
- [ ] Implement the alternative strategy proposed by the researcher for handling the lack of exact roamer location data.
- [ ] Provide tests verifying the updated logic correctly handles the Gen 3 roamer data.
