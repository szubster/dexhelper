---
id: epic-343-419-persona-migration
type: EPIC
title: Persona Prompt Migration and Specialization
status: PENDING
owner_persona: story_owner
created_at: '2026-08-14'
updated_at: '2026-08-14'
depends_on:
  - epic-343-418-orchestrator-integration
jules_session_id: null
pr_number: null
parent: prd-137-343-decouple-persona-prompts
tags:
  - foundry
  - personas
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Persona Prompt Migration and Specialization

## Description
This Epic deals with the migration of existing, monolithic persona prompt files into the newly developed decoupled fragment format. It also covers the process of subdividing broad, monolithic roles into finer-grained, specialized sub-personas (e.g., splitting a monolithic role into frontend/backend focus) to improve agent efficiency and scale.

## Scope
- Refactor all existing `.md` prompt files into modular fragments.
- Identify and implement finer-grained persona specializations based on the current workload.
- Ensure backward compatibility during the migration phase to avoid disrupting active sessions.

## Prerequisites
- Requires completion of orchestrator integration (`epic-343-418-orchestrator-integration.md`) to effectively utilize the new prompt fragments.

## Acceptance Criteria
- [ ] Migrate all existing monolithic persona prompts to the new fragment layered format.
- [ ] Implement and test at least two finer-grained specializations of existing roles.
- [ ] Maintain backward compatibility during migration.
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
