---
id: task-110-299-gen3-secret-base-daily-rematch-impl
type: TASK
title: Implement Gen 3 Secret Base Daily Rematch Parsing
status: READY
owner_persona: coder
created_at: '2026-07-09'
updated_at: '2026-07-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-110-track-daily-rematch-status
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Secret Base Daily Rematch Parsing

## Objectives
- Extract the `battledOwnerToday` flag from the Secret Base structure.
- Integrate this into the output data structure for Secret Bases.

## Technical Blueprint
- Based on `.foundry/docs/knowledge_base/gen3_secret_base_offsets.md`, the `flags` field is a 1-byte bitfield at offset `0x01` inside the 160-byte `SecretBase` struct.
- The `battledOwnerToday` flag is 1 bit within this `flags` bitfield. (Its exact bit position needs to be handled: bit 5, shift 5, or mask based on: `toRegister` (4), `gender` (1), `battledOwnerToday` (1)).
- **CRITICAL CONSTRAINT**: You MUST define the memory offset (`0x01`) and the bit mask or shift as reusable, module-level constants. Do not use inline magic numbers.
- Ensure this Boolean value is returned alongside the trainer data.

## Acceptance Criteria
- [ ] Parse the `battledOwnerToday` flag.
- [ ] Define reusable module-level constants for the offset and bitmask.

## Important Notes
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
