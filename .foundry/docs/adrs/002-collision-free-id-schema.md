# ADR 002: Collision-Free Distributed ID Schema

## Status
Accepted

## Context
The Foundry system is a multi-agent orchestration pipeline where autonomous agents execute tasks concurrently across parallel branches. This architecture heavily relies on file generation (`IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`) to progress the project lifecycle.

Historically, nodes were given IDs in the format `<type>-<NNN>-<slug>` (e.g., `task-012-parse-daycare-offsets`). The `NNN` sequence number was incremented sequentially based on directory contents. However, with massive concurrency, multiple agents may simultaneously read the directory state on separate branches, determine the same next sequence number, and generate new files that result in naming collisions when the branches merge.

We need an ID schema that guarantees uniqueness (high entropy) while maintaining discoverability and human readability.

## Decision
We will adopt the **Content-Hash Suffix** pattern for the node `id` schema across all lifecycle files.

The new format is:
`<type>-<NNN>-<slug>-<hash>`

- **`<type>`**: The file type (`idea`, `prd`, `epic`, `story`, `task`).
- **`<NNN>`**: A zero-padded three-digit sequence number. While still used for general organization, we accept that agents might occasionally generate the same sequence number concurrently. The hash suffix prevents this from being a hard collision.
- **`<slug>`**: A short, kebab-case descriptive string (e.g., `parse-daycare-offsets`).
- **`<hash>`**: A 4-character random alphanumeric hex string (e.g., `a1b2`, `f3x9`).

### Example
`task-012-parse-daycare-offsets-e5f6`

### Handling Parentless Nodes
Because the schema relies on an arbitrary random hash rather than inheriting a parent's hash, nodes without parents (like `IDEA`s) use the exact same schema. The 4-character suffix is simply randomly generated at creation time regardless of a node's position in the DAG.

## Rationale
- **Discoverability & Readability**: By keeping the type, sequence number, and slug at the beginning, humans can still quickly scan directories, group related items, and understand the node's purpose at a glance.
- **Collision Resistance**: A 4-character hex suffix adds $16^4 = 65,536$ permutations to any given ID combination. Since agents will concurrently generate nodes with the same `<type>` and `<NNN>` only under very specific edge cases (and usually with different `<slug>`s anyway), the 4-character entropy is more than sufficient to prevent collisions without creating overly long or unwieldy filenames.
- **Simplicity**: Generating a 4-character random string is universally trivial in any scripting language used by the orchestrator or agents, requiring no complex parent-hashing logic.

## Consequences
- All agents must immediately update their node creation prompts/logic to append a 4-character random hex string to the `id` field and file name.
- Existing files do not need to be backfilled. The orchestrator maps dependencies by explicit repo-relative paths (`depends_on`), not strict ID parsing, so older nodes without a hash suffix remain valid and resolvable.
- `.foundry/docs/schema.md` will be updated to reflect this new standard.
