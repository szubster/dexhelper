import { ReactFlow } from '@xyflow/react';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagNode } from '../DagNode';

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
