import { describe, expect, it } from 'vitest';
import { buildDagGraph, type ParsedNode } from './builder';

describe('buildDagGraph', () => {
  it('should build a DAG graph with nodes and correctly mapped edges', () => {
    const parsedNodes: ParsedNode[] = [
      {
        filePath: '.foundry/tasks/task-1.md',
        data: {
          id: 'task-1',
          type: 'TASK',
          status: 'COMPLETED',
          owner_persona: 'coder',
          depends_on: [],
          rejection_count: 0,
        },
      },
      {
        filePath: '.foundry/tasks/task-2.md',
        data: {
          id: 'task-2',
          type: 'TASK',
          status: 'PENDING',
          owner_persona: 'qa',
          depends_on: ['.foundry/tasks/task-1.md'],
          rejection_count: 0,
        },
      },
    ];

    const result = buildDagGraph(parsedNodes);

    expect(result).toEqual({
      nodes: [
        {
          id: 'task-1',
          data: {
            type: 'TASK',
            status: 'COMPLETED',
            owner_persona: 'coder',
            rejection_count: 0,
            depends_on: [],
          },
        },
        {
          id: 'task-2',
          data: {
            type: 'TASK',
            status: 'PENDING',
            owner_persona: 'qa',
            rejection_count: 0,
            depends_on: ['.foundry/tasks/task-1.md'],
          },
        },
      ],
      edges: [
        {
          source: 'task-1',
          target: 'task-2',
        },
      ],
    });
  });

  it('should handle path variations (with or without ./)', () => {
    const parsedNodes: ParsedNode[] = [
      {
        filePath: '.foundry/tasks/task-1.md',
        data: {
          id: 'task-1',
          type: 'TASK',
          status: 'COMPLETED',
          owner_persona: 'coder',
          depends_on: [],
          rejection_count: 0,
        },
      },
      {
        filePath: '.foundry/tasks/task-2.md',
        data: {
          id: 'task-2',
          type: 'TASK',
          status: 'PENDING',
          owner_persona: 'qa',
          depends_on: ['./.foundry/tasks/task-1.md'],
          rejection_count: 0,
        },
      },
    ];

    const result = buildDagGraph(parsedNodes);

    expect(result.edges).toEqual([
      {
        source: 'task-1',
        target: 'task-2',
      },
    ]);
  });

  it('should ignore dependencies that do not exist in the parsed nodes', () => {
    const parsedNodes: ParsedNode[] = [
      {
        filePath: '.foundry/tasks/task-1.md',
        data: {
          id: 'task-1',
          type: 'TASK',
          status: 'PENDING',
          owner_persona: 'coder',
          depends_on: ['.foundry/tasks/unknown-task.md'],
          rejection_count: 0,
        },
      },
    ];

    const result = buildDagGraph(parsedNodes);

    expect(result).toEqual({
      nodes: [
        {
          id: 'task-1',
          data: {
            type: 'TASK',
            status: 'PENDING',
            owner_persona: 'coder',
            rejection_count: 0,
            depends_on: ['.foundry/tasks/unknown-task.md'],
          },
        },
      ],
      edges: [],
    });
  });

  it('should handle multiple dependencies', () => {
    const parsedNodes: ParsedNode[] = [
      {
        filePath: 'task-1.md',
        data: {
          id: 't1',
          type: 'TASK',
          status: 'COMPLETED',
          owner_persona: 'coder',
          depends_on: [],
          rejection_count: 0,
        },
      },
      {
        filePath: 'task-2.md',
        data: {
          id: 't2',
          type: 'TASK',
          status: 'COMPLETED',
          owner_persona: 'coder',
          depends_on: [],
          rejection_count: 0,
        },
      },
      {
        filePath: 'task-3.md',
        data: {
          id: 't3',
          type: 'TASK',
          status: 'READY',
          owner_persona: 'coder',
          depends_on: ['task-1.md', 'task-2.md'],
          rejection_count: 0,
        },
      },
    ];

    const result = buildDagGraph(parsedNodes);

    expect(result.edges).toEqual([
      { source: 't1', target: 't3' },
      { source: 't2', target: 't3' },
    ]);
  });

  it('should return empty nodes and edges for empty input', () => {
    const result = buildDagGraph([]);
    expect(result).toEqual({ nodes: [], edges: [] });
  });
});
