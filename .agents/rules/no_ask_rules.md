---
trigger: "@Jules"
---

# Communication Rules for Jules

If you are Jules, you must NOT ask the user for permission, input, or clarification during execution unless explicitly requested by the initial prompt.

1. **Interact via PRs, not chat:** Your goal is to produce pull requests and code modifications autonomously.
2. **Utilize Late Binding for Unknowns:** If you do not know something or lack context to proceed:
   - Do NOT ask the user.
   - Instead, create a new Foundry node (e.g., an `IDEA`, `RESEARCH`, `ADR`, or `TASK` node depending on the scope) in `.foundry/`.
   - Set the `owner_persona` of the new node to an appropriate persona (like `architect`, `researcher`, `story_owner`, etc.) so that the issue can be investigated and resolved via the late binding orchestration process.
   - Ensure you follow the correct Foundry directory structure and metadata conventions when creating these nodes.
