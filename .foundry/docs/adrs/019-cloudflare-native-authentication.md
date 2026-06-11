---
id: adr-019-cloudflare-native-authentication
type: ADR
title: 'ADR 019: Cloudflare Native Authentication'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-28'
updated_at: '2026-05-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 019: Cloudflare Native Authentication

## Status
Accepted

## Context
We need to implement a Google SSO flow for our application. Since the application is hosted on Cloudflare Pages and utilizes Cloudflare Workers (Pages Functions), we need an authentication approach that is robust, edge-compatible, and "Cloudflare-native," rather than relying on generic Node.js libraries that may not run correctly in the v8 isolate environment. Additionally, we need to enforce a single-user restriction.

## Objectives Evaluated
1. **Cloudflare Access Policies:** Cloudflare Zero Trust provides native integration with Cloudflare Pages. By putting the Pages application behind Cloudflare Access, we can require users to authenticate (via Google SSO) before reaching the application.
2. **`@cloudflare/pages-plugin-cloudflare-access`:** This official Cloudflare Pages plugin provides middleware to validate Cloudflare Access JWT assertions directly within Pages Functions. It allows backend routes to verify the request's origin and retrieve the authenticated user's identity (e.g., email address) from the JWT payload.
3. **Lightweight Worker-compatible OAuth libraries:** Libraries like Auth.js (formerly NextAuth, which has edge support) or `arctic` were considered. However, implementing the OAuth 2.0 or OIDC flow manually using these libraries introduces additional complexity (handling callbacks, managing sessions, and storing tokens), which duplicates the capabilities already provided out-of-the-box by Cloudflare Access.

## Decision
We will use **Cloudflare Access (Zero Trust)** paired with **`@cloudflare/pages-plugin-cloudflare-access`** for our Google SSO integration.

### Technical Plan
1. **Cloudflare Zero Trust Configuration:**
   - Configure **Google** as an Identity Provider (IdP) in the Cloudflare Zero Trust dashboard.
   - Create an Access application protecting the Cloudflare Pages domain.
   - **Single-User Restriction:** Create an Access Policy for the application that restricts access to the single authorized user. Set the policy action to "Allow" and the rule to "Include -> Emails -> [User's Email Address]".

2. **Pages Functions Integration:**
   - Install the `@cloudflare/pages-plugin-cloudflare-access` package.
   - Implement the plugin in the `functions/_middleware.ts` file (or specific protected routes) to validate the Cloudflare Access JWT assertion on incoming API requests.
   - Use the plugin to extract the user's identity (via `data.cloudflareAccess.JWT.payload.email`) if application logic needs to reference the authenticated user.

## Consequences
- **Positive:** No custom OAuth callback logic or session management code needs to be written or maintained in the application.
- **Positive:** Authentication runs at the Cloudflare edge, blocking unauthorized requests before they even invoke our Pages Functions.
- **Positive:** Enforcing the single-user restriction is handled at the infrastructure level via Zero Trust policies, simplifying application logic.
- **Negative:** Local development requires simulating or bypassing the Cloudflare Access JWT validation, as Cloudflare Access policies only apply to deployed environments.
