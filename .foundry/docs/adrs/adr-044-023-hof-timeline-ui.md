---
id: adr-044-023-hof-timeline-ui
type: ADR
title: Hall of Fame Timeline UI Architecture
status: READY
owner_persona: architect
created_at: '2026-06-10'
updated_at: '2026-06-11'
depends_on:
  - adr-044-022-hof-certificate-generation
jules_session_id: null
pr_number: null
parent: prd-070-044-hall-of-fame-exporter
tags:
  - architecture
  - hall-of-fame
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 023: Hall of Fame Timeline UI Architecture

## Context
The user interface must display multiple past League victories in a timeline format and provide export functionality.

## Decision
We will build a React component that visualizes the Hall of Fame data as a timeline. It will integrate the certificate rendering engine to provide social sharing hooks.

### Component Structure
1. **`<HallOfFameTimeline>`**: The primary container component. It will fetch or receive the parsed Hall of Fame data array as props. It manages the overall layout, scrolling, and empty states.
2. **`<TimelineEvent>`**: A sub-component representing a single League victory. It will display the date/time of the victory and the 6 Pokémon used in that specific run.
3. **`<CertificateRenderer>`**: A wrapper component (integrating `html-to-image` as per ADR 022) that takes the data of a single `<TimelineEvent>` and provides a "Share" or "Download" button to generate the high-resolution certificate.

### Integration Points
- **Data Source**: The timeline will consume data parsed by the logic defined in ADR 021, likely passed down from a parent page component or global state store.
- **Rendering Engine**: The `<CertificateRenderer>` will wrap or be invoked by the `<TimelineEvent>` to access the specific team data for the certificate generation.
- **UI State**: The component will need local state to manage loading states while the certificate is being generated (e.g., displaying a spinner on the "Share" button).

## Acceptance Criteria
- [x] Define the React component structure and integration points.
