---
id: research-419-452-gen3-roamer-e2e-late-binding-research
type: RESEARCH
title: Investigate valid Gen 3 Save File Fixtures for E2E Tests
status: READY
owner_persona: researcher
created_at: '2026-08-21'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-360-419-gen3-roamer-e2e-impl
tags:
  - gen3
  - roamer
  - e2e
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate valid Gen 3 Save File Fixtures for E2E Tests

## Objective
Investigate the absence of valid Gen 3 `.sav` fixtures in the repository and determine the correct path forward for End-to-End testing of the Gen 3 Roamer Dossier component.

## Description
The implementation of the E2E tests for the Gen 3 Roamer Dossier is blocked because there are no valid Gen 3 save file binary fixtures (`.sav`) in the repository that contain active roamer data and pass the `parseGen3` structural detection. The `initializeWithSave` test utility injects the raw binary save file directly into IndexedDB, triggering `parseSaveFile`, which throws an error when it cannot recognize the file as a valid save. Mocking the parsed `SaveData` via `window.__STORE__.setSaveData()` fails because the component is deeply un-renderable or un-reachable when the system fails to parse the initial injected file properly. We need to research whether we can craft a valid Gen 3 save file fixture with active roamer data, or if there's a better architectural pattern in Dexhelper for testing components that lack binary fixtures (e.g., using `vitest-browser-react` which already has tests for this component).

## Acceptance Criteria
- [ ] Determine how other Gen 3 E2E tests bypass the lack of valid Gen 3 `.sav` fixtures, or confirm if they skip/fail.
- [ ] Provide a recommendation on how to correctly structure the Playwright E2E tests for the Gen 3 Roamer Dossier, or propose delegating these UI assertions to the existing `vitest-browser-react` suite.
- [ ] Document the findings and propose actionable downstream nodes.
