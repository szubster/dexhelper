---
id: research-485-471-source-gen1-gen2-saves-manually
type: RESEARCH
title: Manually Source Public Gen 1 and Gen 2 Saves
status: CANCELLED
owner_persona: researcher
created_at: '2026-08-25'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-470-485-source-gen1-gen2-saves
tags:
  - fixtures
  - data-sourcing
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
locks: []
---
# Manually Source Public Gen 1 and Gen 2 Saves

## Context
Automated scripts failed to source valid binary save files for Gen 1 and Gen 2 games. Public GitHub searches often return 404s or empty links, and creating artificial files filled with random bytes fails code review because parsers expect valid structures, checksums, and actual game states. We need to manually source valid game saves from specialized emulation communities or databases.

## Requirements
1. Locate and download a diverse set of Gen 1 (Red/Blue/Yellow) and Gen 2 (Gold/Silver/Crystal) `.sav` files representing various game states.
2. Ensure they are actual dumps containing valid data.
3. Include a README (or similar documentation) detailing the origins of all the sourced files.
4. Make them available for integration.

## Acceptance Criteria
- [ ] At least 3 different Gen 1 save files are successfully sourced and added to the project.
- [ ] At least 3 different Gen 2 save files are successfully sourced and added to the project.
- [ ] A README is included documenting the origins of all the files.
