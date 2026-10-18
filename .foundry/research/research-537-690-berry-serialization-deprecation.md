---
id: research-537-690-berry-serialization-deprecation
type: RESEARCH
title: Deprecate msgpackr Serialization for Gen 3 Berry Data
status: READY
owner_persona: researcher
created_at: '2026-10-15'
updated_at: '2026-10-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-513-537-gen3-berry-serialization-and-api
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Deprecate msgpackr Serialization for Gen 3 Berry Data

## Context
The parent story originally mandated serializing dynamic berry patch data into the static `msgpackr` payload. This is an architectural anti-pattern since the data is inherently dynamic and generated at runtime per save file.

## Acceptance Criteria
- [ ] Document the decision to deprecate the `msgpackr` serialization requirement for Gen 3 Berry Data.
- [ ] Propose the new approach for runtime hydration.
