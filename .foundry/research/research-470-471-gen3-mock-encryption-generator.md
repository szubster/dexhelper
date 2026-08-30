---
id: research-470-471-gen3-mock-encryption-generator
type: RESEARCH
title: Investigate Gen 3 Encrypted Mock Generation
status: PENDING
owner_persona: researcher
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-152-470-gen3-friendship-impl-v2
tags:
  - gen3
  - save-parsing
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Encrypted Mock Generation

## Context
The Coder persona repeatedly failed to craft a valid 48-byte XOR encrypted mock buffer (GAEM permutation) during unit testing for the Friendship extraction logic in `task-152-470`. The bitwise chunking logic resulted in mismatched extracted bytes (e.g. expected 220, received 0 or 121).

## Objective
Investigate how to properly construct 48-byte encrypted mock payloads for Gen 3 `extractGen3PokemonData` tests, specifically addressing little-endian boundaries, 32-bit chunking, and the XOR decryption key (`pv ^ otId`). Provide a reliable utility or documented pattern for future test authors.

## Acceptance Criteria
- [ ] Determine the exact bitwise XOR steps needed to encode a specific byte (e.g., friendship at offset 4 of G) inside a 48-byte buffer so it passes `extractGen3PokemonData`.
- [ ] Document the correct mocking pattern for test fixtures.
