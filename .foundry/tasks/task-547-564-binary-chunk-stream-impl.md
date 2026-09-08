---
id: task-547-564-binary-chunk-stream-impl
type: TASK
title: Implement Binary Chunk Stream Generators
status: PENDING
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-537-547-generator-binary-chunk-streams
tags:
  - typescript
  - typescript-7
  - generators
  - architecture
  - performance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Binary Chunk Stream Generators

## Description
This task implements the core logic for binary chunk stream generators according to ADR 154 (`function*` and `async function*`).

## Acceptance Criteria
- [ ] Implement `createBinaryChunkStream` yielding chunks from a Uint8Array.
- [ ] Implement `createAsyncBinaryChunkStream` yielding chunks from a ReadableStream<Uint8Array>.
- [ ] Ensure the implementation resides in `src/engine/saveParser/utils/binaryChunkStream.ts` and is exported in the `index.ts`.
