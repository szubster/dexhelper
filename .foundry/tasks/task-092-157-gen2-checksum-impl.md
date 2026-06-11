---
id: task-092-157-gen2-checksum-impl
type: TASK
title: Implement Gen 2 Checksum Calculation and Validation
status: COMPLETED
owner_persona: coder
created_at: '2026-06-09'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-053-092-health-scanner-gen2-checksum-validation
tags:
  - feature
  - gen2
  - save-file
  - checksum
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 2 Checksum Calculation and Validation

## Context
Generation 2 save files employ a checksum system to verify data integrity, protecting against save corruption or partial battery failures. Unlike Gen 1, Gen 2 uses both main and backup checksums distributed across different save banks. The Health Scanner Core Engine needs robust logic to compute and validate these checksums.

## Scope
* Implement Gen 2 checksum calculation logic according to Gen 2 save file specifications.
* Validate the calculated main checksums against the stored checksums for all relevant data banks.
* Validate backup checksums.
* Return diagnostic models (`HealthScanResult`, `Anomaly`) as defined by the Health Scanner diagnostic models for any inconsistencies found, correctly pinpointing whether a main or backup checksum failed and in which specific bank.

## Contracts & Instructions
* **Coder:** Implement the logic and ensure unit tests are provided. If you permanently fail or abort, update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Implement Gen 2 checksum calculation algorithm.
- [x] Implement validation logic for Gen 2 main and backup checksums.
- [x] Return specific diagnostic models pinpointing checksum failures (main/backup, specific bank).
- [x] Write unit tests for the checksum logic.
