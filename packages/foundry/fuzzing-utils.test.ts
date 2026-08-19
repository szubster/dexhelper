import { expect, test } from 'vitest';
import fc from 'fast-check';
import { fuzzingUtils } from './fuzzing-utils';
import { NodeFrontmatterSchema } from './schema.ts';

test('fuzzingUtils basic fuzzer works', () => {
  expect(() => fuzzingUtils.basicFuzzer()).not.toThrowError(/Assertion failed/);
});

test('fuzzingUtils.validNodeFrontmatter generates valid schema instances', () => {
  fc.assert(
    fc.property(fuzzingUtils.validNodeFrontmatter, (frontmatter) => {
      expect(() => NodeFrontmatterSchema.parse(frontmatter)).not.toThrow();
    })
  );
});
