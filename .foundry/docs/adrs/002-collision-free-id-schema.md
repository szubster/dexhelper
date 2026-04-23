# ADR 002: Parent-Linked Distributed ID Schema

## Status
Accepted

## Context
The Foundry system is a multi-agent orchestration pipeline where autonomous agents execute tasks concurrently across parallel branches. This architecture heavily relies on file generation (`IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`) to progress the project lifecycle.

Historically, nodes were given IDs in the format `<type>-<NNN>-<slug>` (e.g., `task-012-parse-daycare-offsets`). The `NNN` sequence number was incremented sequentially based on directory contents. However, we wanted a schema that adds more context to the file name, making it easier for humans to understand the node's lineage and discover its relationship to other nodes at a glance.

## Decision
We will adopt a **Parent-Linked** pattern for the node `id` schema across all lifecycle files.

The new format incorporates the parent's sequence number:
`<type>-<parent_NNN>-<NNN>-<slug>`

For `IDEA` nodes, which are the root of the hierarchy and never have a parent, the format remains:
`idea-<NNN>-<slug>`

- **`<type>`**: The file type (`prd`, `epic`, `story`, `task`).
- **`<parent_NNN>`**: The three-digit sequence number of the parent node (e.g., the Story's NNN for a Task).
- **`<NNN>`**: A zero-padded three-digit sequence number for this specific node.
- **`<slug>`**: A short, kebab-case descriptive string (e.g., `parse-daycare-offsets`).

### Examples
- **Idea**: `idea-001-auth-overhaul`
- **PRD** (spawned from Idea 001): `prd-001-002-auth-spec`
- **Epic** (spawned from PRD 002): `epic-002-005-backend-auth`
- **Story** (spawned from Epic 005): `story-005-010-setup-db`
- **Task** (spawned from Story 010): `task-010-042-write-sql`

### Handling Parentless Nodes
If a node (other than an IDEA) is created without a parent, the `<parent_NNN>` segment will be `000`.
Example: `epic-000-001-orphan-work`

## Rationale
- **Readability and Context**: By including the parent's sequence number in the ID, humans can instantly trace a node back to its origin without having to open the file and read the `parent` frontmatter field.
- **Discoverability**: Grouping files alphabetically or searching by parent ID becomes trivial, as all tasks for Story `010` will start with `task-010-`.
- **Sufficient Entropy**: As agents typically generate new slugs based on the specific content, collisions on `<NNN>` concurrent generations are rare and likely indicate duplicate work. The `<slug>` provides the primary entropy.

## Consequences
- All agents must immediately update their node creation prompts/logic to inject the parent's sequence number into the new node's ID.
- Existing files do not need to be backfilled. The orchestrator maps dependencies by explicit repo-relative paths (`depends_on`), not strict ID parsing, so older nodes remain valid.
- `.foundry/docs/schema.md` will be updated to reflect this new standard.
