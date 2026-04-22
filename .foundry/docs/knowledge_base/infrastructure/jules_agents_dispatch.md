# Jules Agents — GitHub Actions Dispatch

## Architecture

Jules agent prompts live in `.jules/schedules/*.md` (source of truth).
A single GitHub Actions workflow `.github/workflows/jules-agents.yml` dispatches all agents.

### How it works

1. **Discover job**: `find .jules/schedules -name '*.md'` + `jq` → dynamic matrix
2. **Invoke job**: for each agent, `jq --rawfile` reads the prompt, pipes to `curl` hitting `https://jules.googleapis.com/v1alpha/sessions`
3. Runs daily at 2:00 UTC + manual `workflow_dispatch`
4. Pinned to `main` only (`if: github.ref == 'refs/heads/main'`)

### Adding/removing agents

Just add or remove a `.md` file in `.jules/schedules/`. No workflow changes needed.

### Secrets required

- `JULES_API_KEY` — set in repo Settings → Secrets → Actions

### Current roster (13 agents)

| Agent | Emoji | Domain |
|---|---|---|
| archivist | 🗃️ | Knowledge hygiene |
| bolt | ⚡ | Performance |
| canvas | 🖼️ | Bold UI redesigns |
| infras | 🔧 | Developer tooling |
| nurse | 🛡️ | Type safety |
| oak | 🧬 | Data integrity |
| palette | 🎨 | UX & accessibility |
| scribe | 📜 | Documentation |
| sentinel | 🧪 | Test coverage |
| shield | 🔒 | Security & Cryptography |
| strategist | 🧭 | Roster & prompt quality |
| sweeper | 🧹 | Code Health & Tech Debt |
| trainer | 🧠 | Assistant feature |

### Notes

- Previously used Jules UI scheduled agents (limited to 5 in UI)
- Migrated to GitHub Actions for unlimited agents + version-controlled prompts
- The action repo README incorrectly references `jules-invoke` — correct usage is `google-labs-code/jules-action`
- We chose to inline the API call (`jq | curl`) rather than use the action, since it's simpler
