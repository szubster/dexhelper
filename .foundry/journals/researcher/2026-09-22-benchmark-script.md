# Benchmark Runner Dependencies

When implementing benchmark scripts that require installing external toolchains (like ts-node, esbuild, swc, oxc), do NOT install them into the main repository's package.json. Modifying the root configuration causes pollution and fails code review. Instead, these dependencies MUST be installed in an ephemeral /tmp directory during runtime, and their installation time should be measured as part of the benchmark's dependency overhead metrics.
