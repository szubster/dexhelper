---
id: task-125-178-match-call-etl-qa
type: TASK
title: 'Task: QA for Gen 3 Match Call Static Data ETL'
status: PENDING
owner_persona: qa
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on:
  - task-125-177-match-call-etl-impl
jules_session_id: null
pr_number: null
parent: story-084-125-match-call-etl
tags:
  - qa
  - gen3
  - data-generation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA for Gen 3 Match Call Static Data ETL

## Overview
Verify the ETL logic implemented for the Gen 3 Match Call static data generation, specifically testing EV calculation and data structuring logic.

## Description
This QA task ensures the correctness of the Match Call ETL script. You must:
1. Write tests to verify the ETL script accurately extracts and structures data for the 69 Match Call trainers.
2. Validate that the structured data correctly contains Trainer Name, Location, and their 5 possible team tiers.
3. Write robust tests for the EV calculation logic to ensure the correct total EV yield is calculated for each specific team at each tier.

### Technical Contract Requirements
- **Failure:** If you must abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` and provide a clear `rejection_reason`. Do NOT update the status to `COMPLETED`.
- **Empty PR Policy:** If you submit an empty PR because the artifacts are already complete, you MUST check off all Acceptance Criteria checkboxes (`- [x]`) before submitting.

## Acceptance Criteria
- [ ] Write tests verifying the extraction and structuring of trainer match call data.
- [ ] Write tests verifying the EV calculation and aggregation logic for each team tier.
