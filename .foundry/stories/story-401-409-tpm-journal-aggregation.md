---
id: story-401-409-tpm-journal-aggregation
type: STORY
title: Update TPM Persona Journal Aggregation
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-08'
updated_at: '2026-08-26'
depends_on:
  - story-401-408-persona-specific-journal-directories
jules_session_id: '3716868774242011755'
pr_number: null
parent: epic-335-401-implement-conflictless-journals-retry
tags:
  - foundry
  - journals
  - tpm
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update TPM Persona Journal Aggregation

## Description
Update the TPM persona responsibilities and associated scripts to properly aggregate and archive the individual, timestamped/session-unique journal files from the persona-specific subdirectories.

## Acceptance Criteria
- [ ] Implement aggregation logic for the TPM persona to process files from persona subdirectories.
- [ ] Ensure aggregated data is correctly archived.
