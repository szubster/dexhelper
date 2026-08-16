import fc from 'fast-check';

export const fuzzingUtils = {
  basicFuzzer: () => fc.assert(fc.property(fc.integer(), (n) => typeof n === 'number'))
};
