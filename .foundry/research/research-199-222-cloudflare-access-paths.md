---
id: research-199-222-cloudflare-access-paths
type: RESEARCH
title: Investigate Cloudflare Access Auth Paths
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-27'
updated_at: '2026-07-02'
depends_on: []
jules_session_id: '6258182180200667888'
pr_number: null
parent: task-076-199-offline-auth-state-impl
tags:
  - auth
  - cloudflare
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Cloudflare Access Auth Paths

Determine the exact Cloudflare access URLs required for login and logout functionality for offline authentication state management, as this information is missing from the codebase.

## Findings

Through investigating Cloudflare Access documentation and configuration behavior, we have determined the specific endpoints managed by Cloudflare on proxied domains that facilitate authentication flows:

- **Login Path:** `/cdn-cgi/access/login`
  - This path is where Cloudflare Access intercepts unauthenticated traffic to prompt for SSO login.
- **Logout Path:** `/cdn-cgi/access/logout`
  - Calling this endpoint removes the Cloudflare Access application token/cookie (`CF_Authorization`), thereby terminating the session and allowing the user to log in again or switch accounts.
- **Identity Path:** `/cdn-cgi/access/get-identity`
  - While not explicitly requested, it is also useful to know that this endpoint provides identity information for the current user when authenticated.

These URLs are relative to the domain protected by Cloudflare Access and can be used directly in the application (e.g. `<a href="/cdn-cgi/access/logout">Logout</a>`) to provide native integration without requiring complex OAuth callback handling.

## Acceptance Criteria

- [x] Identified the Cloudflare Access login URL path.
- [x] Identified the Cloudflare Access logout URL path.
- [x] Documented the findings in the markdown body.
