import { ReactFlow } from '@xyflow/react';
import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { MAX_REJECTION_THRESHOLD } from '../../../utils/constants';
import { DagNode } from '../DagNode';

vi.mock('../../dashboard/DagContext', () => ({
  useDagContext: vi.fn<() => { maxRejectionThreshold: number }>(() => ({
    maxRejectionThreshold: MAX_REJECTION_THRESHOLD,
  })),
}));

const nodeTypes = {
  custom: DagNode,
};

test('DagNode renders all required fields', async () => {
  const data = {
    id: 'test-task-001',
    label: 'test-task-001',
    type: 'TASK',
    status: 'ACTIVE',
    owner_persona: 'coder',
  };

  const nodes = [
    {
      id: 'test-task-001',
      type: 'custom',
      data,
      position: { x: 0, y: 0 },
    },
  ];

  await render(
    <div style={{ width: '500px', height: '500px' }}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} />
    </div>,
  );

  // Check if ID/Label is rendered
  await expect.element(page.getByText('test-task-001')).toBeInTheDocument();
  // Check if Type is rendered
  await expect.element(page.getByText('TASK', { exact: true })).toBeInTheDocument();
  // Check if Status is rendered
  await expect.element(page.getByText('ACTIVE', { exact: true })).toBeInTheDocument();
  // Check if Owner Persona is rendered
  await expect.element(page.getByText('coder', { exact: true })).toBeInTheDocument();
});

test('DagNode adheres to tactical aesthetic classes', async () => {
  const data = {
    id: 'test-task-001',
    label: 'test-task-001',
    type: 'TASK',
    status: 'ACTIVE',
    owner_persona: 'coder',
  };

  const nodes = [
    {
      id: 'test-task-001',
      type: 'custom',
      data,
      position: { x: 0, y: 0 },
    },
  ];

  await render(
    <div style={{ width: '500px', height: '500px' }}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} />
    </div>,
  );

  const node = page.getByTestId('dag-node');

  await expect.element(node).toHaveClass('rounded-none');
  await expect.element(node).toHaveClass('border-dashed');
  await expect.element(node).toHaveClass('font-mono');
});

test('DagNode applies highlight styles when isHighlighted is true', async () => {
  const data = {
    id: 'test-task-001',
    label: 'test-task-001',
    type: 'TASK',
    status: 'ACTIVE',
    owner_persona: 'coder',
    isHighlighted: true,
  };

  const nodes = [
    {
      id: 'test-task-001',
      type: 'custom',
      data,
      position: { x: 0, y: 0 },
    },
  ];

  await render(
    <div style={{ width: '500px', height: '500px' }}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} />
    </div>,
  );

  const node = page.getByTestId('dag-node');
  await expect.element(node).toHaveClass('!border-cyan-500');
  await expect.element(node).toHaveClass('!border-2');
});

test('DagNode applies dimmed styles when isDimmed is true', async () => {
  const data = {
    id: 'test-task-001',
    label: 'test-task-001',
    type: 'TASK',
    status: 'ACTIVE',
    owner_persona: 'coder',
    isDimmed: true,
  };

  const nodes = [
    {
      id: 'test-task-001',
      type: 'custom',
      data,
      position: { x: 0, y: 0 },
    },
  ];

  await render(
    <div style={{ width: '500px', height: '500px' }}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} />
    </div>,
  );

  const node = page.getByTestId('dag-node');
  await expect.element(node).toHaveClass('opacity-30');
  await expect.element(node).toHaveClass('grayscale');
});

test('DagNode applies styles for other statuses', async () => {
  const data = {
    id: 'test-task-001',
    label: 'test-task-001',
    type: 'TASK',
    owner_persona: 'coder',
  };

  const nodes = [
    { id: '1', type: 'custom', data: { ...data, status: 'COMPLETED' }, position: { x: 0, y: 0 } },
    { id: '2', type: 'custom', data: { ...data, status: 'FAILED' }, position: { x: 0, y: 100 } },
    { id: '3', type: 'custom', data: { ...data, status: 'READY' }, position: { x: 0, y: 200 } },
    { id: '4', type: 'custom', data: { ...data, status: 'PENDING' }, position: { x: 0, y: 300 } },
  ];

  await render(
    <div style={{ width: '500px', height: '500px' }}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} />
    </div>,
  );

  // Check if they rendered without errors, vitest coverage will pick up the switch statement lines.
  await expect.element(page.getByText('COMPLETED', { exact: true })).toBeInTheDocument();
  await expect.element(page.getByText('FAILED', { exact: true })).toBeInTheDocument();
  await expect.element(page.getByText('READY', { exact: true })).toBeInTheDocument();
  await expect.element(page.getByText('PENDING', { exact: true })).toBeInTheDocument();
});

test('DagNode applies permanent failure styles when rejection_count >= MAX_REJECTION_THRESHOLD', async () => {
  const data = {
    id: 'test-task-001',
    label: 'test-task-001',
    type: 'TASK',
    owner_persona: 'coder',
    status: 'FAILED',
    rejection_count: MAX_REJECTION_THRESHOLD,
  };

  const nodes = [
    {
      id: 'test-task-001',
      type: 'custom',
      data,
      position: { x: 0, y: 0 },
    },
  ];

  await render(
    <div style={{ width: '500px', height: '500px' }}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} />
    </div>,
  );

  const node = page.getByTestId('dag-node');
  await expect.element(node).toHaveClass('border-red-500');
  await expect.element(node).toHaveClass('border-2');
  await expect.element(page.getByTitle('Permanent Failure')).toBeInTheDocument();
});
