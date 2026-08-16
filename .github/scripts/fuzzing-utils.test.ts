import { expect, test } from 'vitest';
import { fuzzingUtils } from './fuzzing-utils';

test('fuzzingUtils basic fuzzer works', () => {
  expect(() => fuzzingUtils.basicFuzzer()).not.toThrowError(/Assertion failed/);
});
