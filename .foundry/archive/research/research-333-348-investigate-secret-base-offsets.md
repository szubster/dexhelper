---
id: research-333-348-investigate-secret-base-offsets
type: RESEARCH
title: Investigate Gen 3 Secret Base Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-07-28'
updated_at: '2026-07-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-324-333-parse-secret-base-locations
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate Gen 3 Secret Base Offsets

## Investigation Goal
The previous implementation `task-333-334-gen3-secret-base-locations-impl` failed because it incorrectly assumed Emerald uses 8 bytes for `trainerName` and `0x0A` for the `trainerId` offset. This research node documents the correct offsets.

## Findings
According to `.foundry/docs/knowledge_base/gen3_secret_base_offsets.md`, the correct offsets for Gen 3 Secret Bases are as follows:

*   **PLAYER_NAME_LENGTH and OT_NAME_LENGTH** are exactly **7 bytes**.
*   **TRAINER_ID_LENGTH** is **4 bytes**.

Therefore, the `trainerName` is 7 bytes (offset `0x02` to `0x08`) and `trainerId` is 4 bytes (offset `0x09` to `0x0C`). This applies identically across all Gen 3 games (Ruby, Sapphire, Emerald).

In Emerald:
*   `0x00`: `secretBaseId` (1 byte)
*   `0x01`: `flags` (1 byte)
*   `0x02`: `trainerName` (7 bytes)
*   `0x09`: `trainerId` (4 bytes)
*   `0x0D`: `language` (1 byte)
*   `0x0E`: `numSecretBasesReceived` (2 bytes)

In Ruby/Sapphire:
*   `0x00`: `secretBaseId` (1 byte)
*   `0x01`: `flags` (1 byte)
*   `0x02`: `playerName` (7 bytes)
*   `0x09`: `trainerId` (4 bytes)
*   `0x0D`: (implicit padding)
*   `0x0E`: `numSecretBasesReceived` (2 bytes)

This information MUST be used by the implementation tasks to correctly parse the save files and avoid `RangeError` or incorrect data extraction.

## Acceptance Criteria
- [x] Document the correct sizes and offsets for trainerName and trainerId.
- [x] Verify that the offsets are identical across all Gen 3 games.
