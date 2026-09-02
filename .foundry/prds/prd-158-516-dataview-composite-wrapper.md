---
id: prd-158-516-dataview-composite-wrapper
type: PRD
title: DataView Composite Wrapper & Save Parser Abstraction
status: READY
owner_persona: epic_planner
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-158-dataview-composite-wrapper
tags:
  - architecture
  - dataview
  - save-parser
  - abstraction
  - testing
  - refactoring
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: DataView Composite Wrapper & Save Parser Abstraction

## 1. Context & Vision
Currently, save file parsers directly manipulate native JavaScript `DataView` instances using low-level methods and manual bitwise operations. This creates repetitive boilerplate, fragile offset calculations, and tightly couples the parsers to raw `DataView`s, which limits flexibility (e.g. for WASM emulators) and complicates testing.
Introducing a composite wrapper (`SaveDataReader`) with generation-specific extensions will standardize offset handling, reduce code duplication, and allow for alternative binary reader implementations in the future.

## 2. Requirements & Scope
- **Core Interface:** Implement a base `ISaveDataReader` and concrete `SaveDataReader` class providing high-level wrappers around standard `DataView` getters, and bitwise helpers (e.g., `readBits`, `readFlag`).
- **Generation Mixins:**
  - Gen 1 & 2: BCD and text decoding utilities.
  - Gen 3: Relative section offset resolution (`SaveBlock1` / `SaveBlock2`) and checksum validation.
- **Parser Migration Strategy:** Design a clear refactoring roadmap to incrementally convert existing save parsers under `src/engine/saveParser/parsers/*` to utilize the new wrapper.

## 3. Implementation Details
The new abstraction should exist within `src/engine/saveParser/` as a core architectural building block.
- `src/engine/saveParser/SaveDataReader.ts`
- Generation-specific decorators or extension classes (e.g., `Gen3SaveDataReader`).
The interface must maintain strict adherence to existing save memory offset constants and support easy test mocking.

## 4. Acceptance Criteria
- [ ] Epic Planner: Decompose this PRD into Epics (e.g., Core Wrapper implementation, Gen 3 Extender, Parser Refactoring).
