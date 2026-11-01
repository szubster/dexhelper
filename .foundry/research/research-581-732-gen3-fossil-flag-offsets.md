---
id: research-581-732-gen3-fossil-flag-offsets
type: RESEARCH
title: Investigate Gen 3 Fossil Flag Offsets Root Cause
status: READY
owner_persona: researcher
created_at: '2026-11-01'
updated_at: '2026-11-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-552-581-gen3-fossil-constants
tags:
  - gen3
  - constants
  - research
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Gen 3 Fossil Flag Offsets Root Cause

## Objective
Investigate the root cause of the missing event flags in the fossil constants implementation.

## Context
Task task-581-668-gen3-fossil-constants-impl failed permanently because the event flag constants for Gen 3 fossil states were missing or incorrectly mapped.

## Requirements
- Analyze the gen3_fossil_revival_offsets.md document to extract the correct relative byte offsets and bit masks for the event flags.
- Document the exact missing constants to ensure the retry implementation task can correctly include them.

## Acceptance Criteria
- [ ] Root cause of the missing constants is documented.
- [ ] Correct relative offsets and bit offsets are provided for the implementation task.
