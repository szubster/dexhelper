---
id: task-125-177-match-call-etl-impl
type: TASK
title: 'Task: Gen 3 Match Call Static Data ETL Implementation'
status: READY
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-084-125-match-call-etl
tags:
  - feature
  - gen3
  - data-generation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen 3 Match Call Static Data ETL Implementation

## Overview
Implement the ETL (Extract, Transform, Load) script to process and compile the data for the 69 Match Call trainers in Gen 3.

## Description
This task requires writing an ETL script that will:
1. Extract the data for the 69 Match Call trainers from game data sources.
2. Structure the data to include:
   - Trainer Name
   - Location (Route/Cave)
   - 5 possible team tiers (Pokemon, levels, etc.)
3. Implement logic to calculate and aggregate the total EV (Effort Value) yield for defeating each specific team at each of the 5 tiers.

### Technical Contract Requirements
- **Failure:** If you must abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` and provide a clear `rejection_reason`. Do NOT update the status to `COMPLETED`.
- **Empty PR Policy:** If you submit an empty PR because the artifacts are already complete, you MUST check off all Acceptance Criteria checkboxes (`- [x]`) before submitting.

## Acceptance Criteria
- [x] Implement ETL script to extract trainer match call data.
- [x] Structure data with Trainer Name, Location, and 5 team tiers.
- [x] Implement logic to calculate and aggregate EV yield for each team at each tier.
