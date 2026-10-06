# V2 Benchmark Results Analysis: TS 7.x Toolchains

## Overview
This document analyzes the benchmark results from the V2 runner to evaluate TS 7.x toolchain and Node.js native execution performance.

## Benchmark Results (Raw)
```
Benchmark: Toolchain: node-native
Operations per second: 9.71
Average time per operation: 103002187.0000 ns
Memory Usage: 0.0000 MB

Benchmark: Toolchain: ts-node
Operations per second: 0.48
Average time per operation: 2075368666.0000 ns
Memory Usage: 0.0019 MB

Benchmark: Toolchain: esbuild
Operations per second: 1.94
Average time per operation: 516125324.0000 ns
Memory Usage: 0.0010 MB

Benchmark: Toolchain: swc
Operations per second: 1.5
Average time per operation: 667475200.0000 ns
Memory Usage: 0.0033 MB

Benchmark: Toolchain: oxc
Operations per second: 16.88
Average time per operation: 59227111.0000 ns
Memory Usage: 0.0008 MB
```

## Key Findings
1. **Oxc** is the fastest toolchain by a wide margin (16.88 ops/sec), offering the lowest execution time (~59ms) and minimal dependency overhead.
2. **Node-native** (Node.js `--experimental-strip-types`) performs very well (9.71 ops/sec), taking ~103ms per operation without any dependency installation overhead. This makes it highly attractive for environments where installing third-party toolchains is discouraged or slow.
3. **esbuild** (1.94 ops/sec) and **swc** (1.5 ops/sec) provide moderate performance but pale in comparison to Oxc and node-native execution.
4. **ts-node** is significantly slower than all alternatives (0.48 ops/sec), requiring over 2 seconds per operation, confirming it as a bottleneck in the current toolchain.

## Recommendation
The migration plan should focus on adopting **node-native execution (`--experimental-strip-types`)** for development and general script execution to eliminate dependency installation overhead entirely. For build steps and operations requiring maximum speed, **Oxc** should be considered due to its class-leading performance.
