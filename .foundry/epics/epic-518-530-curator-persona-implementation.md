---
id: epic-518-530-curator-persona-implementation
type: EPIC
title: Implement Curator Persona
status: ACTIVE
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '12528314716431271723'
parent: prd-151-518-holistic-code-curator-persona
tags:
  - foundry
  - personas
  - refactoring
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Curator Persona

## Summary
Implement the base foundation for the `curator` persona, mapped to Persian (#053) and Kadabra (#064), to act as the Guardian of Code Quality.

## Requirements
- Register the `curator` persona in `.foundry/docs/schema.md` within the `owner_persona` Enum.
- Create the default journal directory `.foundry/journals/curator/`.
- Create the base prompt file `.github/agents/generic/curator.md`.
- Implement base instructions detailing responsibilities and node spawning procedures.
- Ensure the Curator is constrained from making direct code changes.

## Acceptance Criteria
- [ ] Create STORY for updating schema.md with the curator persona
- [ ] Create STORY for creating the curator agent base prompt and journal directory
