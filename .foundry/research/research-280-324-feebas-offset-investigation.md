---
id: research-280-324-feebas-offset-investigation
type: RESEARCH
title: Investigate Gen 3 Relative Offsets for Feebas Seed
status: READY
owner_persona: researcher
created_at: '2026-07-14'
updated_at: '2026-07-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-058-280-feebas-backend-integration
tags:
  - gen3
  - backend
  - save-parsing
  - research
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Relative Offsets for Feebas Seed

## Objective
Investigate how to correctly calculate relative memory offsets using `section1Offset` for the Feebas seed extraction in Gen 3 save files, due to the A/B bank flash memory system.

## Context
The previous implementation failed permanently because it used hardcoded absolute offsets instead of making them relative to the dynamically resolved `section1Offset`. The save blocks in Gen 3 can be either in Bank A or Bank B, meaning absolute offsets will cause the parser to read incorrect data when Bank B is active.

## Expected Outcome
- Document the correct relative offsets for both Ruby/Sapphire and Emerald.
- Ensure the extraction functions explicitly receive `section1Offset` (or similar required base offsets) from the parser engine and use it for calculations.