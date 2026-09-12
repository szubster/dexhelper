# Experimental Namespace Guidelines

The `src/experimental/` directory is a dedicated namespace for isolating new, unproven, or prototype features from the stable core application.

## Linting Boundary
To ensure stability, code outside of `src/experimental/` is strictly prohibited from importing any modules or files located within `src/experimental/`. This boundary is enforced by a custom linting rule in `.oxlintrc.json`.

This allows developers to freely iterate on experimental concepts without risking the integrity of production-ready components. Once an experimental feature is deemed stable and ready for production, it must be officially migrated out of the `src/experimental/` directory before it can be consumed by the rest of the application.
