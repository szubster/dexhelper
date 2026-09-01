---
id: task-490-509-persona-skins-qa
type: TASK
title: QA Verification for Persona Skins Integration
status: PENDING
owner_persona: qa
created_at: '2026-09-01'
updated_at: '2026-09-01'
depends_on:
  - task-490-506-update-oak-persona-skin-impl
  - task-490-507-update-nurse-persona-skin-impl
  - task-490-508-identify-update-other-gen1-personas-impl
jules_session_id: null
pr_number: null
parent: story-406-490-update-jules-persona-definitions
tags:
  - personas
  - gamification
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Verification for Persona Skins Integration

## Objective
Verify that the developer-facing persona templates under `.jules/` and `.github/agents/` have been correctly updated to utilize their respective narrative Gen 1 skins.

## Functional Requirements
- Review changes to `oak.md`, `nurse.md`, and any other identified personas.
- Ensure the titles and context injections consistently reflect the new Gen 1 narrative skins (e.g., Professor Oak, Nurse Joy).
- Verify that the changes do not disrupt the intended behavior or core directives of the personas.

## Acceptance Criteria
- [ ] QA: Verify that the `oak` persona correctly reflects Professor Oak.
- [ ] QA: Verify that the `nurse` persona correctly reflects Nurse Joy.
- [ ] QA: Verify any other updated personas correctly reflect their Gen 1 skins.
