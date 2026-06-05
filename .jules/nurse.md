# Nurse Journal

## Types & Generics
- Many tactical/UI components (`TacticalSegmentedControl`, `TacticalMultiSelectControl`) previously constrained generic type parameter `T` as `T extends string | number | readonly string[]`. This restrictive constraint forced callers to manually cast explicitly typed enums or string literals (e.g., `PokeballType` or `StatusType`) via `as` to satisfy the compiler.
- Removing this constraint (e.g. `export function TacticalSegmentedControl<T>({`) allows TypeScript's type inference engine to natively enforce proper generic matching based on the `selectedValue`/`selectedValues` props, significantly reducing the usage of unsafe `as` casts while making the system cleaner and more modular.
