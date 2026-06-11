---
id: task-092-158-gen2-checksum-qa
type: TASK
title: QA Gen 2 Checksum Validation Logic
status: READY
owner_persona: qa
created_at: '2026-06-09'
updated_at: '2026-06-11'
depends_on:
  - task-092-157-gen2-checksum-impl
jules_session_id: null
pr_number: null
parent: story-053-092-health-scanner-gen2-checksum-validation
tags:
  - qa
  - gen2
  - save-file
  - checksum
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 2 Checksum Validation Logic

## Context
The Coder has implemented the Gen 2 checksum calculation and validation logic for the Health Scanner Core Engine. This logic verifies both main and backup checksums across different save banks and returns diagnostic models for any inconsistencies. As the QA persona, your responsibility is to ensure this logic is correct, robust, and correctly reports anomalies.

## Scope
* Verify that the Gen 2 checksum calculation matches the known algorithm for Gen 2 save files.
* Test the validation logic against various scenarios:
  * Valid save file with correct main and backup checksums.
  * Corrupted main checksum in specific banks.
  * Corrupted backup checksum.
* Verify that the diagnostic models returned correctly identify the specific checksum (main/backup, bank) that failed.

## Contracts & Instructions
* **QA:** Verify the implementation and ensure the unit tests provide adequate coverage. If you permanently fail or abort, update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify Gen 2 checksum calculation is correct.
- [ ] Verify main and backup checksums are correctly validated for all relevant banks.
- [ ] Verify diagnostic models accurately report the location and type of checksum failures.
- [ ] Ensure comprehensive test coverage for the checksum logic.
