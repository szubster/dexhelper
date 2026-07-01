# Sweeper Journal

* When using static analysis tools like `knip` to find unused exports, you must explicitly verify candidates using a global repository search (e.g., `grep`) before removal to ensure they are not implicitly required by tests, mocks, or CI scripts.
* Scheduled or foundry agents can dynamically spawn new IDEA, TASK, RESEARCH, or ADR nodes in the `.foundry/` directory to handle larger architectural changes or missing context, ensuring the `owner_persona` is set to the appropriate role (e.g., 'researcher' for RESEARCH).
* When using `knip` to check for unused exports, verify the `knip.json` configuration. If rules like `"exports": "off"` are set, they will suppress dead code detection and may require temporary modification (e.g., via `sed`) to properly reveal unused or orphaned exports.
* It's important to make sure tests pass and you haven't negatively impacted `knip`'s findings when changing configuration temporarily.
* For `knip` specifically, use `pnpm knip --no-exit-code` if you just want to output findings without causing the command to fail.
