---
id: task-021-document-id-schema
type: TASK
title: "Finalize ID Schema and Update Documentation"
status: "COMPLETED"
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-004-id-schema-decision.md
---

# Finalize ID Schema and Update Documentation

## Context
The system requires a collision-free ID schema pattern across distributed nodes. The Architect/Tech Lead needs an exact pattern documented and enforced going forward.

## Acceptance Criteria
- [x] Create a new Architectural Decision Record (ADR) file, e.g., `.foundry/docs/adrs/002-collision-free-id-schema.md`.
- [x] In the ADR, select and document a specific pattern. The solution should be creative, focusing on discoverability and ease of use. It should ensure high entropy to prevent naming collisions for concurrent autonomous agents, and also consider how to handle items that do not have a parent.
- [x] Update `.foundry/docs/schema.md` with the newly decided ID pattern. Update any examples (such as the node template) to correctly show the new structure.
- [x] **Verification**: The Coder is responsible for self-verifying that the documentation is clean, formatting is correct, and tests/linting pass. (No separate QA task is required).
