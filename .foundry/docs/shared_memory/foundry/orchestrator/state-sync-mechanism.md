# State Sync Mechanism Architecture

## 1. Flow from Git Push to Worker Ingestion

To keep the Orchestrator's internal database (D1) in sync with the GitHub repository's markdown state, we will utilize GitHub Webhooks targeting a dedicated Cloudflare Worker endpoint.

1. **Git Push:** A commit is pushed to the `main` branch.
2. **GitHub Webhook:** GitHub fires a `push` webhook payload to our Cloudflare Worker (`/webhook/github`).
3. **Diff Analysis:** The Worker analyzes the webhook's `commits` array to identify modified, added, or deleted files under `.foundry/`.
4. **Content Fetch:** For changed files, the Worker fetches the raw markdown content via the GitHub REST API to ensure it processes the absolute latest state on `main`.
5. **D1 Ingestion:** The Worker parses the content and executes a database transaction to update the corresponding nodes and dependencies in D1.

## 2. Markdown Frontmatter Serialization

Markdown frontmatter serialization and extraction will follow the existing schema defined in `.foundry/docs/schema.md`.

- **Parsing:** The Worker will use a robust YAML parser (e.g., `js-yaml`) to extract the block between `---` markers.
- **Validation:** Extracted objects will be validated against Zod schemas representing the rules in `schema.md` (e.g., ensuring `depends_on` is an array of strings, `status` matches allowed enums).
- **Mapping:** The parsed object maps directly to the D1 `nodes` table schema (e.g., `id`, `type`, `status`). Arrays like `depends_on` and `tags` will be normalized into their respective relational tables (`dependencies`, `tags`).

## 3. The "Unreachable State Constraint"

The "Unreachable State Constraint" dictates that Jules (the autonomous agents) must never have direct network or credential access to the Orchestrator's internal D1 database.

**Maintenance of this constraint:**
- Agents operate strictly within the GitHub repository sandbox. Their sole mechanism for proposing changes is committing to their Git branch and creating/updating markdown files.
- The Orchestrator's Cloudflare Worker is entirely decoupled from the agent environment. The Worker *reads* from GitHub via API/Webhooks and writes to D1.
- Because agents cannot interact with D1, they cannot forcefully set a task to `READY` or bypass dependency checks. The Worker recalculates truth solely based on merged markdown state in `main` and the DAG logic, enforcing the constraint.
