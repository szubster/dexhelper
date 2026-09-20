import { describe, expect, it } from 'vitest';
import { traverseTree, traverseTreeAsync } from './tree-traversal';
import type { TreeNode } from './types';

describe('Tree Traversal Generators', () => {
  const tree: TreeNode<number> = {
    value: 1,
    children: [
      {
        value: 2,
        children: [{ value: 4 }, { value: 5 }],
      },
      {
        value: 3,
        children: [{ value: 6 }, { value: 7 }],
      },
    ],
  };

  describe('traverseTree (sync)', () => {
    it('should traverse in pre-order', () => {
      const generator = traverseTree(tree, 'pre-order');
      const result = Array.from(generator).map((n) => n.value);
      expect(result).toEqual([1, 2, 4, 5, 3, 6, 7]);
    });

    it('should traverse in post-order', () => {
      const generator = traverseTree(tree, 'post-order');
      const result = Array.from(generator).map((n) => n.value);
      expect(result).toEqual([4, 5, 2, 6, 7, 3, 1]);
    });

    it('should traverse in in-order', () => {
      const generator = traverseTree(tree, 'in-order');
      const result = Array.from(generator).map((n) => n.value);
      expect(result).toEqual([4, 2, 5, 1, 6, 3, 7]);
    });

    it('should traverse in level-order', () => {
      const generator = traverseTree(tree, 'level-order');
      const result = Array.from(generator).map((n) => n.value);
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  });

  describe('traverseTreeAsync (async)', () => {
    it('should traverse in pre-order asynchronously', async () => {
      const generator = traverseTreeAsync(tree, 'pre-order');
      const result: number[] = [];
      for await (const node of generator) {
        result.push(node.value);
      }
      expect(result).toEqual([1, 2, 4, 5, 3, 6, 7]);
    });

    it('should traverse in post-order asynchronously', async () => {
      const generator = traverseTreeAsync(tree, 'post-order');
      const result: number[] = [];
      for await (const node of generator) {
        result.push(node.value);
      }
      expect(result).toEqual([4, 5, 2, 6, 7, 3, 1]);
    });

    it('should traverse in in-order asynchronously', async () => {
      const generator = traverseTreeAsync(tree, 'in-order');
      const result: number[] = [];
      for await (const node of generator) {
        result.push(node.value);
      }
      expect(result).toEqual([4, 2, 5, 1, 6, 3, 7]);
    });

    it('should traverse in level-order asynchronously', async () => {
      const generator = traverseTreeAsync(tree, 'level-order');
      const result: number[] = [];
      for await (const node of generator) {
        result.push(node.value);
      }
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  });

  describe('Lazy Evaluation & Early Exit', () => {
    it('should not evaluate children until necessary (lazy evaluation)', () => {
      let accesses = 0;
      const lazyTree: TreeNode<number> = {
        value: 1,
        get children() {
          accesses++;
          return [
            {
              value: 2,
              get children() {
                accesses++;
                return [];
              },
            },
          ];
        },
      };

      const generator = traverseTree(lazyTree, 'pre-order');

      expect(accesses).toBe(0);

      const first = generator.next();
      expect(first.value?.value).toBe(1);
      expect(accesses).toBe(0);

      const second = generator.next();
      expect(second.value?.value).toBe(2);
      expect(accesses).toBe(2);

      generator.return(undefined);
    });

    it('should support early exit without full traversal', async () => {
      let accesses = 0;
      const lazyTree: TreeNode<number> = {
        value: 1,
        get children() {
          accesses++;
          return [
            {
              value: 2,
              get children() {
                accesses++;
                return [{ value: 4 }];
              },
            },
            {
              value: 3,
              get children() {
                accesses++;
                return [{ value: 5 }];
              },
            },
          ];
        },
      };

      const generator = traverseTreeAsync(lazyTree, 'pre-order');

      const first = await generator.next();
      expect(first.value?.value).toBe(1);

      const second = await generator.next();
      expect(second.value?.value).toBe(2);

      expect(accesses).toBe(2);

      await generator.return(undefined);

      expect(accesses).toBe(2);
    });
  });
});
