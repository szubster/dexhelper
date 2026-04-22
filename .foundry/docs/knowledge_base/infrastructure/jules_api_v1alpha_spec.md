# Jules API v1alpha Specification (REST)

Based on official Google documentation retrieved on 2026-04-22.

## Session Object
- **Endpoint**: `https://jules.googleapis.com/v1alpha/sessions/{session_id}`
- **State Enum**:
    - `STATE_UNSPECIFIED`
    - `QUEUED`
    - `PLANNING`
    - `AWAITING_PLAN_APPROVAL`
    - `AWAITING_USER_FEEDBACK`
    - `IN_PROGRESS`
    - `PAUSED`
    - `FAILED` (Terminal)
    - `COMPLETED` (Terminal)

## PR URL Discovery Path
The PR URL is NOT at the top level of the session object. It is nested within the `outputs` array.

```typescript
const prUrl = session.outputs?.find(o => o.pullRequest?.url)?.pullRequest.url;
```

### Response Structure
```json
{
  "name": "sessions/...",
  "state": "COMPLETED",
  "outputs": [
    {
      "pullRequest": {
        "url": "https://github.com/...",
        "title": "...",
        "description": "..."
      }
    }
  ]
}
```

## Usage in Foundry
The `foundry-heartbeat.ts` script uses this to verify if an ACTIVE node still has a valid PR before declaring it a "zombie".
If the session is `FAILED` or `COMPLETED` and no PR is found in `outputs` (nor in GitHub fallback list), the node is transitioned to `FAILED`.
