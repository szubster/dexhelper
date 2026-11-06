---
id: story-712-737-offset-data-reader-decorator
type: STORY
title: Offset Data Reader Decorator
status: READY
owner_persona: tech_lead
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-707-712-save-data-reader-decorator-implementation
tags:
  - saveParser
  - architecture
  - design-pattern
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# STORY: Offset Data Reader Decorator

## 1. Context & Objective
As part of the EPIC to implement `ISaveDataReader` decorators, this Story focuses on creating the `OffsetDataReaderDecorator`. This decorator shifts all read operations by a given base offset, enabling relative offset reading as strictly required by Section 13's data structure extraction guidelines.

## 2. Requirements & Scope
- Implement a class `OffsetDataReaderDecorator` that implements the `ISaveDataReader` interface.
- The constructor should accept an underlying `ISaveDataReader` instance and a `baseOffset` number.
- Override all read methods (`readUint8`, `readUint16`, `readUint32`, `readString`, `readBytes`, etc.) to add the `baseOffset` to the requested offset before delegating to the underlying reader.
- Ensure the implementation correctly handles zero offsets and negative offsets (if applicable/permitted by the engine).
- Write comprehensive unit tests for this decorator.

## Acceptance Criteria
- [ ] Break down this Story into Tasks for the Coder and QA (if necessary).
