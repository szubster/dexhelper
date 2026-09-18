import type { AsyncTreeTraversalGenerator, TraversalOrder, TreeNode, TreeTraversalGenerator } from './types';

/**
 * Traverses a tree synchronously using a generator.
 * @param root The root node of the tree.
 * @param order The traversal order ('pre-order', 'post-order', 'in-order', 'level-order').
 */
export function* traverseTree<T>(root: TreeNode<T>, order: TraversalOrder = 'pre-order'): TreeTraversalGenerator<T> {
  if (!root) return;

  switch (order) {
    case 'pre-order':
      yield* traversePreOrder(root);
      break;
    case 'post-order':
      yield* traversePostOrder(root);
      break;
    case 'in-order':
      yield* traverseInOrder(root);
      break;
    case 'level-order':
      yield* traverseLevelOrder(root);
      break;
    default:
      throw new Error(`Unsupported traversal order: ${String(order)}`);
  }
}

function* traversePreOrder<T>(node: TreeNode<T>): TreeTraversalGenerator<T> {
  yield node;
  if (node.children) {
    for (const child of node.children) {
      yield* traversePreOrder(child);
    }
  }
}

function* traversePostOrder<T>(node: TreeNode<T>): TreeTraversalGenerator<T> {
  if (node.children) {
    for (const child of node.children) {
      yield* traversePostOrder(child);
    }
  }
  yield node;
}

function* traverseInOrder<T>(node: TreeNode<T>): TreeTraversalGenerator<T> {
  if (node.children && node.children.length > 0) {
    const mid = Math.floor(node.children.length / 2);
    for (let i = 0; i < mid; i++) {
      const child = node.children[i];
      if (child) yield* traverseInOrder(child);
    }
    yield node;
    for (let i = mid; i < node.children.length; i++) {
      const child = node.children[i];
      if (child) yield* traverseInOrder(child);
    }
  } else {
    yield node;
  }
}

function* traverseLevelOrder<T>(root: TreeNode<T>): TreeTraversalGenerator<T> {
  const queue: TreeNode<T>[] = [root];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    if (!node) continue;
    yield node;
    if (node.children) {
      queue.push(...node.children);
    }
  }
}

/**
 * Traverses a tree asynchronously using an async generator.
 * Useful for when children might need to be fetched asynchronously (though TreeNode structure is synchronous here,
 * we provide this to satisfy the async interface requirement).
 * @param root The root node of the tree.
 * @param order The traversal order ('pre-order', 'post-order', 'in-order', 'level-order').
 */
export async function* traverseTreeAsync<T>(
  root: TreeNode<T>,
  order: TraversalOrder = 'pre-order',
): AsyncTreeTraversalGenerator<T> {
  if (!root) return;

  switch (order) {
    case 'pre-order':
      yield* traversePreOrderAsync(root);
      break;
    case 'post-order':
      yield* traversePostOrderAsync(root);
      break;
    case 'in-order':
      yield* traverseInOrderAsync(root);
      break;
    case 'level-order':
      yield* traverseLevelOrderAsync(root);
      break;
    default:
      throw new Error(`Unsupported traversal order: ${String(order)}`);
  }
}

async function* traversePreOrderAsync<T>(node: TreeNode<T>): AsyncTreeTraversalGenerator<T> {
  yield node;
  if (node.children) {
    for (const child of node.children) {
      yield* traversePreOrderAsync(child);
    }
  }
}

async function* traversePostOrderAsync<T>(node: TreeNode<T>): AsyncTreeTraversalGenerator<T> {
  if (node.children) {
    for (const child of node.children) {
      yield* traversePostOrderAsync(child);
    }
  }
  yield node;
}

async function* traverseInOrderAsync<T>(node: TreeNode<T>): AsyncTreeTraversalGenerator<T> {
  if (node.children && node.children.length > 0) {
    const mid = Math.floor(node.children.length / 2);
    for (let i = 0; i < mid; i++) {
      const child = node.children[i];
      if (child) yield* traverseInOrderAsync(child);
    }
    yield node;
    for (let i = mid; i < node.children.length; i++) {
      const child = node.children[i];
      if (child) yield* traverseInOrderAsync(child);
    }
  } else {
    yield node;
  }
}

async function* traverseLevelOrderAsync<T>(root: TreeNode<T>): AsyncTreeTraversalGenerator<T> {
  // Using an array for a simple async queue processing
  const queue: TreeNode<T>[] = [root];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    if (!node) continue;
    yield node;
    // Simulate async tick if needed for pure asyncness, but here we just process
    if (node.children) {
      queue.push(...node.children);
    }
  }
}
