---
id: story-138-294-gen3-static-encounters-parsing
type: STORY
title: Gen 3 Static Encounters Parsing
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-11'
updated_at: '2026-07-17'
depends_on:
  - research-294-320-gen3-static-encounter-offsets
jules_session_id: '13901754290014967131'
pr_number: null
parent: epic-106-138-gen3-static-encounters
tags:
  - gen3
  - feature
  - parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 3 Static Encounters Parsing

Implement the save block extraction logic for Gen 3 event flags related to static encounters.

## Acceptance Criteria
- [ ] task-294-331-gen3-static-encounters-parsing-impl
- [ ] task-294-332-gen3-static-encounters-parsing-qa
- [ ] research-294-320-gen3-static-encounter-offsets
- [ ] Define module-level constants for static encounter event flag offsets and bit locations.
- [ ] Implement save file parsing logic to extract static encounter status.
- [ ] Follow dynamic save block extraction guidelines (ADR 028).
