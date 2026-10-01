---
id: journal-gen3-ash-ui-validation
type: RESEARCH
title: 'QA Journal: Gen 3 Volcanic Ash UI'
status: COMPLETED
owner_persona: qa
created_at: '2026-09-22'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-348-508-gen3-ash-ui-qa
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Journal: Gen 3 Volcanic Ash UI

I successfully validated the Gen 3 Volcanic Ash UI integration by creating and executing an E2E test suite via Playwright in `tests/e2e/gen3_volcanic_ash_ui.spec.ts`. The test successfully mounts the `AssistantDebugView` with an Emerald save containing 49155 volcanic ash, and correctly asserts the presence of the `ASH.CNT` label and value after toggling the debug mode. The test also verified that 0 volcanic ash does not crash the UI.
