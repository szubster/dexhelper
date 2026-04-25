# Nurse Learnings

- Object properties dynamically loaded or derived from `Object.values(DB_CONFIG.STORES)` should use a strict type annotation (`: readonly ValidStoreName[]`) instead of type assertions (`as readonly ValidStoreName[]`). This enables the compiler to verify assignability rather than blindly accepting the cast.
