---
id: story-015-036-fix-legacy-migration-logic
type: STORY
title: "Fix Legacy Save Migration Logic"
status: READY
owner_persona: "tech_lead"
created_at: "2026-05-02"
updated_at: "2026-05-02"
depends_on: []
jules_session_id: null
parent: .foundry/epics/epic-005-015-legacy-data-migration.md
tags: ["migration", "indexeddb", "localStorage", "bugfix"]
---

# Fix Legacy Save Migration Logic

## Description
The QA validation (task-032-060) discovered that the `migrateLegacySave` implementation was completely missing from the codebase. This Story delegates the task of actually implementing the missing `migrateLegacySave` function and integrating it into the app startup.

## Acceptance Criteria
- [ ] Create a TASK to implement the missing `migrateLegacySave` function.
- [ ] Create a QA TASK to ensure the implementation is verified again.
