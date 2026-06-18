# Palette Persona Memory

## Core Principles
* This journal is for long-term lessons, architectural constraints, and recurring failures, not an execution logbook.

## Learnings & Constraints
* Per ADR 024, custom design system primitives are maintained as `@utility` definitions in `src/index.css` leveraging Tailwind v4 features.
* When refactoring utilities like focus rings (e.g. into `tactical-focus`), verify if the utility definition incorporates state pseudo-classes. If the utility itself does not include the pseudo-class (e.g., it only defines `@apply outline-none ring-2...`), the component utilizing it *must* append the relevant state prefix (e.g., `className="focus-visible:tactical-focus"`) to prevent unintended "always-on" visual regressions.
* Custom local scripts should use `.js` extension with ES Modules syntax, or `.cjs` for CommonJS, since the project specifies `"type": "module"`.
