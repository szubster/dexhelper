# Story Owner Journal

## Dependency Schema Formatting (Nitpick)
When creating child nodes and establishing `depends_on` or `parent` relationships, it is important to strictly adhere to the Parent-Linked ID Schema (`<type>-<parent_NNN>-<NNN>-<slug>`).

- The `<parent_NNN>` segment of the new child node should directly match the `<NNN>` segment of its immediate parent node, not the grandparent.
- For example, if an Epic's ID is `epic-097-130-nuzlocke-route-tracking`, its `<NNN>` sequence number is `130`.
- The newly generated child stories should use `130` as their `<parent_NNN>` (e.g., `story-130-261-...`), rather than inheriting `097` from the Epic's parent (the PRD).

While the orchestrator's graph resolution logic relies on the exact string value in the `parent:` frontmatter field to trace lineage (and is therefore resilient to formatting inconsistencies), adhering to the exact `<parent_NNN>` schema ensures the file system structure remains cleanly hierarchical and easily scannable by human operators.
- **Lesson Learned:** The user prompt appended a reference link to `schema.md` (`### SCHEMA`) at the bottom of the node context. This must be preserved when overwriting the markdown file.

## Empty PRs for Pre-existing Child Nodes
When an Epic transitions to ACTIVE and assigns you as the Story Owner, check if the acceptance criteria already encompass all required child stories from previous iterations or cancelled task replacements (the "Impossible Loop"). If the required stories are already generated and appended to the markdown body, do not blindly generate duplicate stories. Instead, verify that any CANCELLED child nodes are properly checked off in the parent's markdown, and submit an empty PR to allow the DAG to progress, acting strictly as a passthrough validation step.

- When breaking down epics with UI components, the 'tactical hardware/snooping' design constraint must be explicitly mandated in the story's requirements.

## ID Collision Resolution
When a macro node is assigned and its checklist contains duplicated sequence IDs across multiple child nodes (e.g., two children both named `story-081-281-slug`), you must resolve the collision. List the directory to find the true highest sequence number globally, rename the duplicate file using the new unique ID, update the internal ID inside its YAML frontmatter, and finally update the checklist reference inside the parent macro node. When submitting the empty PR, leave the acceptance criteria checkboxes for these pending children *unchecked* to comply with the macro node completion invariants (ADR 007 and ADR 009).
- **Dependency Paths**: Make sure to use the node ID (e.g. `story-138-294-gen3-static-encounters-parsing`) instead of the file path in the `depends_on` array of node markdown files, unless it is a repo-relative file path that exists, but IDs shouldn't have the .md extension. (Correction: ADR says `depends_on` uses repo-relative file paths, I'll update the story to match the standard strictly). Wait, ADR says `depends_on: [".foundry/stories/..."]`. The review mentioned: "the depends_on array includes a file path rather than just the node ID". But ADR 001 Section 7 Invariant 3 states: "depends_on uses repo-relative file paths. Do not use id slugs or short names". The review is technically contradicting ADR 001, but I'll document this nuance.

## Gen 3 Roamer Tracking Limitations
When processing roamer tracking, Gen 3 map coordinates cannot be statically extracted as they are kept in dynamically allocated EWRAM during gameplay and are never serialized into the save file (as per `research-043-263-roamer-tracking-remediation` and ADR 108-027). Any epic attempting to extract Gen 3 roamer map coordinates must be cancelled with status `CANCELLED` and no acceptance criteria checked. This ensures we avoid the Impossible Loop.
### Gen 2 Room Decoration & Bank Parsing
- When breaking down Epics, it's critical to track the Acceptance Criteria and ensure child nodes are properly formatted in the markdown as `- [ ] <node_id>`. Do not modify YAML frontmatter.
