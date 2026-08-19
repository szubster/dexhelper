import type { Edge as FlowEdge } from '@xyflow/react';
import { expect, test } from 'vitest';
import { getHighlightPath } from '../highlighting';

test('getHighlightPath returns empty set when no node is selected', () => {
  const edges: FlowEdge[] = [{ id: 'e1', source: 'a', target: 'b' }];
  const result = getHighlightPath(null, edges);
  expect(result.size).toBe(0);
});

test('getHighlightPath returns only selected node if no edges connect to it', () => {
  const edges: FlowEdge[] = [{ id: 'e1', source: 'a', target: 'b' }];
  const result = getHighlightPath('c', edges);
  expect(result.size).toBe(1);
  expect(result.has('c')).toBe(true);
});

test('getHighlightPath returns selected node, direct upstream, and direct downstream nodes', () => {
  const edges: FlowEdge[] = [
    { id: 'e1', source: 'a', target: 'selected' }, // upstream
    { id: 'e2', source: 'selected', target: 'b' }, // downstream
    { id: 'e3', source: 'b', target: 'c' }, // not direct
    { id: 'e4', source: 'd', target: 'a' }, // not direct
    { id: 'e5', source: 'selected', target: 'e' }, // downstream
  ];
  const result = getHighlightPath('selected', edges);

  expect(result.size).toBe(4);
  expect(result.has('selected')).toBe(true);
  expect(result.has('a')).toBe(true); // upstream
  expect(result.has('b')).toBe(true); // downstream
  expect(result.has('e')).toBe(true); // downstream
  expect(result.has('c')).toBe(false);
  expect(result.has('d')).toBe(false);
});
