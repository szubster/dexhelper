# Web Components (Lit) Migration Plan

This document outlines the strategy, benefits, drawbacks, and architectural differences of migrating the Retro Save Reader application from a purely React-based architecture to Web Components using [Lit](https://lit.dev/).

## Overview

Web Components allow us to create reusable, encapsulated HTML tags that work across any framework (or no framework at all). By migrating to Web Components, we build a truly framework-agnostic UI library that can outlive the current React ecosystem if we ever choose to pivot.

We chose **Lit** as our underlying library for Web Components because it provides declarative, reactive templating and state management with minimal overhead (less than 5kb compressed), making it a natural fit for a modern Vite architecture.

---

## Differences: React vs. Lit

| Feature | React | Lit |
| :--- | :--- | :--- |
| **Paradigm** | Virtual DOM | Tagged Template Literals (direct DOM updates) |
| **Component Model** | Functions (Hooks) or Classes | Native ES Classes extending `LitElement` |
| **State Management** | `useState`, `useReducer`, Context | `@state()`, `@property()`, Context API (standardized) |
| **Styling** | Global CSS, Tailwind, CSS Modules | Shadow DOM (encapsulated) or Light DOM (global) |
| **Ecosystem integration** | Framework-locked (React only) | Framework-agnostic (works anywhere HTML works) |
| **Reactivity** | Hook dependency arrays / re-renders | Reactive properties trigger targeted DOM updates |
| **Animations** | JS Libraries (`motion`, `framer`) | Native CSS Transitions / Tailwind / Web Animations API |

---

## Pros & Cons of Migration

### Pros
1. **Framework Agnosticism:** Components built in Lit can be used in React, Vue, Angular, Svelte, or Vanilla HTML without any changes.
2. **Longevity:** Web Components are a web standard. They won't break when a framework updates its core architecture (e.g., React Server Components).
3. **Performance:** Lit does not use a Virtual DOM. It uses standard DOM APIs to surgically update exactly what changed, resulting in extremely fast renders and less memory overhead.
4. **Bundle Size:** Lit is incredibly lightweight. Moving heavy UI components to Lit can reduce the overall JS bundle if we eventually phase out React completely.
5. **Encapsulation:** Shadow DOM prevents global CSS (like Tailwind classes from the host) from accidentally breaking component styles, guaranteeing predictable rendering.

### Cons
1. **Tooling Friction:** Using custom elements inside React requires specific wrappers or exact prop/event passing, as React 18 and below have known quirks with Web Component custom events (though React 19 improves this).
2. **Global State Integration:** Our app heavily relies on Zustand and React Query. Passing global state down to Web Components requires wrapping the component in a React layer to bridge the context.
3. **Shadow DOM Complexity:** Using Tailwind inside Shadow DOM requires importing the Tailwind styles into the component's `static styles` block or injecting a stylesheet construct. It complicates the standard Vite/Tailwind setup slightly.
4. **Loss of React Ecosystem:** Replacing components means we can no longer use React-specific libraries (like `motion/react`) inside those components natively.

---

## Migration Strategy

Given the complexity of the current application, a "Big Bang" rewrite is highly discouraged. We will use the **Strangler Fig Pattern**, migrating from the "leaves" up to the "trunk".

### Phase 1: Leaf Components (UI Kit)
Start by migrating stateless, highly reusable presentational components.
* **Targets:** Buttons, inputs, typography wrappers, layout containers.
* **Goal:** Establish the Lit build pipeline and figure out the optimal way to share Tailwind classes inside Lit components.

### Phase 2: Feature Components (Stateful but isolated)
Move components that manage internal state but have clean inputs/outputs.
* **Targets:** `BottomNav`, `VersionModal`, `SettingsModal`.
* **Goal:** Learn how to bridge global state (Zustand/React Router) into Lit components. We will wrap the Lit components in thin React wrappers to pass down props and listen to custom events.

### Phase 3: Complex Views
Migrate components heavily reliant on data fetching and complex interactions.
* **Targets:** `PokemonDetails`, `StorageGrid`, `PokedexGrid`.
* **Goal:** Determine if React Query fetching should happen inside the Lit component using a Lit-compatible wrapper, or if the data fetching stays in a React Parent and is passed to a "dumb" Lit component.

### Phase 4: Full App Shell
Once all views are Web Components, the React "glue" layer can be replaced by a Lit-based router (e.g., `@lit-labs/router` or a Vanilla JS router).
* **Goal:** Complete removal of React and React-DOM from the `package.json`.

---

## Technical Considerations for this Repository

1. **Tailwind and Shadow DOM:** Since we rely heavily on Tailwind, migrating components using standard Shadow DOM would require copying the Tailwind CSS bundle into every component. For this migration, we will default to rendering Lit components in the **Light DOM** (`createRenderRoot() { return this; }`) so they inherit the global Tailwind styles.
2. **Zustand Bridge:** We will continue using Zustand in React, passing the required data as properties into the Lit components, and using `CustomEvent` dispatching from Lit to trigger Zustand actions in React.
3. **Animations:** We will replace `motion/react` with standard Tailwind utility classes (`transition-all`, `animate-in`, `fade-in`, etc.).
