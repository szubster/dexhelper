# Story Owner Journal

## Dependency Schema Formatting (Nitpick)
When creating child nodes and establishing `depends_on` or `parent` relationships, it is important to strictly adhere to the Parent-Linked ID Schema (`<type>-<parent_NNN>-<NNN>-<slug>`).

- The `<parent_NNN>` segment of the new child node should directly match the `<NNN>` segment of its immediate parent node, not the grandparent.
- For example, if an Epic's ID is `epic-097-130-nuzlocke-route-tracking`, its `<NNN>` sequence number is `130`.
- The newly generated child stories should use `130` as their `<parent_NNN>` (e.g., `story-130-261-...`), rather than inheriting `097` from the Epic's parent (the PRD).

While the orchestrator's graph resolution logic relies on the exact string value in the `parent:` frontmatter field to trace lineage (and is therefore resilient to formatting inconsistencies), adhering to the exact `<parent_NNN>` schema ensures the file system structure remains cleanly hierarchical and easily scannable by human operators.
- **Lesson Learned:** The user prompt appended a reference link to `schema.md` (`### SCHEMA`) at the bottom of the node context. This must be preserved when overwriting the markdown file.
