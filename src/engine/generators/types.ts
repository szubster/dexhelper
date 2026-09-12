/**
 * Represents a generic tree node structure.
 */
export interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

/**
 * Traversal orders supported by the tree generators.
 * Using string union instead of TS Enum to ensure compatibility with Node.js native type stripping.
 */
export type TraversalOrder = 'pre-order' | 'post-order' | 'in-order' | 'level-order';

/**
 * A generator function type that yields tree nodes sequentially.
 */
export type TreeTraversalGenerator<T> = Generator<TreeNode<T>, void, unknown>;

/**
 * An asynchronous generator function type that yields tree nodes sequentially.
 */
export type AsyncTreeTraversalGenerator<T> = AsyncGenerator<TreeNode<T>, void, unknown>;
