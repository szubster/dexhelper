## TypeScript Guidelines
- Ensure all modules use ESM import/export syntax.
- Strictly type variables, function signatures, and return values. Avoid `any` where possible.
- Use the `type` keyword for type imports (e.g., `import { type MyType } from './file';`) when `verbatimModuleSyntax` is enabled to prevent TS1484 errors.
- When creating helper functions, define custom TypeScript interfaces or types in appropriate locations.
- Verify TypeScript compilation using standard type checking rules.
