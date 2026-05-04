# Nurse Learnings
* In this codebase, strict type safety is important. Unsafe casts (`as`) should be avoided.
* When working with dictionaries or arrays accessed via dynamic keys, use type guards to narrow down the types correctly. For example, `GameVersion` being used to access `staticEncounters`.
