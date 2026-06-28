---
id: task-076-199-offline-auth-state-impl
type: TASK
title: Implement Client-side Offline Auth State Management
status: FAILED
owner_persona: coder
created_at: '2026-06-17'
updated_at: '2026-06-27'
depends_on:
  - research-199-222-cloudflare-access-paths
jules_session_id: '2479577009823059105'
pr_number: null
parent: story-038-076-offline-auth-state
tags:
  - frontend
  - authentication
  - sso
  - cloudflare
  - offline
research_references: []
rejection_count: 1
rejection_reason: 'Suspended pending research on Cloudflare access paths'
notes: ''
---

# Task: Implement Client-side Offline Auth State Management

## Context
Per ADR 019, the application relies on Cloudflare Access (Zero Trust) for Google SSO. While Cloudflare manages the actual session via an HttpOnly cookie, the offline-first React frontend needs an awareness of the authentication state.

## Architectural Scaffolding
- Define the Context layer (e.g., `AuthContext`) first before implementing UI components, to prevent tight coupling.
- Store a lightweight session indicator locally (e.g. `isLoggedIn: true` in LocalStorage or IndexedDB) so the app knows it is authenticated even when offline.

## Acceptance Criteria
- [ ] Create an `AuthContext` to manage client-side authentication state.
- [ ] Implement logic to store and retrieve the offline auth indicator securely.
- [ ] Provide functions to initiate login (redirecting to Cloudflare Access) and logout (clearing local state and redirecting to Cloudflare logout).
- [ ] Ensure the context provides the current authenticated state to consumer UI components.
- [ ] Write tests ensuring context provider logic functions as expected (especially offline simulation).

## Important Constraints
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
