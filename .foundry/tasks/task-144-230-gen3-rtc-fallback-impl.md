---
id: task-144-230-gen3-rtc-fallback-impl
type: TASK
title: Implement System Time Fallback and Manual UI Overrides for Gen 3
status: READY
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-144-gen3-rtc-fallback-strategy
tags:
  - feature
  - gen3
  - rtc
  - impl
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement System Time Fallback and Manual UI Overrides for Gen 3

## Description
This task implements an RTC-Independent Fallback Strategy for Gen 3 time-gated events as mandated by ADR 025. You will need to implement a React Context layer that provides a fallback to the host device's current system time, as well as UI controls to allow manual overrides of the time state.

**Architectural Scaffolding Requirement**: Define the React Context layer first before implementing the UI components to prevent tight coupling and permanent failures. Ensure that the default state defaults to the host device's current system time when not overridden by the user.

## Constraints & Contracts
- **Transient Failures**: If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail this task (e.g. impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes in this markdown body before submitting.
- **Save Parsing Guidelines**: When drafting or implementing blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Acceptance Criteria
- [ ] Define and implement a React Context layer that tracks Gen 3 time-of-day / time-gated event state.
- [ ] Ensure the context defaults to the host device's current system time.
- [ ] Implement UI controls allowing users to manually override the time state.
- [ ] Integrate the context provider securely and without tight coupling to downstream UI components.
