---
id: task-281-304-gen3-system-time-fallback-impl
type: TASK
title: Implement Gen 3 System Time Fallback Logic
status: READY
owner_persona: coder
created_at: '2026-07-11'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-281-gen3-system-time-fallback
tags:
  - feature
  - gen3
  - rtc
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 System Time Fallback Logic

## Context & Requirements
Based on ADR 025 and Story `story-081-281-gen3-system-time-fallback`, we are implementing an **RTC-Independent Fallback Strategy** across the application. Attempting to parse RTC data directly from `.sav` files is unreliable.

Your task is to implement the system time fallback for Gen 3. The fallback should utilize the host device's current system time to resolve time-dependent states if an explicit UI override is not provided.

## Architectural Scaffolding
Because this involves core state that may be referenced across multiple components, you must define a React Context layer for managing the "Current Application Time" state. This context should provide the current system time by default and expose methods to manually override it via the UI.
- Define the context first before implementing UI consumers.
- Ensure the save parsing engine gracefully ignores any trailing bytes appended by emulators (like VBA-M's 44/48 trailing RTC bytes) without throwing size mismatch errors, since we are abandoning in-save RTC parsing.

## Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, update to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Acceptance Criteria
- [ ] Implement a React Context for managing application time state with a system time fallback.
- [ ] Update the save parsing engine to safely ignore trailing RTC bytes in `.sav` files.
- [ ] Ensure the context exposes methods for future UI overrides.
